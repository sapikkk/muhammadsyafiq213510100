import { prisma } from "@/lib/prisma";

export class PeriodLockError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function startOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export async function getPeriodeTutup(): Promise<Date | null> {
  const row = await prisma.akuntansi_Setting.findUnique({ where: { id: 1 } });
  return row?.periode_tutup ?? null;
}

export async function setPeriodeTutup(tanggal: Date | null) {
  return prisma.akuntansi_Setting.upsert({
    where: { id: 1 },
    create: { id: 1, periode_tutup: tanggal },
    update: { periode_tutup: tanggal },
  });
}

/** Tolak jurnal dengan tanggal sebelum periode tutup kecuali admin override (PO). */
export async function assertJurnalTanggalAllowed(
  tanggal: Date,
  opts?: { adminOverride?: boolean },
) {
  if (opts?.adminOverride) return;
  const lock = await getPeriodeTutup();
  if (!lock) return;
  const t = startOfDay(tanggal);
  const batas = startOfDay(lock);
  if (t < batas) {
    throw new PeriodLockError(
      `Periode tutup ${batas.toISOString().slice(0, 10)}: jurnal backdate ditolak.`,
      400,
    );
  }
}
