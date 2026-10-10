import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);

export type IncomeStatementLine = { label: string; nominal: string };

export async function buildIncomeStatement(start: Date, end: Date) {
  const jurnals = await prisma.jurnal.findMany({
    where: { status: "APPROVED", tanggal: { gte: start, lte: end } },
    include: { baris: { include: { akun: { select: { tipe: true, kode: true } } } } },
  });

  let pendapatan = nol;
  let hpp = nol;
  let bebanLain = nol;

  for (const j of jurnals) {
    for (const line of j.baris) {
      if (line.akun.tipe === "PENDAPATAN") {
        pendapatan = pendapatan.add(line.kredit.sub(line.debit));
      } else if (line.akun.tipe === "BEBAN") {
        const amt = line.debit.sub(line.kredit);
        if (line.akun.kode === "5100") hpp = hpp.add(amt);
        else bebanLain = bebanLain.add(amt);
      }
    }
  }

  const labaKotor = pendapatan.sub(hpp);
  const labaBersih = labaKotor.sub(bebanLain);

  const lines: IncomeStatementLine[] = [
    { label: "Pendapatan", nominal: pendapatan.toFixed(2) },
    { label: "Harga pokok penjualan (5100)", nominal: hpp.toFixed(2) },
    { label: "Laba kotor", nominal: labaKotor.toFixed(2) },
    { label: "Beban lainnya", nominal: bebanLain.toFixed(2) },
    { label: "Laba bersih (periode)", nominal: labaBersih.toFixed(2) },
  ];

  return { lines, labaBersih: labaBersih.toFixed(2) };
}
