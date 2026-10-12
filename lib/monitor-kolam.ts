import "server-only";

import { Prisma } from "@prisma/client";
import { isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
import { prisma } from "@/lib/prisma";

export class MonitorKolamError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const FASE_MONITOR: FaseProduksi[] = [
  "SPROUT_DAUN",
  "TAMBAL",
  "PINDAH_KOLAM",
  "PENDEWASAAN",
];

export type MonitorKolamInput = {
  kolamId: number;
  siklusId: number;
  ppm: Prisma.Decimal;
  ph: Prisma.Decimal;
  suhuC: Prisma.Decimal;
};

function parseAngka(raw: unknown, label: string): Prisma.Decimal {
  const s = String(raw ?? "")
    .trim()
    .replace(",", ".");
  if (!s) throw new MonitorKolamError(`Isi ${label}.`, 400);
  const n = Number(s);
  if (!Number.isFinite(n)) throw new MonitorKolamError(`${label} harus angka.`, 400);
  return new Prisma.Decimal(n);
}

export function parseMonitorKolamInput(raw: Record<string, unknown>): MonitorKolamInput {
  const kolamId = Number(raw.kolamId);
  const siklusId = Number(raw.siklusId);
  if (!Number.isInteger(kolamId) || kolamId <= 0) {
    throw new MonitorKolamError("Kolam tidak valid.", 400);
  }
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    throw new MonitorKolamError("Siklus tidak valid.", 400);
  }
  const ppm = parseAngka(raw.ppm, "PPM");
  const ph = parseAngka(raw.ph, "pH");
  const suhuC = parseAngka(raw.suhu, "Suhu air");
  if (ph.lt(0) || ph.gt(14)) {
    throw new MonitorKolamError("pH harus antara 0 dan 14.", 400);
  }
  if (ppm.lt(0) || ppm.gt(5000)) {
    throw new MonitorKolamError("PPM di luar rentang wajar (0–5000).", 400);
  }
  if (suhuC.lt(0) || suhuC.gt(50)) {
    throw new MonitorKolamError("Suhu air di luar rentang wajar (0–50 °C).", 400);
  }
  return { kolamId, siklusId, ppm, ph, suhuC };
}

export async function catatMonitorKolam(userId: number, input: MonitorKolamInput) {
  return prisma.$transaction(async (tx) => {
    const siklus = await tx.siklus_Produksi.findUnique({
      where: { id: input.siklusId },
      select: { id: true, kolam_id: true, status: true },
    });
    if (!siklus) throw new MonitorKolamError("Siklus tidak ditemukan.", 404);
    if (siklus.kolam_id !== input.kolamId) {
      throw new MonitorKolamError("Kolam tidak cocok dengan siklus ini.", 400);
    }
    if (!isFaseProduksi(siklus.status) || !FASE_MONITOR.includes(siklus.status)) {
      throw new MonitorKolamError("Monitor kolam hanya fase sprout hingga pendewasaan.", 400);
    }

    return tx.log_Monitor_Kolam.create({
      data: {
        kolam_id: input.kolamId,
        siklus_id: input.siklusId,
        ppm: input.ppm,
        ph: input.ph,
        suhu_c: input.suhuC,
        userId,
      },
    });
  });
}

export type MonitorGrafikTitik = {
  waktu: string;
  label: string;
  ppm: number;
  ph: number;
  suhu: number;
  kolam: string;
  siklusKode: string;
};

/** Titik grafik beranda petani — batch aktif (bukan selesai/gagal total). */
export async function listMonitorGrafikPetani(limit = 40): Promise<MonitorGrafikTitik[]> {
  const rows = await prisma.log_Monitor_Kolam.findMany({
    where: {
      siklus: {
        status: {
          notIn: ["SELESAI", "GAGAL_TOTAL"],
        },
      },
    },
    orderBy: { waktu: "desc" },
    take: limit,
    include: {
      kolam: { select: { nama: true, greenhouse: { select: { nama: true } } } },
      siklus: { select: { kode_batch: true } },
    },
  });

  return rows
    .reverse()
    .map((r) => {
      const t = r.waktu;
      const label = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(t);
      return {
        waktu: t.toISOString(),
        label,
        ppm: Number(r.ppm),
        ph: Number(r.ph),
        suhu: Number(r.suhu_c),
        kolam: `${r.kolam.greenhouse.nama} / ${r.kolam.nama}`,
        siklusKode: r.siklus.kode_batch,
      };
    });
}
