import "server-only";

import { Prisma } from "@prisma/client";
import type { SerializedInfrastrukturPohon } from "@/lib/infrastruktur-types";
import { isKolamStatus, type KolamStatus } from "@/lib/infrastruktur-kolam-status";
import { prisma } from "@/lib/prisma";

export type { SerializedInfrastrukturPohon } from "@/lib/infrastruktur-types";

export class InfrastrukturError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseMoney(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new InfrastrukturError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new InfrastrukturError(`${label} harus angka nol atau lebih, maksimal 2 desimal.`, 400);
  }
  return new Prisma.Decimal(text);
}

function parsePositiveInt(raw: unknown, label: string): number {
  if (raw === null || raw === undefined || raw === "") {
    throw new InfrastrukturError(`Isi ${label}.`, 400);
  }
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new InfrastrukturError(`${label} harus bilangan bulat lebih dari nol.`, 400);
  }
  return value;
}

function parseForeignId(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new InfrastrukturError(`${label} tidak valid.`, 400);
  }
  return value;
}

function amortisasiBulanan(nilai: Prisma.Decimal, masa: number): Prisma.Decimal {
  return nilai.div(masa).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}

function translatePrisma(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      throw new InfrastrukturError("Referensi lahan atau greenhouse tidak ditemukan.", 404);
    }
    if (error.code === "P2025") {
      throw new InfrastrukturError("Data tidak ditemukan.", 404);
    }
  }
  throw error;
}

export type LahanInput = {
  nilaiSewa: Prisma.Decimal;
  masaSewa: number;
};

export type GreenhouseInput = {
  lahanId: number;
  nama: string;
  nilaiInvestasi: Prisma.Decimal;
  umurEkonomis: number;
};

export type KolamInput = {
  greenhouseId: number;
  nama: string;
  kapasitasLubang: number;
  status: KolamStatus;
};

export function parseLahanInput(raw: Record<string, unknown>): LahanInput {
  return {
    nilaiSewa: parseMoney(raw.nilaiSewa ?? raw.nilai_sewa, "Nilai sewa lahan"),
    masaSewa: parsePositiveInt(raw.masaSewa ?? raw.masa_sewa, "Masa sewa (bulan)"),
  };
}

export function parseGreenhouseInput(raw: Record<string, unknown>): GreenhouseInput {
  const nama = String(raw.nama ?? "").trim();
  if (!nama || nama.length > 100) {
    throw new InfrastrukturError("Nama greenhouse wajib, maksimal 100 karakter.", 400);
  }
  return {
    lahanId: parseForeignId(raw.lahanId ?? raw.lahan_id, "Lahan"),
    nama,
    nilaiInvestasi: parseMoney(
      raw.nilaiInvestasi ?? raw.nilai_investasi,
      "Nilai investasi greenhouse",
    ),
    umurEkonomis: parsePositiveInt(
      raw.umurEkonomis ?? raw.umur_ekonomis,
      "Umur ekonomis (bulan)",
    ),
  };
}

export function parseKolamInput(raw: Record<string, unknown>): KolamInput {
  const nama = String(raw.nama ?? "").trim();
  if (!nama || nama.length > 100) {
    throw new InfrastrukturError("Nama kolam wajib, maksimal 100 karakter.", 400);
  }
  const statusRaw = String(raw.status ?? "MENGANGGUR").trim().toUpperCase();
  if (!isKolamStatus(statusRaw)) {
    throw new InfrastrukturError("Status kolam harus MENGANGGUR atau TERPAKAI.", 400);
  }
  return {
    greenhouseId: parseForeignId(raw.greenhouseId ?? raw.greenhouse_id, "Greenhouse"),
    nama,
    kapasitasLubang: parsePositiveInt(
      raw.kapasitasLubang ?? raw.kapasitas_lubang,
      "Kapasitas lubang",
    ),
    status: statusRaw,
  };
}

export async function listInfrastrukturPohon() {
  return prisma.lahan.findMany({
    orderBy: { id: "asc" },
    include: {
      greenhouse: {
        orderBy: { nama: "asc" },
        include: { kolam: { orderBy: { nama: "asc" } } },
      },
    },
  });
}

export async function createLahan(input: LahanInput) {
  try {
    return await prisma.lahan.create({
      data: {
        nilai_sewa: input.nilaiSewa,
        masa_sewa: input.masaSewa,
        amortisasi_per_bulan: amortisasiBulanan(input.nilaiSewa, input.masaSewa),
      },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

export async function createGreenhouse(input: GreenhouseInput) {
  const lahan = await prisma.lahan.findUnique({ where: { id: input.lahanId } });
  if (!lahan) throw new InfrastrukturError("Lahan tidak ditemukan.", 404);
  try {
    return await prisma.greenhouse.create({
      data: {
        lahan_id: input.lahanId,
        nama: input.nama,
        nilai_investasi: input.nilaiInvestasi,
        umur_ekonomis: input.umurEkonomis,
        depresiasi_per_bulan: amortisasiBulanan(input.nilaiInvestasi, input.umurEkonomis),
      },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

export async function createKolam(input: KolamInput) {
  const gh = await prisma.greenhouse.findUnique({ where: { id: input.greenhouseId } });
  if (!gh) throw new InfrastrukturError("Greenhouse tidak ditemukan.", 404);
  try {
    return await prisma.kolam.create({
      data: {
        greenhouse_id: input.greenhouseId,
        nama: input.nama,
        kapasitas_lubang: input.kapasitasLubang,
        status: input.status,
      },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

export async function updateKolamStatus(id: number, status: KolamStatus) {
  try {
    return await prisma.kolam.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

function dec(value: Prisma.Decimal) {
  return value.toString();
}

export function serializeInfrastruktur(
  pohon: Awaited<ReturnType<typeof listInfrastrukturPohon>>,
): SerializedInfrastrukturPohon {
  let totalKapasitasLubang = 0;
  const lahan = pohon.map((row) => {
    const greenhouse = row.greenhouse.map((gh) => {
      const kolam = gh.kolam.map((k) => {
        totalKapasitasLubang += k.kapasitas_lubang;
        return {
          id: k.id,
          greenhouseId: k.greenhouse_id,
          nama: k.nama,
          kapasitasLubang: k.kapasitas_lubang,
          status: k.status,
        };
      });
      return {
        id: gh.id,
        lahanId: gh.lahan_id,
        nama: gh.nama,
        nilaiInvestasi: dec(gh.nilai_investasi),
        umurEkonomis: gh.umur_ekonomis,
        depresiasiPerBulan: dec(gh.depresiasi_per_bulan),
        kolam,
      };
    });
    return {
      id: row.id,
      nilaiSewa: dec(row.nilai_sewa),
      masaSewa: row.masa_sewa,
      amortisasiPerBulan: dec(row.amortisasi_per_bulan),
      greenhouse,
    };
  });
  return { totalKapasitasLubang, lahan };
}
