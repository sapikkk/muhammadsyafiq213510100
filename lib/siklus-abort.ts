import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import { allocateOverheadForSiklus } from "@/lib/biaya";
import { prisma, type PrismaTransaction } from "@/lib/prisma";

/** Siklus dihentikan total — tidak lanjut fase / panen (v2-B.1). */
export const STATUS_GAGAL_TOTAL = "GAGAL_TOTAL";

/** WIP terpisah (1360); fallback 1350 jika DB belum di-patch. */
export const WIP_AKUN_KODE = AKUN_KODE.WIP;
export const WIP_AKUN_FALLBACK = AKUN_KODE.PERSEDIAAN_SAYUR;
export const KERUGIAN_ABORT_KODE = "5300";

export class SiklusAbortError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type PrismaDb = typeof prisma;

export function wipNominalFromBiaya(
  subtotal: Prisma.Decimal | null | undefined,
  overhead: Prisma.Decimal,
): Prisma.Decimal {
  const base = subtotal ?? new Prisma.Decimal(0);
  const total = base.add(overhead);
  return total.lte(0) ? new Prisma.Decimal(0) : total;
}

export async function hitungWipSiklus(siklusId: number, tx: PrismaDb = prisma) {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: { biaya_langsung: true },
  });
  if (!siklus) throw new SiklusAbortError("Siklus tidak ditemukan.", 404);
  const overhead = await allocateOverheadForSiklus(siklusId, tx);
  return wipNominalFromBiaya(siklus.biaya_langsung?.subtotal, overhead);
}

function parseAlasan(raw: unknown): string {
  const text = String(raw ?? "").trim();
  if (text.length < 5) {
    throw new SiklusAbortError("Alasan abort minimal 5 karakter.", 400);
  }
  if (text.length > 500) {
    throw new SiklusAbortError("Alasan abort maksimal 500 karakter.", 400);
  }
  return text;
}

export async function resolveAkunWip(tx: PrismaTransaction) {
  let akun = await tx.akun.findUnique({ where: { kode: WIP_AKUN_KODE } });
  if (!akun?.aktif) {
    akun = await tx.akun.findUnique({ where: { kode: WIP_AKUN_FALLBACK } });
  }
  return akun;
}

async function postingJurnalAbort(
  tx: PrismaTransaction,
  userId: number,
  kodeBatch: string,
  nominal: Prisma.Decimal,
  alasan: string,
) {
  if (nominal.lte(0)) return null;

  const akunKerugian = await tx.akun.findUnique({ where: { kode: KERUGIAN_ABORT_KODE } });
  const akunWip = await resolveAkunWip(tx);
  if (!akunKerugian || !akunWip) {
    throw new SiklusAbortError("Akun 5300 atau WIP (1360/1350) tidak ditemukan.", 500);
  }

  const keterangan = `Abort gagal total ${kodeBatch}: ${alasan.slice(0, 180)}`;
  const jurnal = await tx.jurnal.create({
    data: {
      tanggal: new Date(),
      keterangan,
      status: "APPROVED",
      dibuatOlehId: userId,
      diputusOlehId: userId,
      diputusPada: new Date(),
      baris: {
        create: [
          { akunId: akunKerugian.id, debit: nominal, kredit: 0 },
          { akunId: akunWip.id, debit: 0, kredit: nominal },
        ],
      },
    },
  });

  await tx.akun.update({
    where: { id: akunKerugian.id },
    data: { saldo: { increment: nominal } },
  });
  await tx.akun.update({
    where: { id: akunWip.id },
    data: { saldo: { decrement: nominal } },
  });

  return jurnal.id;
}

export async function abortSiklusGagalTotal(
  siklusId: number,
  userId: number,
  raw: Record<string, unknown>,
) {
  const alasan = parseAlasan(raw.alasan);

  return prisma.$transaction(
    async (tx) => {
      const siklus = await tx.siklus_Produksi.findUnique({
        where: { id: siklusId },
        include: { biaya_langsung: true, laporanPanen: true },
      });
      if (!siklus) throw new SiklusAbortError("Siklus tidak ditemukan.", 404);
      if (siklus.status === STATUS_GAGAL_TOTAL) {
        throw new SiklusAbortError("Siklus sudah di-abort.", 400);
      }
      if (siklus.status === "SELESAI") {
        throw new SiklusAbortError("Siklus sudah selesai (panen).", 400);
      }
      if (siklus.laporanPanen?.status === "APPROVED") {
        throw new SiklusAbortError("Panen sudah disetujui, tidak bisa abort.", 400);
      }

      const wip = await hitungWipSiklus(siklusId, tx as PrismaDb);

      if (siklus.laporanPanen?.status === "PENDING") {
        await tx.laporan_Panen.update({
          where: { id: siklus.laporanPanen.id },
          data: { status: "REJECTED", catatan: `Dibatalkan abort: ${alasan.slice(0, 400)}` },
        });
      }

      await postingJurnalAbort(tx, userId, siklus.kode_batch, wip, alasan);

      const updated = await tx.siklus_Produksi.update({
        where: { id: siklusId },
        data: {
          status: STATUS_GAGAL_TOTAL,
          jumlah_layak_jual: 0,
        },
      });

      await tx.log_Produksi.create({
        data: {
          siklus_id: siklusId,
          fase_dari: siklus.status,
          fase_ke: STATUS_GAGAL_TOTAL,
          catatan: alasan.slice(0, 255),
          userId,
        },
      });

      return { siklus: updated, wip: wip.toString() };
    },
    { maxWait: 20_000, timeout: 60_000 },
  );
}

export function siklusBolehAbort(status: string, laporanStatus?: string | null) {
  if (status === STATUS_GAGAL_TOTAL || status === "SELESAI") return false;
  if (laporanStatus === "APPROVED") return false;
  return true;
}
