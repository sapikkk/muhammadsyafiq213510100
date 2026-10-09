import { Prisma, type Pelanggan } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PelangganError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type PelangganInput = {
  nama: string;
  alamat: string;
  noTelepon: string;
  email: string;
};

function parseNama(raw: unknown): string {
  const nama = String(raw ?? "").trim();
  if (nama.length < 2 || nama.length > 100) {
    throw new PelangganError("Nama pelanggan 2–100 karakter.", 400);
  }
  return nama;
}

function parseAlamat(raw: unknown): string {
  const alamat = String(raw ?? "").trim();
  if (alamat.length < 5) throw new PelangganError("Alamat minimal 5 karakter.", 400);
  return alamat;
}

function parseTelepon(raw: unknown): string {
  const tel = String(raw ?? "").trim();
  if (tel.length < 8 || tel.length > 25) {
    throw new PelangganError("No. telepon 8–25 karakter.", 400);
  }
  return tel;
}

function parseEmail(raw: unknown): string {
  const email = String(raw ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new PelangganError("Email tidak valid.", 400);
  }
  if (email.length > 254) throw new PelangganError("Email terlalu panjang.", 400);
  return email;
}

export function parsePelangganInput(raw: Record<string, unknown>): PelangganInput {
  return {
    nama: parseNama(raw.nama),
    alamat: parseAlamat(raw.alamat),
    noTelepon: parseTelepon(raw.noTelepon),
    email: parseEmail(raw.email),
  };
}

export async function listPelanggan(): Promise<Pelanggan[]> {
  return prisma.pelanggan.findMany({ orderBy: { nama: "asc" } });
}

export async function createPelanggan(input: PelangganInput): Promise<Pelanggan> {
  return prisma.pelanggan.create({
    data: {
      nama: input.nama,
      alamat: input.alamat,
      no_telepon: input.noTelepon,
      email: input.email,
    },
  });
}

export async function updatePelanggan(id: number, input: PelangganInput): Promise<Pelanggan> {
  try {
    return await prisma.pelanggan.update({
      where: { id },
      data: {
        nama: input.nama,
        alamat: input.alamat,
        no_telepon: input.noTelepon,
        email: input.email,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new PelangganError("Pelanggan tidak ditemukan.", 404);
    }
    throw error;
  }
}

export function serializePelanggan(row: Pelanggan) {
  return {
    id: row.id,
    nama: row.nama,
    alamat: row.alamat,
    no_telepon: row.no_telepon,
    email: row.email,
  };
}
