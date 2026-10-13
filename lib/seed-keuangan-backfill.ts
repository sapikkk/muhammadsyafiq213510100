import "server-only";

import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import { catatPenyusutanBulan } from "@/lib/penyusutan-otomatis";
import { prisma } from "@/lib/prisma";
import { splitPenerimaanPenjualan } from "@/lib/sales-order-penerimaan";
import { setujuiJurnal } from "@/lib/jurnal";

const nol = new Prisma.Decimal(0);
const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

async function requireAkunPosting(kode: string) {
  const akun = await prisma.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new Error(`Akun ${kode} tidak siap posting.`);
  }
  return akun.id;
}

async function cogsForBaris(line: {
  siklus_id: number;
  jenis: string;
  jumlah: Prisma.Decimal;
  lubang_terpakai: number;
  hpp_order: Prisma.Decimal;
}): Promise<Prisma.Decimal> {
  if (line.hpp_order.gt(0)) return round2(line.hpp_order);
  const hpp = await prisma.hPP.findUnique({ where: { siklus_id: line.siklus_id } });
  if (!hpp) return nol;
  const unit = line.jenis === "CURAH" ? hpp.hpp_per_kg : hpp.hpp_per_pack;
  return round2(line.jumlah.mul(unit));
}

async function updateHppOrderBaris() {
  const baris = await prisma.sales_Order_Baris.findMany({
    where: { hpp_order: nol },
    include: { siklus: { select: { id: true } } },
  });
  let updated = 0;
  for (const b of baris) {
    const cogs = await cogsForBaris({
      siklus_id: b.siklus_id,
      jenis: b.jenis,
      jumlah: b.jumlah,
      lubang_terpakai: b.lubang_terpakai,
      hpp_order: b.hpp_order,
    });
    if (cogs.gt(0)) {
      await prisma.sales_Order_Baris.update({
        where: { id: b.id },
        data: { hpp_order: cogs },
      });
      updated += 1;
    }
  }
  return updated;
}

async function createAndApproveJurnalPenjualan(
  so: {
    id: number;
    nomor_so: string;
    total: Prisma.Decimal;
    jumlah_dp: Prisma.Decimal;
    status_pembayaran: string;
    akun_dp_id: number | null;
    dibuat_pada: Date;
    jumlah_pelunasan: Prisma.Decimal;
    baris: {
      jenis: string;
      subtotal: Prisma.Decimal;
      siklus_id: number;
      jumlah: Prisma.Decimal;
      lubang_terpakai: number;
      hpp_order: Prisma.Decimal;
    }[];
  },
  adminId: number,
) {
  const kasId = await requireAkunPosting(AKUN_KODE.KAS);
  const [curahId, packId, hppId, persediaanId, piutangId, uangMukaId] = await Promise.all([
    requireAkunPosting(AKUN_KODE.PENDAPATAN_CURAH),
    requireAkunPosting(AKUN_KODE.PENDAPATAN_PACK),
    requireAkunPosting(AKUN_KODE.HPP),
    requireAkunPosting(AKUN_KODE.PERSEDIAAN_SAYUR),
    requireAkunPosting(AKUN_KODE.PIUTANG),
    requireAkunPosting(AKUN_KODE.UANG_MUKA),
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

  type Baris = { akunId: number; debit: Prisma.Decimal; kredit: Prisma.Decimal };
  const baris: Baris[] = [];

  if (dp.gt(0)) {
    baris.push({ akunId: so.akun_dp_id ?? uangMukaId, debit: dp, kredit: nol });
  }
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
  if (!totalDebit.eq(totalKredit)) {
    throw new Error(`Jurnal ${so.nomor_so} tidak seimbang.`);
  }

  const tanggal = new Date(so.dibuat_pada);
  tanggal.setUTCHours(12, 0, 0, 0);

  const jurnal = await prisma.jurnal.create({
    data: {
      tanggal,
      keterangan: `Penjualan ${so.nomor_so}`.slice(0, 255),
      status: "PENDING",
      sumber: "AUTO",
      dibuatOlehId: adminId,
      baris: {
        create: baris.map((b) => ({
          akunId: b.akunId,
          debit: b.debit,
          kredit: b.kredit,
        })),
      },
    },
  });

  await setujuiJurnal(jurnal.id, adminId);

  await prisma.sales_Order.update({
    where: { id: so.id },
    data: { jurnal_pendapatan_id: jurnal.id },
  });

  return jurnal.id;
}

async function backfillJurnalPenjualan(adminId: number) {
  const orders = await prisma.sales_Order.findMany({
    where: {
      status: "DELIVERED",
      jurnal_pendapatan_id: null,
    },
    include: { baris: true },
    orderBy: { id: "asc" },
  });

  const ids: number[] = [];
  for (const so of orders) {
    const id = await createAndApproveJurnalPenjualan(so, adminId);
    ids.push(id);
  }
  return ids;
}

async function seedPenyusutan2025(adminId: number) {
  const ids: number[] = [];
  for (let m = 1; m <= 12; m += 1) {
    const bulan = `2025-${String(m).padStart(2, "0")}`;
    try {
      const hasil = await catatPenyusutanBulan(adminId, { bulan });
      ids.push(...hasil.jurnalIds);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("sudah dicatat")) continue;
      if (msg.includes("Tidak ada nominal")) continue;
      throw e;
    }
  }
  return ids;
}

export type SeedKeuanganHasil = {
  barisHppDiperbarui: number;
  jurnalPenjualan: number;
  jurnalPenyusutan: number;
};

/** Isi jurnal & saldo akun dari data operasi seed (SO DELIVERED, penyusutan bulanan). Idempotent untuk SO yang sudah punya jurnal. */
export async function backfillKeuanganDariSeed(): Promise<SeedKeuanganHasil> {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN", aktif: true },
    orderBy: { id: "asc" },
  });
  if (!admin) {
    throw new Error("Tidak ada user ADMIN aktif. Jalankan seed demo dulu.");
  }

  const barisHppDiperbarui = await updateHppOrderBaris();
  const jurnalPenjualan = await backfillJurnalPenjualan(admin.id);
  const jurnalPenyusutan = await seedPenyusutan2025(admin.id);

  return {
    barisHppDiperbarui,
    jurnalPenjualan: jurnalPenjualan.length,
    jurnalPenyusutan: jurnalPenyusutan.length,
  };
}
