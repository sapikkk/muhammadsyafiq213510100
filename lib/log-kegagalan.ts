import "server-only";

import { Prisma } from "@prisma/client";
import {
  labelTahap,
  tahapKegagalanOptions,
  type TahapKegagalan,
} from "@/lib/kegagalan-labels";
import { STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { prisma } from "@/lib/prisma";

export {
  labelTahap,
  tahapKegagalanOptions,
  type TahapKegagalan,
};

export class KegagalanError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const MENUNGGU = "MENUNGGU";

export type KegagalanInput = {
  siklusId: number;
  tahap: TahapKegagalan;
  jumlahGagal: number;
  hariHidup: number;
  penyebab: string;
};

function parseTahap(raw: unknown): TahapKegagalan {
  const value = String(raw ?? "").trim();
  if (!tahapKegagalanOptions.some((o) => o.value === value)) {
    throw new KegagalanError("Tahap kegagalan tidak valid.", 400);
  }
  return value as TahapKegagalan;
}

function parsePositiveInt(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new KegagalanError(`${label} harus bilangan bulat lebih dari nol.`, 400);
  }
  return value;
}

function parseHariHidup(raw: unknown): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new KegagalanError("Hari hidup harus bilangan bulat nol atau lebih.", 400);
  }
  return value;
}

function parsePenyebab(raw: unknown): string {
  const text = String(raw ?? "").trim();
  if (text.length < 3) {
    throw new KegagalanError("Penyebab minimal 3 karakter.", 400);
  }
  if (text.length > 2000) {
    throw new KegagalanError("Penyebab maksimal 2000 karakter.", 400);
  }
  return text;
}

export function parseKegagalanInput(raw: Record<string, unknown>): KegagalanInput {
  const siklusId = Number(raw.siklusId);
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    throw new KegagalanError("Siklus tidak valid.", 400);
  }
  return {
    siklusId,
    tahap: parseTahap(raw.tahap),
    jumlahGagal: parsePositiveInt(raw.jumlahGagal, "Jumlah gagal"),
    hariHidup: parseHariHidup(raw.hariHidup),
    penyebab: parsePenyebab(raw.penyebab),
  };
}

export async function listLogKegagalan(siklusId: number) {
  return prisma.log_Kegagalan.findMany({
    where: { siklus_id: siklusId },
    orderBy: { id: "desc" },
  });
}

export async function listLogKegagalanMenunggu() {
  return prisma.log_Kegagalan.findMany({
    where: { kategori_susut: MENUNGGU },
    include: {
      siklus: {
        select: {
          kode_batch: true,
          jumlah_disemai: true,
          varietas: { select: { nama: true } },
        },
      },
    },
    orderBy: { id: "desc" },
  });
}

export function serializeLogKegagalan(row: Awaited<ReturnType<typeof listLogKegagalan>>[number]) {
  return {
    id: row.id,
    siklus_id: row.siklus_id,
    tahap: row.tahap,
    tahap_label: labelTahap(row.tahap),
    jumlah_gagal: row.jumlah_gagal,
    hari_hidup: row.hari_hidup,
    penyebab: row.penyebab,
    kategori_susut: row.kategori_susut,
    jenis_kerugian: row.jenis_kerugian,
    biaya_kerugian: row.biaya_kerugian.toString(),
  };
}

export async function catatLogKegagalan(input: KegagalanInput) {
  return prisma.$transaction(async (tx) => {
    const siklus = await tx.siklus_Produksi.findUnique({
      where: { id: input.siklusId },
      include: { laporanPanen: true },
    });
    if (!siklus) throw new KegagalanError("Siklus tidak ditemukan.", 404);
    if (siklus.status === "SELESAI") {
      throw new KegagalanError("Siklus sudah selesai, tidak bisa catat kegagalan baru.", 400);
    }
    if (siklus.status === STATUS_GAGAL_TOTAL) {
      throw new KegagalanError("Siklus sudah di-abort gagal total.", 400);
    }
    if (siklus.laporanPanen?.status === "APPROVED") {
      throw new KegagalanError("Panen sudah disetujui.", 400);
    }

    const susutBaru = siklus.total_susut + input.jumlahGagal;
    if (susutBaru > siklus.jumlah_disemai) {
      throw new KegagalanError("Total susut melebihi jumlah disemai.", 400);
    }

    const log = await tx.log_Kegagalan.create({
      data: {
        siklus_id: input.siklusId,
        tahap: input.tahap,
        jumlah_gagal: input.jumlahGagal,
        hari_hidup: input.hariHidup,
        penyebab: input.penyebab,
        kategori_susut: MENUNGGU,
        jenis_kerugian: MENUNGGU,
        biaya_kerugian: new Prisma.Decimal(0),
      },
    });

    await tx.siklus_Produksi.update({
      where: { id: input.siklusId },
      data: {
        total_susut: susutBaru,
        jumlah_layak_jual: Math.max(0, siklus.jumlah_disemai - susutBaru),
      },
    });

    return log;
  });
}
