import { Prisma } from "@prisma/client";
import { KegagalanError } from "@/lib/log-kegagalan";
import { prisma } from "@/lib/prisma";

export const kategoriSusutOptions = [
  { value: "NORMAL", label: "Susut normal (masuk HPP)" },
  { value: "ABNORMAL", label: "Susut abnormal (kerugian operasional)" },
] as const;

export type KategoriSusut = (typeof kategoriSusutOptions)[number]["value"];

export type KlasifikasiInput = {
  logId: number;
  kategoriSusut: KategoriSusut;
};

function parseKategori(raw: unknown): KategoriSusut {
  const value = String(raw ?? "").trim();
  if (!kategoriSusutOptions.some((o) => o.value === value)) {
    throw new KegagalanError("Kategori susut tidak valid.", 400);
  }
  return value as KategoriSusut;
}

export function parseKlasifikasiInput(raw: Record<string, unknown>): KlasifikasiInput {
  const logId = Number(raw.logId);
  if (!Number.isInteger(logId) || logId <= 0) {
    throw new KegagalanError("Log tidak valid.", 400);
  }
  return {
    logId,
    kategoriSusut: parseKategori(raw.kategoriSusut),
  };
}

/** Estimasi biaya kerugian proporsional dari biaya langsung siklus (US2.5). */
type PrismaDb = typeof prisma;

async function estimasiBiayaKerugian(
  siklusId: number,
  jumlahGagal: number,
  tx: PrismaDb,
): Promise<Prisma.Decimal> {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: { biaya_langsung: true },
  });
  if (!siklus || siklus.jumlah_disemai <= 0) return new Prisma.Decimal(0);
  const subtotal = siklus.biaya_langsung?.subtotal ?? new Prisma.Decimal(0);
  if (subtotal.lte(0)) return new Prisma.Decimal(0);
  return subtotal.mul(jumlahGagal).div(siklus.jumlah_disemai);
}

export async function klasifikasiLogSusut(input: KlasifikasiInput) {
  return prisma.$transaction(async (tx) => {
    const log = await tx.log_Kegagalan.findUnique({ where: { id: input.logId } });
    if (!log) throw new KegagalanError("Log kegagalan tidak ditemukan.", 404);

    const biaya = await estimasiBiayaKerugian(log.siklus_id, log.jumlah_gagal, tx as PrismaDb);
    const jenisKerugian = input.kategoriSusut === "NORMAL" ? "ALOKASI_HPP" : "KERUGIAN_OPERASIONAL";

    return tx.log_Kegagalan.update({
      where: { id: input.logId },
      data: {
        kategori_susut: input.kategoriSusut,
        jenis_kerugian: jenisKerugian,
        biaya_kerugian: biaya,
      },
    });
  });
}

export type RingkasanSusut = {
  total_gagal: number;
  menunggu: number;
  normal: number;
  abnormal: number;
  biaya_abnormal: Prisma.Decimal;
};

export async function ringkasanSusutSiklus(siklusId: number, tx: PrismaDb = prisma): Promise<RingkasanSusut> {
  const logs = await tx.log_Kegagalan.findMany({ where: { siklus_id: siklusId } });
  let menunggu = 0;
  let normal = 0;
  let abnormal = 0;
  let biayaAbnormal = new Prisma.Decimal(0);

  for (const row of logs) {
    if (row.kategori_susut === "MENUNGGU") menunggu += row.jumlah_gagal;
    else if (row.kategori_susut === "NORMAL") normal += row.jumlah_gagal;
    else if (row.kategori_susut === "ABNORMAL") {
      abnormal += row.jumlah_gagal;
      biayaAbnormal = biayaAbnormal.add(row.biaya_kerugian);
    }
  }

  return {
    total_gagal: menunggu + normal + abnormal,
    menunggu,
    normal,
    abnormal,
    biaya_abnormal: biayaAbnormal,
  };
}

/** Biaya abnormal tidak masuk pembagi HPP (US2.5 / F13). */
export async function totalBiayaAbnormalSiklus(siklusId: number, tx: PrismaDb = prisma) {
  const summary = await ringkasanSusutSiklus(siklusId, tx);
  return summary.biaya_abnormal;
}
