import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tipeAkunLabel } from "@/lib/akun-tipe";
import type { TipeAkunKey } from "@/lib/akun-tipe";

const nol = new Prisma.Decimal(0);
const TIPE_ORDER: TipeAkunKey[] = ["ASET", "KEWAJIBAN", "MODAL", "PENDAPATAN", "BEBAN"];

export type BalanceRow = { kode: string; nama: string; saldo: string };

export async function buildBalanceSheet(asOf: Date) {
  const akun = await prisma.akun.findMany({
    where: { aktif: true, anak: { none: {} } },
    orderBy: { kode: "asc" },
    select: { kode: true, nama: true, saldo: true, tipe: true },
  });

  const sections: { tipe: string; rows: BalanceRow[]; subtotal: string }[] = [];

  for (const tipe of TIPE_ORDER) {
    const rows = akun
      .filter((a) => a.tipe === tipe)
      .map((a) => ({ kode: a.kode, nama: a.nama, saldo: a.saldo.toFixed(2) }));
    if (rows.length === 0) continue;
    const sub = rows.reduce((s, r) => s.add(new Prisma.Decimal(r.saldo)), nol);
    sections.push({
      tipe: tipeAkunLabel[tipe],
      rows,
      subtotal: sub.toFixed(2),
    });
  }

  const totalAset = akun
    .filter((a) => a.tipe === "ASET")
    .reduce((s, a) => s.add(a.saldo), nol);
  const totalKewajiban = akun
    .filter((a) => a.tipe === "KEWAJIBAN")
    .reduce((s, a) => s.add(a.saldo), nol);
  const totalModal = akun
    .filter((a) => a.tipe === "MODAL")
    .reduce((s, a) => s.add(a.saldo), nol);

  return {
    asOf: asOf.toISOString().slice(0, 10),
    sections,
    totalAset: totalAset.toFixed(2),
    totalKewajibanModal: totalKewajiban.add(totalModal).toFixed(2),
  };
}
