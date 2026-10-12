import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sisaPiutangSo } from "@/lib/sales-order-pembayaran";
import {
  klasifikasiUmurPiutang,
  type PiutangPenjualanRow,
  type PiutangUmur,
} from "@/lib/piutang-penjualan-types";

export type { PiutangPenjualanRow, PiutangUmur } from "@/lib/piutang-penjualan-types";
export { labelUmurPiutang, klasifikasiUmurPiutang } from "@/lib/piutang-penjualan-types";

const MS_DAY = 86_400_000;

export async function listPiutangPenjualan(asOf = new Date()): Promise<PiutangPenjualanRow[]> {
  const rows = await prisma.sales_Order.findMany({
    where: { status: "DELIVERED", status_pembayaran: "PIUTANG" },
    orderBy: { terkirim_pada: "asc" },
    include: { pelanggan: { select: { nama: true } } },
  });

  const out: PiutangPenjualanRow[] = [];
  for (const so of rows) {
    const sisa = sisaPiutangSo(so);
    if (sisa.lte(0)) continue;

    const anchor = so.terkirim_pada ?? so.dikirim_pada ?? so.dibuat_pada;
    const hari = Math.max(0, Math.floor((asOf.getTime() - anchor.getTime()) / MS_DAY));

    out.push({
      id: so.id,
      nomor_so: so.nomor_so,
      pelanggan_nama: so.pelanggan.nama,
      total: so.total.toString(),
      sisa_piutang: sisa.toFixed(2),
      terkirim_pada: so.terkirim_pada?.toISOString() ?? null,
      hari_tertunggak: hari,
      umur: klasifikasiUmurPiutang(hari),
    });
  }
  return out;
}

export function ringkasanPiutang(rows: PiutangPenjualanRow[]) {
  const nol = new Prisma.Decimal(0);
  const byUmur: Record<PiutangUmur, Prisma.Decimal> = {
    current: nol,
    "31-60": nol,
    "61-90": nol,
    "90plus": nol,
  };
  let total = nol;
  for (const r of rows) {
    const amt = new Prisma.Decimal(r.sisa_piutang);
    total = total.add(amt);
    byUmur[r.umur] = byUmur[r.umur].add(amt);
  }
  return {
    jumlahPesanan: rows.length,
    totalPiutang: total.toFixed(2),
    byUmur: Object.fromEntries(
      (Object.keys(byUmur) as PiutangUmur[]).map((k) => [k, byUmur[k].toFixed(2)]),
    ) as Record<PiutangUmur, string>,
  };
}
