import "server-only";

import { Prisma } from "@prisma/client";
import { assertJurnalTanggalAllowed, PeriodLockError } from "@/lib/period-lock";
import { prisma } from "@/lib/prisma";

export class PenyusutanError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const nol = new Prisma.Decimal(0);

function parseBulan(raw: unknown): { label: string; tanggal: Date } {
  const text = String(raw ?? "").trim();
  const m = /^\d{4}-\d{2}$/.test(text) ? text : new Date().toISOString().slice(0, 7);
  const tanggal = new Date(`${m}-01T12:00:00.000Z`);
  if (Number.isNaN(tanggal.getTime())) {
    throw new PenyusutanError("Bulan tidak valid (YYYY-MM).", 400);
  }
  return { label: m, tanggal };
}

async function requireAkun(kode: string) {
  const akun = await prisma.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new PenyusutanError(`Akun ${kode} tidak siap posting.`, 500);
  }
  return akun.id;
}

async function sudahDicatat(prefix: string, tanggal: Date) {
  const start = new Date(Date.UTC(tanggal.getUTCFullYear(), tanggal.getUTCMonth(), 1));
  const end = new Date(Date.UTC(tanggal.getUTCFullYear(), tanggal.getUTCMonth() + 1, 0, 23, 59, 59));
  return prisma.jurnal.findFirst({
    where: {
      keterangan: { startsWith: prefix },
      tanggal: { gte: start, lte: end },
    },
    select: { id: true },
  });
}

async function postingPenyusutan(
  userId: number,
  tanggal: Date,
  keterangan: string,
  debitKode: string,
  kreditKode: string,
  nominal: Prisma.Decimal,
) {
  if (nominal.lte(0)) return null;

  const [debitId, kreditId] = await Promise.all([
    requireAkun(debitKode),
    requireAkun(kreditKode),
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

  await prisma.akun.update({
    where: { id: debitId },
    data: { saldo: { increment: nominal } },
  });
  await prisma.akun.update({
    where: { id: kreditId },
    data: { saldo: { decrement: nominal } },
  });

  return jurnal.id;
}

export type HasilPenyusutanBulan = {
  bulan: string;
  jurnalIds: number[];
  greenhouse: string;
  instalasi: string;
};

/** Penyusutan bulanan otomatis (v2-H): GH dari master + listrik dari overhead terakhir. */
export async function catatPenyusutanBulan(
  userId: number,
  raw: { bulan?: unknown } = {},
): Promise<HasilPenyusutanBulan> {
  const { label, tanggal } = parseBulan(raw.bulan);
  try {
    await assertJurnalTanggalAllowed(tanggal);
  } catch (error) {
    if (error instanceof PeriodLockError) {
      throw new PenyusutanError(error.message, error.status);
    }
    throw error;
  }

  const greenhouses = await prisma.greenhouse.findMany({
    select: { depresiasi_per_bulan: true },
  });
  let totalGh = nol;
  for (const gh of greenhouses) {
    totalGh = totalGh.add(gh.depresiasi_per_bulan);
  }

  const overhead = await prisma.biaya_Overhead.findFirst({
    orderBy: { periode: "desc" },
    select: { depresiasi_listrik: true },
  });
  const totalListrik = overhead?.depresiasi_listrik ?? nol;

  const jurnalIds: number[] = [];
  const prefixGh = `Penyusutan otomatis ${label} GH`;
  const prefixInst = `Penyusutan otomatis ${label} instalasi`;

  if (totalGh.gt(0)) {
    if (await sudahDicatat(prefixGh, tanggal)) {
      throw new PenyusutanError(`Penyusutan greenhouse ${label} sudah dicatat.`, 409);
    }
    const id = await postingPenyusutan(
      userId,
      tanggal,
      prefixGh,
      "5210",
      "1510",
      totalGh,
    );
    if (id) jurnalIds.push(id);
  }

  if (totalListrik.gt(0)) {
    if (await sudahDicatat(prefixInst, tanggal)) {
      throw new PenyusutanError(`Penyusutan instalasi ${label} sudah dicatat.`, 409);
    }
    const id = await postingPenyusutan(
      userId,
      tanggal,
      prefixInst,
      "5220",
      "1530",
      totalListrik,
    );
    if (id) jurnalIds.push(id);
  }

  if (jurnalIds.length === 0) {
    throw new PenyusutanError("Tidak ada nominal penyusutan (greenhouse/overhead nol).", 400);
  }

  return {
    bulan: label,
    jurnalIds,
    greenhouse: totalGh.toString(),
    instalasi: totalListrik.toString(),
  };
}
