import "server-only";

import { Prisma, type Varietas } from "@prisma/client";
import { isVarietasStatus, type VarietasStatus } from "@/lib/varietas-status";
import type { SerializedVarietas } from "@/lib/varietas-types";
import { prisma } from "@/lib/prisma";

export type { SerializedVarietas } from "@/lib/varietas-types";

export class VarietasError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseMoney(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new VarietasError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new VarietasError(`${label} harus angka nol atau lebih, maksimal 2 desimal.`, 400);
  }
  return new Prisma.Decimal(text);
}

function parseWeight(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new VarietasError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new VarietasError(`${label} harus angka positif, maksimal 3 desimal.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lte(0)) {
    throw new VarietasError(`${label} harus lebih dari nol.`, 400);
  }
  return value;
}

function parsePercent(raw: unknown, label: string): Prisma.Decimal {
  const value = parseMoney(raw, label);
  if (value.lt(0) || value.gt(100)) {
    throw new VarietasError(`${label} harus antara 0 dan 100.`, 400);
  }
  return value;
}

function parsePositiveInt(raw: unknown, label: string): number {
  if (raw === null || raw === undefined || raw === "") {
    throw new VarietasError(`Isi ${label}.`, 400);
  }
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new VarietasError(`${label} harus bilangan bulat lebih dari nol.`, 400);
  }
  return value;
}

function translatePrisma(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    throw new VarietasError("Varietas tidak ditemukan.", 404);
  }
  throw error;
}

export type VarietasInput = {
  nama: string;
  hargaBenihPerGram: Prisma.Decimal;
  bijiPerGram: Prisma.Decimal;
  dayaKecambah: Prisma.Decimal;
  lamaSemai: number;
  lamaDiKolam: number;
  beratRataRataPanen: Prisma.Decimal;
  beratPerPack: Prisma.Decimal;
  hargaJualCurah: Prisma.Decimal;
  hargaJualPack: Prisma.Decimal;
  status: VarietasStatus;
};

export function parseVarietasInput(raw: Record<string, unknown>): VarietasInput {
  const nama = String(raw.nama ?? "").trim();
  if (!nama || nama.length > 100) {
    throw new VarietasError("Nama varietas wajib, maksimal 100 karakter.", 400);
  }
  const statusRaw = String(raw.status ?? "AKTIF").trim().toUpperCase();
  if (!isVarietasStatus(statusRaw)) {
    throw new VarietasError("Status harus AKTIF atau NONAKTIF.", 400);
  }
  return {
    nama,
    hargaBenihPerGram: parseMoney(
      raw.hargaBenihPerGram ?? raw.harga_benih_per_gram,
      "Harga benih per gram",
    ),
    bijiPerGram: parseWeight(raw.bijiPerGram ?? raw.biji_per_gram, "Biji per gram"),
    dayaKecambah: parsePercent(raw.dayaKecambah ?? raw.daya_kecambah, "Daya kecambah (%)"),
    lamaSemai: parsePositiveInt(raw.lamaSemai ?? raw.lama_semai, "Lama semai (hari)"),
    lamaDiKolam: parsePositiveInt(raw.lamaDiKolam ?? raw.lama_di_kolam, "Lama di kolam (hari)"),
    beratRataRataPanen: parseWeight(
      raw.beratRataRataPanen ?? raw.berat_rata_rata_panen,
      "Berat rata-rata panen (gram)",
    ),
    beratPerPack: parseWeight(raw.beratPerPack ?? raw.berat_per_pack, "Berat per pack (gram)"),
    hargaJualCurah: parseMoney(raw.hargaJualCurah ?? raw.harga_jual_curah, "Harga jual curah"),
    hargaJualPack: parseMoney(raw.hargaJualPack ?? raw.harga_jual_pack, "Harga jual pack"),
    status: statusRaw,
  };
}

export async function listVarietas(onlyAktif = false) {
  return prisma.varietas.findMany({
    where: onlyAktif ? { status: "AKTIF" } : undefined,
    orderBy: { nama: "asc" },
    include: { _count: { select: { siklus: true } } },
  });
}

export async function createVarietas(input: VarietasInput): Promise<Varietas> {
  return prisma.varietas.create({
    data: {
      nama: input.nama,
      harga_benih_per_gram: input.hargaBenihPerGram,
      biji_per_gram: input.bijiPerGram,
      daya_kecambah: input.dayaKecambah,
      lama_semai: input.lamaSemai,
      lama_di_kolam: input.lamaDiKolam,
      berat_rata_rata_panen: input.beratRataRataPanen,
      berat_per_pack: input.beratPerPack,
      harga_jual_curah: input.hargaJualCurah,
      harga_jual_pack: input.hargaJualPack,
      status: input.status,
    },
  });
}

export async function setVarietasStatus(id: number, status: VarietasStatus) {
  try {
    return await prisma.varietas.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

export function serializeVarietas(
  row: Varietas & { _count?: { siklus: number } },
): SerializedVarietas {
  return {
    id: row.id,
    nama: row.nama,
    hargaBenihPerGram: row.harga_benih_per_gram.toString(),
    bijiPerGram: row.biji_per_gram.toString(),
    dayaKecambah: row.daya_kecambah.toString(),
    lamaSemai: row.lama_semai,
    lamaDiKolam: row.lama_di_kolam,
    beratRataRataPanen: row.berat_rata_rata_panen.toString(),
    beratPerPack: row.berat_per_pack.toString(),
    hargaJualCurah: row.harga_jual_curah.toString(),
    hargaJualPack: row.harga_jual_pack.toString(),
    status: row.status as VarietasStatus,
    jumlahSiklus: row._count?.siklus ?? 0,
  };
}
