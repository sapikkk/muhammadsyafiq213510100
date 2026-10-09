import { Prisma, type Petani } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PetaniError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseMoney(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new PetaniError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new PetaniError(`${label} harus angka nol atau lebih, maksimal 2 desimal.`, 400);
  }
  return new Prisma.Decimal(text);
}

function parseNama(raw: unknown): string {
  const nama = String(raw ?? "").trim();
  if (nama.length < 2 || nama.length > 100) {
    throw new PetaniError("Nama petani 2–100 karakter.", 400);
  }
  return nama;
}

export type PetaniInput = { nama: string; gajiBulanan: Prisma.Decimal };

export function parsePetaniInput(raw: Record<string, unknown>): PetaniInput {
  return {
    nama: parseNama(raw.nama),
    gajiBulanan: parseMoney(raw.gajiBulanan, "Gaji bulanan"),
  };
}

export async function listPetani(): Promise<Petani[]> {
  return prisma.petani.findMany({ orderBy: { nama: "asc" } });
}

export async function createPetani(input: PetaniInput): Promise<Petani> {
  return prisma.petani.create({
    data: {
      nama: input.nama,
      gaji_bulanan: input.gajiBulanan,
    },
  });
}

export async function updatePetani(id: number, input: PetaniInput): Promise<Petani> {
  try {
    return await prisma.petani.update({
      where: { id },
      data: {
        nama: input.nama,
        gaji_bulanan: input.gajiBulanan,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new PetaniError("Petani tidak ditemukan.", 404);
    }
    throw error;
  }
}

export function serializePetani(row: Petani) {
  return {
    id: row.id,
    nama: row.nama,
    gaji_bulanan: row.gaji_bulanan.toString(),
  };
}
