import { isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
import { prisma } from "@/lib/prisma";

export class MonitorError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const kondisiMonitorOptions = [
  { value: "BAIK", label: "Baik" },
  { value: "PERHATIAN", label: "Perlu perhatian" },
  { value: "BURUK", label: "Buruk / risiko gagal" },
] as const;

const FASE_MONITOR: FaseProduksi[] = [
  "SPROUT_DAUN",
  "TAMBAL",
  "PINDAH_KOLAM",
  "PENDEWASAAN",
];

export type MonitorInput = {
  siklusId: number;
  kondisi: (typeof kondisiMonitorOptions)[number]["value"];
  catatan: string | null;
};

export function parseMonitorInput(raw: Record<string, unknown>): MonitorInput {
  const siklusId = Number(raw.siklusId);
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    throw new MonitorError("Siklus tidak valid.", 400);
  }
  const kondisi = String(raw.kondisi ?? "").trim();
  if (!kondisiMonitorOptions.some((o) => o.value === kondisi)) {
    throw new MonitorError("Pilih kondisi pertumbuhan.", 400);
  }
  let catatan: string | null = null;
  if (raw.catatan) {
    catatan = String(raw.catatan).trim().slice(0, 255);
  }
  return {
    siklusId,
    kondisi: kondisi as MonitorInput["kondisi"],
    catatan,
  };
}

export async function catatMonitorPertumbuhan(userId: number, input: MonitorInput) {
  return prisma.$transaction(async (tx) => {
    const siklus = await tx.siklus_Produksi.findUnique({ where: { id: input.siklusId } });
    if (!siklus) throw new MonitorError("Siklus tidak ditemukan.", 404);
    if (!isFaseProduksi(siklus.status) || !FASE_MONITOR.includes(siklus.status)) {
      throw new MonitorError("Monitor hanya pada fase sprout hingga pendewasaan.", 400);
    }

    const label = kondisiMonitorOptions.find((o) => o.value === input.kondisi)?.label ?? input.kondisi;
    const catatanLog = [`Monitor: ${label}`, input.catatan].filter(Boolean).join(" — ");

    return tx.log_Produksi.create({
      data: {
        siklus_id: input.siklusId,
        fase_dari: siklus.status,
        fase_ke: siklus.status,
        catatan: catatanLog,
        userId,
      },
    });
  });
}
