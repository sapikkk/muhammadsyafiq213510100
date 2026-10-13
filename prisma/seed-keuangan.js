/**
 * Backfill jurnal penjualan + penyusutan dari data seed operasi.
 * npm run seed:keuangan
 */
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
const nol = new Prisma.Decimal(0);
const round2 = (d) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

const AKUN = {
  KAS: "1100",
  PIUTANG: "1200",
  PERSEDIAAN_SAYUR: "1350",
  UANG_MUKA: "2200",
  PENDAPATAN_CURAH: "4100",
  PENDAPATAN_PACK: "4200",
  HPP: "5100",
};

function splitPenerimaanPenjualan(total, dp, uangDiterima) {
  const sisa = round2(total.sub(dp));
  const kas = round2(Prisma.Decimal.min(uangDiterima, sisa));
  const piutang = round2(sisa.sub(kas));
  return { kas, piutang };
}

async function requireAkunPosting(kode) {
  const akun = await prisma.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new Error(`Akun ${kode} tidak siap posting.`);
  }
  return akun.id;
}

async function cogsForBaris(line) {
  if (line.hpp_order.gt(0)) return round2(line.hpp_order);
  const hpp = await prisma.hPP.findUnique({ where: { siklus_id: line.siklus_id } });
  if (!hpp) return nol;
  const unit = line.jenis === "CURAH" ? hpp.hpp_per_kg : hpp.hpp_per_pack;
  return round2(line.jumlah.mul(unit));
}

async function setujuiJurnal(id, olehId) {
  const jurnal = await prisma.jurnal.findUnique({
    where: { id },
    include: { baris: { include: { akun: { select: { tipe: true } } } } },
  });
  if (!jurnal || jurnal.status !== "PENDING") {
    throw new Error(`Jurnal #${id} tidak bisa disetujui.`);
  }
  const debitNormal = new Set(["ASET", "BEBAN"]);
  await prisma.$transaction([
    ...jurnal.baris.map((b) => {
      const arah = debitNormal.has(b.akun.tipe) ? 1 : -1;
      const delta = b.debit.sub(b.kredit).mul(arah);
      return prisma.akun.update({
        where: { id: b.akunId },
        data: { saldo: { increment: delta } },
      });
    }),
    prisma.jurnal.update({
      where: { id },
      data: { status: "APPROVED", diputusOlehId: olehId, diputusPada: new Date() },
    }),
  ]);
}

async function postingPenyusutan(userId, tanggal, keterangan, debitKode, kreditKode, nominal) {
  if (nominal.lte(0)) return null;
  const [debitId, kreditId] = await Promise.all([
    requireAkunPosting(debitKode),
    requireAkunPosting(kreditKode),
  ]);
  const jurnal = await prisma.jurnal.create({
    data: {
      tanggal,
      keterangan: keterangan.slice(0, 255),
      status: "APPROVED",
      sumber: "AUTO",
      dibuatOlehId: userId,
      diputusOlehId: userId,
      diputusPada: new Date(),
      baris: {
        create: [
          { akunId: debitId, debit: nominal, kredit: nol },
          { akunId: kreditId, debit: nol, kredit: nominal },
        ],
      },
    },
  });
  await prisma.akun.update({ where: { id: debitId }, data: { saldo: { increment: nominal } } });
  await prisma.akun.update({ where: { id: kreditId }, data: { saldo: { decrement: nominal } } });
  return jurnal.id;
}

async function sudahDicatat(prefix, tanggal) {
  const start = new Date(Date.UTC(tanggal.getUTCFullYear(), tanggal.getUTCMonth(), 1));
  const end = new Date(Date.UTC(tanggal.getUTCFullYear(), tanggal.getUTCMonth() + 1, 0, 23, 59, 59));
  return prisma.jurnal.findFirst({
    where: { keterangan: { startsWith: prefix }, tanggal: { gte: start, lte: end } },
    select: { id: true },
  });
}

async function catatPenyusutanBulan(userId, bulan) {
  const tanggal = new Date(`${bulan}-01T12:00:00.000Z`);
  const greenhouses = await prisma.greenhouse.findMany({ select: { depresiasi_per_bulan: true } });
  let totalGh = nol;
  for (const gh of greenhouses) totalGh = totalGh.add(gh.depresiasi_per_bulan);

  const lahanListrik = await prisma.lahan.aggregate({ _sum: { biaya_listrik_bulan: true } });
  let totalListrik = lahanListrik._sum.biaya_listrik_bulan ?? nol;
  if (totalListrik.lte(0)) {
    const overhead = await prisma.biaya_Overhead.findFirst({
      orderBy: { periode: "desc" },
      select: { depresiasi_listrik: true },
    });
    totalListrik = overhead?.depresiasi_listrik ?? nol;
  }

  const ids = [];
  const prefixGh = `Penyusutan otomatis ${bulan} GH`;
  const prefixInst = `Penyusutan otomatis ${bulan} instalasi`;

  if (totalGh.gt(0) && !(await sudahDicatat(prefixGh, tanggal))) {
    const id = await postingPenyusutan(userId, tanggal, prefixGh, "5210", "1510", totalGh);
    if (id) ids.push(id);
  }
  if (totalListrik.gt(0) && !(await sudahDicatat(prefixInst, tanggal))) {
    const id = await postingPenyusutan(userId, tanggal, prefixInst, "5220", "1530", totalListrik);
    if (id) ids.push(id);
  }
  return ids;
}

async function updateHppOrderBaris() {
  const baris = await prisma.sales_Order_Baris.findMany({ where: { hpp_order: nol } });
  let updated = 0;
  for (const b of baris) {
    const cogs = await cogsForBaris(b);
    if (cogs.gt(0)) {
      await prisma.sales_Order_Baris.update({ where: { id: b.id }, data: { hpp_order: cogs } });
      updated += 1;
    }
  }
  return updated;
}

async function createAndApproveJurnalPenjualan(so, adminId) {
  const kasId = await requireAkunPosting(AKUN.KAS);
  const [curahId, packId, hppId, persediaanId, piutangId, uangMukaId] = await Promise.all([
    requireAkunPosting(AKUN.PENDAPATAN_CURAH),
    requireAkunPosting(AKUN.PENDAPATAN_PACK),
    requireAkunPosting(AKUN.HPP),
    requireAkunPosting(AKUN.PERSEDIAAN_SAYUR),
    requireAkunPosting(AKUN.PIUTANG),
    requireAkunPosting(AKUN.UANG_MUKA),
  ]);

  let pendapatanCurah = nol;
  let pendapatanPack = nol;
  let cogsTotal = nol;
  for (const line of so.baris) {
    if (line.jenis === "CURAH") pendapatanCurah = pendapatanCurah.add(line.subtotal);
    else pendapatanPack = pendapatanPack.add(line.subtotal);
    cogsTotal = cogsTotal.add(await cogsForBaris(line));
  }
  pendapatanCurah = round2(pendapatanCurah);
  pendapatanPack = round2(pendapatanPack);
  cogsTotal = round2(cogsTotal);
  const total = round2(so.total);

  const dp = so.jumlah_dp.gt(0) ? so.jumlah_dp : nol;
  let uangDiterima = so.jumlah_pelunasan.gt(0) ? so.jumlah_pelunasan : total.sub(dp);
  if (so.status_pembayaran === "LUNAS" && uangDiterima.lt(total.sub(dp))) {
    uangDiterima = round2(total.sub(dp));
  }
  uangDiterima = round2(Prisma.Decimal.min(uangDiterima, total.sub(dp)));
  const { kas: kasDiterima, piutang: sisaPiutang } = splitPenerimaanPenjualan(total, dp, uangDiterima);

  const baris = [];
  if (dp.gt(0)) baris.push({ akunId: so.akun_dp_id ?? uangMukaId, debit: dp, kredit: nol });
  if (kasDiterima.gt(0)) baris.push({ akunId: kasId, debit: kasDiterima, kredit: nol });
  if (sisaPiutang.gt(0)) baris.push({ akunId: piutangId, debit: sisaPiutang, kredit: nol });
  if (pendapatanCurah.gt(nol)) baris.push({ akunId: curahId, debit: nol, kredit: pendapatanCurah });
  if (pendapatanPack.gt(nol)) baris.push({ akunId: packId, debit: nol, kredit: pendapatanPack });
  if (cogsTotal.gt(nol)) {
    baris.push({ akunId: hppId, debit: cogsTotal, kredit: nol });
    baris.push({ akunId: persediaanId, debit: nol, kredit: cogsTotal });
  }

  const totalDebit = baris.reduce((s, b) => s.add(b.debit), nol);
  const totalKredit = baris.reduce((s, b) => s.add(b.kredit), nol);
  if (!totalDebit.eq(totalKredit)) throw new Error(`Jurnal ${so.nomor_so} tidak seimbang.`);

  const tanggal = new Date(so.dibuat_pada);
  tanggal.setUTCHours(12, 0, 0, 0);

  const jurnal = await prisma.jurnal.create({
    data: {
      tanggal,
      keterangan: `Penjualan ${so.nomor_so}`.slice(0, 255),
      status: "PENDING",
      sumber: "AUTO",
      dibuatOlehId: adminId,
      baris: { create: baris.map((b) => ({ akunId: b.akunId, debit: b.debit, kredit: b.kredit })) },
    },
  });
  await setujuiJurnal(jurnal.id, adminId);
  await prisma.sales_Order.update({
    where: { id: so.id },
    data: { jurnal_pendapatan_id: jurnal.id },
  });
  return jurnal.id;
}

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN", aktif: true },
    orderBy: { id: "asc" },
  });
  if (!admin) throw new Error("Tidak ada user ADMIN aktif.");

  const barisHppDiperbarui = await updateHppOrderBaris();
  const orders = await prisma.sales_Order.findMany({
    where: { status: "DELIVERED", jurnal_pendapatan_id: null },
    include: { baris: true },
    orderBy: { id: "asc" },
  });
  const jurnalPenjualan = [];
  for (const so of orders) {
    jurnalPenjualan.push(await createAndApproveJurnalPenjualan(so, admin.id));
  }

  const jurnalPenyusutan = [];
  for (let m = 1; m <= 12; m += 1) {
    const bulan = `2025-${String(m).padStart(2, "0")}`;
    try {
      jurnalPenyusutan.push(...(await catatPenyusutanBulan(admin.id, bulan)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("sudah dicatat")) continue;
      throw e;
    }
  }

  console.log(
    `Seed keuangan: ${barisHppDiperbarui} baris HPP, ${jurnalPenjualan.length} jurnal penjualan, ${jurnalPenyusutan.length} jurnal penyusutan.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
