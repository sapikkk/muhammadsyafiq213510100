import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import { sisaPiutangSo } from "@/lib/sales-order-pembayaran";
import { prisma } from "@/lib/prisma";
import { SalesOrderError, type JenisSo } from "@/lib/sales-order";

type SalesOrderTx = Pick<typeof prisma, "akun" | "hPP" | "jurnal" | "sales_Order">;

const nol = new Prisma.Decimal(0);
const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

function parseCatatan(raw: unknown): string | null {
  if (raw == null || raw === "") return null;
  const t = String(raw).trim().slice(0, 500);
  return t || null;
}

async function requireAkunPosting(tx: SalesOrderTx, kode: string) {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new SalesOrderError(`Akun ${kode} tidak siap untuk jurnal penjualan.`, 500);
  }
  return akun.id;
}

type BarisCogs = {
  siklus_id: number;
  jenis: string;
  jumlah: Prisma.Decimal;
  lubang_terpakai: number;
  hpp_order: Prisma.Decimal;
};

async function cogsForBaris(tx: SalesOrderTx, line: BarisCogs): Promise<Prisma.Decimal> {
  if (line.hpp_order.gt(0) && line.lubang_terpakai > 0) {
    return round2(line.hpp_order);
  }
  const hpp = await tx.hPP.findUnique({ where: { siklus_id: line.siklus_id } });
  if (!hpp) {
    throw new SalesOrderError(`HPP batch #${line.siklus_id} belum ada — approve panen dulu.`, 400);
  }
  const jenis = line.jenis as JenisSo;
  const unit = jenis === "CURAH" ? hpp.hpp_per_kg : hpp.hpp_per_pack;
  return round2(line.jumlah.mul(unit));
}

async function createJurnalPenjualanPending(
  tx: SalesOrderTx,
  so: {
    id: number;
    nomor_so: string;
    total: Prisma.Decimal;
    jumlah_dp: Prisma.Decimal;
    status_pembayaran: string;
    akun_dp_id: number | null;
    baris: {
      jenis: string;
      subtotal: Prisma.Decimal;
      siklus_id: number;
      jumlah: Prisma.Decimal;
      lubang_terpakai: number;
      hpp_order: Prisma.Decimal;
    }[];
  },
  userId: number,
) {
  const [kasId, curahId, packId, hppId, persediaanId, piutangId, uangMukaId] =
    await Promise.all([
      requireAkunPosting(tx, AKUN_KODE.KAS),
      requireAkunPosting(tx, AKUN_KODE.PENDAPATAN_CURAH),
      requireAkunPosting(tx, AKUN_KODE.PENDAPATAN_PACK),
      requireAkunPosting(tx, AKUN_KODE.HPP),
      requireAkunPosting(tx, AKUN_KODE.PERSEDIAAN_SAYUR),
      requireAkunPosting(tx, AKUN_KODE.PIUTANG),
      requireAkunPosting(tx, AKUN_KODE.UANG_MUKA),
    ]);

  let pendapatanCurah = nol;
  let pendapatanPack = nol;
  let cogsTotal = nol;

  for (const line of so.baris) {
    const jenis = line.jenis as JenisSo;
    if (jenis === "CURAH") pendapatanCurah = pendapatanCurah.add(line.subtotal);
    else pendapatanPack = pendapatanPack.add(line.subtotal);
    cogsTotal = cogsTotal.add(await cogsForBaris(tx, line));
  }

  pendapatanCurah = round2(pendapatanCurah);
  pendapatanPack = round2(pendapatanPack);
  cogsTotal = round2(cogsTotal);
  const total = round2(so.total);

  type Baris = { akunId: number; debit: Prisma.Decimal; kredit: Prisma.Decimal };
  const baris: Baris[] = [];

  const dpDiterima =
    so.status_pembayaran === "DP_DITERIMA" && so.jumlah_dp.gt(0) ? so.jumlah_dp : nol;
  const sisaPiutang = round2(total.sub(dpDiterima));

  if (dpDiterima.gt(0)) {
    const umId = so.akun_dp_id ?? uangMukaId;
    baris.push({ akunId: umId, debit: dpDiterima, kredit: nol });
    if (sisaPiutang.gt(0)) {
      baris.push({ akunId: piutangId, debit: sisaPiutang, kredit: nol });
    }
  } else {
    baris.push({ akunId: kasId, debit: total, kredit: nol });
  }
  if (pendapatanCurah.gt(nol)) {
    baris.push({ akunId: curahId, debit: nol, kredit: pendapatanCurah });
  }
  if (pendapatanPack.gt(nol)) {
    baris.push({ akunId: packId, debit: nol, kredit: pendapatanPack });
  }
  if (cogsTotal.gt(nol)) {
    baris.push({ akunId: hppId, debit: cogsTotal, kredit: nol });
    baris.push({ akunId: persediaanId, debit: nol, kredit: cogsTotal });
  }

  const totalDebit = baris.reduce((s, b) => s.add(b.debit), nol);
  const totalKredit = baris.reduce((s, b) => s.add(b.kredit), nol);
  if (!totalDebit.eq(totalKredit)) {
    throw new SalesOrderError("Jurnal penjualan tidak seimbang — hubungi admin.", 500);
  }

  const keterangan = `Penjualan ${so.nomor_so}`.slice(0, 255);
  const tanggal = new Date();
  tanggal.setHours(0, 0, 0, 0);

  return tx.jurnal.create({
    data: {
      tanggal,
      keterangan,
      status: "PENDING",
      sumber: "AUTO",
      dibuatOlehId: userId,
      baris: {
        create: baris.map((b) => ({
          akunId: b.akunId,
          debit: b.debit,
          kredit: b.kredit,
        })),
      },
    },
  });
}

export async function listSalesOrdersPengiriman() {
  return prisma.sales_Order.findMany({
    where: { status: { in: ["CONFIRMED", "SHIPPED"] } },
    orderBy: { id: "desc" },
    include: {
      pelanggan: { select: { nama: true } },
      jurnal_pendapatan: { select: { id: true, status: true, keterangan: true } },
      baris: { include: { siklus: { select: { kode_batch: true } } } },
    },
  });
}

export async function shipSalesOrder(id: number, userId: number, catatanRaw?: unknown) {
  const catatan = parseCatatan(catatanRaw);
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({ where: { id } });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status !== "CONFIRMED") {
      throw new SalesOrderError("Hanya SO CONFIRMED yang bisa dikirim (SHIPPED).", 400);
    }
    return tx.sales_Order.update({
      where: { id },
      data: {
        status: "SHIPPED",
        dikirim_pada: new Date(),
        dikirim_oleh_id: userId,
        catatan_pengiriman: catatan ?? so.catatan_pengiriman,
      },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
      },
    });
  });
}

export async function deliverSalesOrder(id: number, userId: number, catatanRaw?: unknown) {
  const catatan = parseCatatan(catatanRaw);
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({
      where: { id },
      include: { baris: true },
    });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status !== "SHIPPED") {
      throw new SalesOrderError("Hanya SO SHIPPED yang bisa ditandai terkirim (DELIVERED).", 400);
    }
    if (so.jurnal_pendapatan_id) {
      throw new SalesOrderError("Jurnal penjualan untuk SO ini sudah dibuat.", 409);
    }

    const jurnal = await createJurnalPenjualanPending(tx, so, userId);

    const dpDiterima =
      so.status_pembayaran === "DP_DITERIMA" && so.jumlah_dp.gt(0) ? so.jumlah_dp : nol;
    let status_pembayaran = so.status_pembayaran;
    if (dpDiterima.gt(0)) {
      status_pembayaran = sisaPiutangSo({
        total: so.total,
        jumlah_dp: so.jumlah_dp,
        jumlah_pelunasan: so.jumlah_pelunasan,
      }).lte(0)
        ? "LUNAS"
        : "PIUTANG";
    } else {
      status_pembayaran = "LUNAS";
    }

    return tx.sales_Order.update({
      where: { id },
      data: {
        status: "DELIVERED",
        terkirim_pada: new Date(),
        terkirim_oleh_id: userId,
        jurnal_pendapatan_id: jurnal.id,
        status_pembayaran,
        ...(catatan != null ? { catatan_pengiriman: catatan } : {}),
      },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
        jurnal_pendapatan: { select: { id: true, status: true, keterangan: true } },
      },
    });
  });
}
