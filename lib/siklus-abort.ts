import "server-only";

import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import { allocateOverheadForSiklus } from "@/lib/biaya";
import { prisma, type PrismaTransaction } from "@/lib/prisma";
import { emitHarvestRejected, emitSiklusAbort } from "@/lib/notifikasi-emit";
import { ringkasanSiklusUntukTeks, siklusLabelSelect } from "@/lib/produksi-ui-labels";
import {
  STATUS_GAGAL_TOTAL,
  siklusBolehAbort,
} from "@/lib/siklus-abort-status";

export { STATUS_GAGAL_TOTAL, siklusBolehAbort };

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
    throw new SiklusAbortError("Alasan minimal 5 karakter.", 400);
  }
  if (text.length > 500) {
    throw new SiklusAbortError("Alasan maksimal 500 karakter.", 400);
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
  ringkasanSiklus: string,
  nominal: Prisma.Decimal,
  alasan: string,
) {
  if (nominal.lte(0)) return null;

  const akunKerugian = await tx.akun.findUnique({ where: { kode: KERUGIAN_ABORT_KODE } });
  const akunWip = await resolveAkunWip(tx);
  if (!akunKerugian || !akunWip) {
    throw new SiklusAbortError("Akun 5300 atau WIP (1360/1350) tidak ditemukan.", 500);
  }

  const keterangan = `Batalkan gagal total — ${ringkasanSiklus}: ${alasan.slice(0, 180)}`;
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
        include: {
          biaya_langsung: true,
          laporanPanen: true,
          varietas: siklusLabelSelect.varietas,
          kolam: siklusLabelSelect.kolam,
        },
      });
      if (!siklus) throw new SiklusAbortError("Siklus tidak ditemukan.", 404);
      if (siklus.status === STATUS_GAGAL_TOTAL) {
        throw new SiklusAbortError("Siklus sudah dibatalkan.", 400);
      }
      if (siklus.status === "SELESAI") {
        throw new SiklusAbortError("Siklus sudah selesai (panen).", 400);
      }
      if (siklus.laporanPanen?.status === "APPROVED") {
        throw new SiklusAbortError("Panen sudah disetujui, tidak bisa dibatalkan.", 400);
      }

      const wip = await hitungWipSiklus(siklusId, tx as PrismaDb);

      let laporanPetaniId: number | null = null;
      let laporanId: number | null = null;
      if (siklus.laporanPanen?.status === "PENDING") {
        laporanPetaniId = siklus.laporanPanen.userId;
        laporanId = siklus.laporanPanen.id;
        await tx.laporan_Panen.update({
          where: { id: siklus.laporanPanen.id },
          data: { status: "REJECTED", catatan: `Dibatalkan abort: ${alasan.slice(0, 400)}` },
        });
      }

      const lokasiTanam = ringkasanSiklusUntukTeks(siklus);
      await postingJurnalAbort(tx, userId, lokasiTanam, wip, alasan);

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

      return {
        siklus: updated,
        wip: wip.toString(),
        lokasiTanam,
        laporanPetaniId,
        laporanId,
        alasan,
      };
    },
    { maxWait: 20_000, timeout: 60_000 },
  ).then(
    async ({ siklus, wip, lokasiTanam, laporanPetaniId, laporanId, alasan: alasanTeks }) => {
      if (laporanPetaniId != null && laporanId != null) {
        void emitHarvestRejected(
          laporanPetaniId,
          lokasiTanam,
          laporanId,
          `Siklus dibatalkan: ${alasanTeks}`,
          siklus.id,
        );
      } else {
        const logs = await prisma.log_Produksi.findMany({
          where: { siklus_id: siklus.id },
          orderBy: { id: "desc" },
          take: 1,
          select: { userId: true },
        });
        const petaniId = logs[0]?.userId;
        if (petaniId) {
          void emitSiklusAbort(petaniId, lokasiTanam, siklus.id, alasanTeks);
        }
      }
      return { siklus, wip };
    },
  );
}

