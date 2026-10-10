import { Prisma } from "@prisma/client";
import type { PrismaTransaction } from "@/lib/prisma";

const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

export function akunPersediaanUntukItemKode(kode: string): string {
  const u = kode.toUpperCase();
  if (u.includes("ROCK") || u.includes("MEDIA") || u.includes("WOOL")) return "1320";
  if (u.includes("NUTRISI")) return "1330";
  if (u.includes("PACK") || u.includes("PLAST") || u.includes("KEMASAN")) return "1340";
  return "1310";
}

async function requireAkunPosting(tx: PrismaTransaction, kode: string) {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new Error(`Akun ${kode} tidak siap posting penyesuaian pack.`);
  }
  return akun.id;
}

export function selisihPenyesuaianPackHabis(
  hargaPack: Prisma.Decimal,
  jumlahUnit: Prisma.Decimal,
  biayaPerUnit: Prisma.Decimal,
): Prisma.Decimal {
  return round2(hargaPack.sub(round2(jumlahUnit.mul(biayaPerUnit))));
}

/** Selisih pembulatan biayaPerUnit vs hargaPack — Dr/Cr 5400 ↔ persediaan saat pack HABIS. */
export async function maybeJurnalPenyesuaianPackHabis(
  tx: PrismaTransaction,
  pack: {
    kode: string;
    hargaPack: Prisma.Decimal;
    jumlahUnit: Prisma.Decimal;
    biayaPerUnit: Prisma.Decimal;
  },
  itemKode: string,
  userId: number,
  tanggal = new Date(),
) {
  const selisih = selisihPenyesuaianPackHabis(pack.hargaPack, pack.jumlahUnit, pack.biayaPerUnit);
  if (selisih.abs().lte(new Prisma.Decimal("0.01"))) return;

  const bebanId = await requireAkunPosting(tx, "5400");
  const persId = await requireAkunPosting(tx, akunPersediaanUntukItemKode(itemKode));
  const abs = selisih.abs();

  const baris =
    selisih.gt(0)
      ? [
          { akunId: bebanId, debit: abs, kredit: new Prisma.Decimal(0) },
          { akunId: persId, debit: new Prisma.Decimal(0), kredit: abs },
        ]
      : [
          { akunId: persId, debit: abs, kredit: new Prisma.Decimal(0) },
          { akunId: bebanId, debit: new Prisma.Decimal(0), kredit: abs },
        ];

  const jurnal = await tx.jurnal.create({
    data: {
      tanggal,
      keterangan: `Penyesuaian pack habis ${pack.kode}`.slice(0, 255),
      status: "APPROVED",
      sumber: "AUTO",
      dibuatOlehId: userId,
      diputusOlehId: userId,
      diputusPada: new Date(),
      baris: { create: baris },
    },
  });

  for (const b of baris) {
    const delta = b.debit.sub(b.kredit);
    await tx.akun.update({ where: { id: b.akunId }, data: { saldo: { increment: delta } } });
  }

  return jurnal.id;
}
