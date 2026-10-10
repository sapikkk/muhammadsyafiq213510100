import { prisma } from "@/lib/prisma";
import { JurnalError } from "@/lib/jurnal";

/** Jurnal pembalik PENDING (v2-H epic) — baris debit/kredit ditukar. */
export async function createJurnalReversal(jurnalId: number, userId: number, alasan: string) {
  const teks = alasan.trim();
  if (!teks) throw new JurnalError("Isi alasan pembalikan.", 400);

  const asal = await prisma.jurnal.findUnique({
    where: { id: jurnalId },
    include: { baris: true },
  });
  if (!asal) throw new JurnalError("Jurnal tidak ditemukan.", 404);
  if (asal.status !== "APPROVED") {
    throw new JurnalError("Hanya jurnal APPROVED yang bisa dibalik.", 400);
  }

  const keterangan = `Reversal #${jurnalId}: ${teks}`.slice(0, 255);

  return prisma.jurnal.create({
    data: {
      tanggal: new Date(),
      keterangan,
      status: "PENDING",
      sumber: "AUTO",
      dibuatOlehId: userId,
      baris: {
        create: asal.baris.map((b) => ({
          akunId: b.akunId,
          debit: b.kredit,
          kredit: b.debit,
        })),
      },
    },
    include: { baris: true },
  });
}
