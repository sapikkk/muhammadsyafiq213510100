import { prisma } from "@/lib/prisma";
import { JurnalError } from "@/lib/jurnal";
import { assertJurnalTanggalAllowed, PeriodLockError } from "@/lib/period-lock";

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
  const tanggal = new Date();
  try {
    await assertJurnalTanggalAllowed(tanggal);
  } catch (error) {
    if (error instanceof PeriodLockError) {
      throw new JurnalError(error.message, error.status);
    }
    throw error;
  }

  return prisma.jurnal.create({
    data: {
      tanggal,
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
