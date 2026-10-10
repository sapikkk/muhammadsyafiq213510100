import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type PrismaDb = typeof prisma;

export class BiayaError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseMoney(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new BiayaError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new BiayaError(`${label} harus angka nol atau lebih, maksimal 2 desimal.`, 400);
  }
  return new Prisma.Decimal(text);
}

function parseDate(raw: unknown): Date {
  const text = String(raw ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new BiayaError("Periode harus format YYYY-MM-DD.", 400);
  }
  return new Date(`${text}T12:00:00.000Z`);
}

function recalcSubtotal(parts: {
  biaya_benih: Prisma.Decimal;
  biaya_rockwool: Prisma.Decimal;
  biaya_nutrisi: Prisma.Decimal;
  biaya_listrik_pompa: Prisma.Decimal;
}) {
  return parts.biaya_benih
    .add(parts.biaya_rockwool)
    .add(parts.biaya_nutrisi)
    .add(parts.biaya_listrik_pompa);
}

export async function listBiayaLangsungBySiklus(siklusId: number) {
  return prisma.biaya_Langsung.findUnique({
    where: { siklus_id: siklusId },
    include: { siklus: { select: { kode_batch: true } } },
  });
}

export async function updateBiayaLangsung(
  siklusId: number,
  raw: Record<string, unknown>,
) {
  const existing = await prisma.biaya_Langsung.findUnique({ where: { siklus_id: siklusId } });
  if (!existing) throw new BiayaError("Biaya langsung untuk siklus ini belum ada.", 404);

  const biaya_nutrisi = parseMoney(raw.biayaNutrisi, "Biaya nutrisi");
  const biaya_listrik_pompa = parseMoney(raw.biayaListrikPompa, "Biaya listrik/pompa");
  const subtotal = recalcSubtotal({
    biaya_benih: existing.biaya_benih,
    biaya_rockwool: existing.biaya_rockwool,
    biaya_nutrisi,
    biaya_listrik_pompa,
  });

  return prisma.biaya_Langsung.update({
    where: { siklus_id: siklusId },
    data: { biaya_nutrisi, biaya_listrik_pompa, subtotal },
  });
}

export async function listOverhead() {
  return prisma.biaya_Overhead.findMany({ orderBy: { periode: "desc" } });
}

export async function createOverhead(raw: Record<string, unknown>) {
  const periode = parseDate(raw.periode);
  const depresiasi_greenhouse = parseMoney(raw.depresiasiGreenhouse, "Depresiasi greenhouse");
  const depresiasi_listrik = parseMoney(raw.depresiasiListrik, "Depresiasi listrik");
  const sewa_lahan = parseMoney(raw.sewaLahan, "Sewa lahan");
  const gaji_karyawan = parseMoney(raw.gajiKaryawan, "Gaji karyawan");
  const subtotal = depresiasi_greenhouse
    .add(depresiasi_listrik)
    .add(sewa_lahan)
    .add(gaji_karyawan);

  return prisma.biaya_Overhead.create({
    data: {
      periode,
      depresiasi_greenhouse,
      depresiasi_listrik,
      sewa_lahan,
      gaji_karyawan,
      subtotal,
    },
  });
}

export async function allocateOverheadForSiklus(
  siklusId: number,
  tx: PrismaDb = prisma,
): Promise<Prisma.Decimal> {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: { kolam: true },
  });
  if (!siklus) return new Prisma.Decimal(0);

  const overhead = await tx.biaya_Overhead.findFirst({ orderBy: { periode: "desc" } });
  if (!overhead) return new Prisma.Decimal(0);

  const agg = await tx.kolam.aggregate({ _sum: { kapasitas_lubang: true } });
  const totalLubang = agg._sum.kapasitas_lubang ?? 0;
  if (totalLubang <= 0) return new Prisma.Decimal(0);

  const share = new Prisma.Decimal(siklus.kolam.kapasitas_lubang).div(totalLubang);
  return overhead.subtotal.mul(share);
}

export function serializeBiayaLangsung(row: NonNullable<Awaited<ReturnType<typeof listBiayaLangsungBySiklus>>>) {
  return {
    siklus_id: row.siklus_id,
    kode_batch: row.siklus.kode_batch,
    biaya_benih: row.biaya_benih.toString(),
    biaya_rockwool: row.biaya_rockwool.toString(),
    biaya_nutrisi: row.biaya_nutrisi.toString(),
    biaya_listrik_pompa: row.biaya_listrik_pompa.toString(),
    subtotal: row.subtotal.toString(),
  };
}

export function serializeOverhead(row: Awaited<ReturnType<typeof listOverhead>>[number]) {
  return {
    id: row.id,
    periode: row.periode.toISOString().slice(0, 10),
    depresiasi_greenhouse: row.depresiasi_greenhouse.toString(),
    depresiasi_listrik: row.depresiasi_listrik.toString(),
    sewa_lahan: row.sewa_lahan.toString(),
    gaji_karyawan: row.gaji_karyawan.toString(),
    subtotal: row.subtotal.toString(),
  };
}
