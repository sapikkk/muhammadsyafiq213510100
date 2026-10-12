import "server-only";

import { Prisma } from "@prisma/client";
import type { PrismaTransaction } from "@/lib/prisma";
import { akunPersediaanUntukItemKode } from "@/lib/active-pack-habis-jurnal";

async function requireAkunPosting(tx: PrismaTransaction, kode: string) {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new Error(`Akun ${kode} tidak siap posting inventaris.`);
  }
  return akun.id;
}

/** Stok keluar / susut manual — Dr beban susut, Cr persediaan. */
export async function jurnalStokKeluarInventaris(
  tx: PrismaTransaction,
  opts: {
    itemKode: string;
    nominal: Prisma.Decimal;
    keterangan: string;
    userId: number;
  },
) {
  if (opts.nominal.lte(0)) return null;

  const bebanId = await requireAkunPosting(tx, "5300");
  const persId = await requireAkunPosting(tx, akunPersediaanUntukItemKode(opts.itemKode));
  const nol = new Prisma.Decimal(0);
  const nominal = opts.nominal.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

  const baris = [
    { akunId: bebanId, debit: nominal, kredit: nol },
    { akunId: persId, debit: nol, kredit: nominal },
  ];

  const jurnal = await tx.jurnal.create({
    data: {
      tanggal: new Date(),
      keterangan: opts.keterangan.slice(0, 255),
      status: "PENDING",
      sumber: "AUTO",
      dibuatOlehId: opts.userId,
      baris: { create: baris },
    },
  });

  return jurnal.id;
}
