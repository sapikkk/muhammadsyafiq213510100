import "server-only";

import { Prisma } from "@prisma/client";
import { keTanggalIso } from "@/lib/format";
import { applyHppOverride, parseHppOverride } from "@/lib/hpp-override";
import { calculateHPP, yieldContextFromSiklus } from "@/lib/hpp";
import { prisma } from "@/lib/prisma";
import { AKUN_KODE } from "@/lib/akun-kode";
import { resolveAkunWip, STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort";
import { totalBiayaAbnormalSiklus } from "@/lib/susut";

export class HarvestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type HarvestInput = {
  siklusId: number;
  beratLayakGram: Prisma.Decimal;
  beratTidakLayakGram: Prisma.Decimal;
  jumlahLayak: number;
  jumlahTidakLayak: number;
  catatan: string | null;
};

function parsePositiveInt(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new HarvestError(`${label} harus bilangan bulat nol atau lebih.`, 400);
  }
  return value;
}

function parseGram(raw: unknown, label: string): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new HarvestError(`${label} harus angka gram valid.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lt(0)) {
    throw new HarvestError(`${label} tidak boleh negatif.`, 400);
  }
  return value;
}

function parseCatatan(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const text = String(raw).trim();
  if (text.length > 500) {
    throw new HarvestError("Catatan maksimal 500 karakter.", 400);
  }
  return text;
}

function parseSiklusId(raw: unknown): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new HarvestError("Siklus tidak valid.", 400);
  }
  return value;
}

export function parseHarvestInput(raw: Record<string, unknown>): HarvestInput {
  const siklusId = parseSiklusId(raw.siklusId);
  const jumlahLayak = parsePositiveInt(raw.jumlahLayak, "Jumlah layak jual");
  const jumlahTidakLayak = parsePositiveInt(raw.jumlahTidakLayak, "Jumlah tidak layak");
  if (jumlahLayak + jumlahTidakLayak <= 0) {
    throw new HarvestError("Isi minimal satu jumlah layak atau tidak layak.", 400);
  }
  return {
    siklusId,
    beratLayakGram: parseGram(raw.beratLayakGram, "Berat layak (gram)"),
    beratTidakLayakGram: parseGram(raw.beratTidakLayakGram, "Berat tidak layak (gram)"),
    jumlahLayak,
    jumlahTidakLayak,
    catatan: parseCatatan(raw.catatan),
  };
}

export async function kirimLaporanPanen(userId: number, input: HarvestInput) {
  return prisma.$transaction(
    async (tx) => {
      const siklus = await tx.siklus_Produksi.findUnique({
        where: { id: input.siklusId },
        include: { laporanPanen: true },
      });
      if (!siklus) throw new HarvestError("Siklus tidak ditemukan.", 404);
      if (siklus.status === STATUS_GAGAL_TOTAL) {
        throw new HarvestError("Siklus sudah di-abort gagal total.", 400);
      }
      if (siklus.status !== "PANEN") {
        throw new HarvestError("Laporan panen hanya saat fase Panen & sortasi.", 400);
      }
      if (siklus.laporanPanen) {
        throw new HarvestError("Batch ini sudah punya laporan panen.", 409);
      }
      const totalSortasi = input.jumlahLayak + input.jumlahTidakLayak;
      if (totalSortasi > siklus.jumlah_disemai) {
        throw new HarvestError("Total sortasi melebihi jumlah disemai.", 400);
      }

      const susutBaru = siklus.total_susut + input.jumlahTidakLayak;
      const layakJual = input.jumlahLayak;

      const laporan = await tx.laporan_Panen.create({
        data: {
          siklus_id: input.siklusId,
          berat_layak_gram: input.beratLayakGram,
          berat_tidak_layak_gram: input.beratTidakLayakGram,
          jumlah_layak: input.jumlahLayak,
          jumlah_tidak_layak: input.jumlahTidakLayak,
          status: "PENDING",
          catatan: input.catatan,
          userId,
        },
      });

      await tx.siklus_Produksi.update({
        where: { id: input.siklusId },
        data: {
          jumlah_layak_jual: layakJual,
          total_susut: susutBaru,
        },
      });

      return laporan;
    },
    { maxWait: 20_000, timeout: 60_000 },
  );
}

export async function listLaporanPanen(status?: string) {
  return prisma.laporan_Panen.findMany({
    where: status ? { status } : undefined,
    orderBy: { waktu_kirim: "desc" },
    include: {
      siklus: {
        select: {
          kode_batch: true,
          jumlah_disemai: true,
          varietas: { select: { nama: true } },
        },
      },
      user: { select: { nama: true } },
    },
  });
}

export function serializeLaporanPanen(
  row: Awaited<ReturnType<typeof listLaporanPanen>>[number],
) {
  return {
    id: row.id,
    siklus_id: row.siklus_id,
    kode_batch: row.siklus.kode_batch,
    varietas_nama: row.siklus.varietas.nama,
    jumlah_disemai: row.siklus.jumlah_disemai,
    berat_layak_gram: row.berat_layak_gram.toString(),
    berat_tidak_layak_gram: row.berat_tidak_layak_gram.toString(),
    jumlah_layak: row.jumlah_layak,
    jumlah_tidak_layak: row.jumlah_tidak_layak,
    status: row.status,
    catatan: row.catatan,
    petani_nama: row.user.nama,
    waktu_kirim: row.waktu_kirim.toISOString(),
  };
}

export function serializeLaporanRingkas(
  row: NonNullable<Awaited<ReturnType<typeof getLaporanBySiklus>>>,
) {
  return {
    id: row.id,
    status: row.status,
    jumlah_layak: row.jumlah_layak,
    jumlah_tidak_layak: row.jumlah_tidak_layak,
    berat_layak_gram: row.berat_layak_gram.toString(),
    berat_tidak_layak_gram: row.berat_tidak_layak_gram.toString(),
    waktu_kirim: keTanggalIso(row.waktu_kirim),
  };
}
export async function getLaporanBySiklus(siklusId: number) {
  return prisma.laporan_Panen.findUnique({ where: { siklus_id: siklusId } });
}

export async function approveLaporanPanen(
  id: number,
  userId: number,
  rawBody: Record<string, unknown> = {},
) {
  const overrideInput = parseHppOverride(rawBody);

  return prisma.$transaction(
    async (tx) => {
      const laporan = await tx.laporan_Panen.findUnique({
        where: { id },
        include: {
          siklus: {
            include: { varietas: { select: { berat_per_pack: true } } },
          },
        },
      });

      if (!laporan) throw new HarvestError("Laporan tidak ditemukan.", 404);
      if (laporan.siklus.status === STATUS_GAGAL_TOTAL) {
        throw new HarvestError("Siklus sudah di-abort gagal total.", 400);
      }
      if (laporan.status !== "PENDING") {
        throw new HarvestError("Laporan tidak dalam status PENDING.", 400);
      }

      // Update status laporan
      const updatedLaporan = await tx.laporan_Panen.update({
        where: { id },
        data: { status: "APPROVED" },
      });

      // Update status siklus
      await tx.siklus_Produksi.update({
        where: { id: laporan.siklus_id },
        data: { status: "SELESAI", tanggal_panen: new Date() },
      });

      let hppCalc = await calculateHPP(laporan.siklus_id, tx as typeof prisma);
      if (overrideInput) {
        const yieldCtx = yieldContextFromSiklus(
          laporan,
          laporan.siklus.varietas.berat_per_pack,
        );
        hppCalc = applyHppOverride(hppCalc, yieldCtx, overrideInput);
      }

      const hppData = {
        biaya_langsung_total: hppCalc.biaya_langsung_total,
        overhead_teralokasi: hppCalc.overhead_teralokasi,
        biaya_plastik_packing: hppCalc.biaya_plastik_packing,
        total_biaya: hppCalc.total_biaya,
        hpp_per_lubang: hppCalc.hpp_per_lubang,
        hpp_per_kg: hppCalc.hpp_per_kg,
        hpp_per_pack: hppCalc.hpp_per_pack,
        is_override: Boolean(overrideInput),
        override_justifikasi: overrideInput?.justifikasi ?? null,
      };

      await tx.hPP.upsert({
        where: { siklus_id: laporan.siklus_id },
        create: { siklus_id: laporan.siklus_id, ...hppData },
        update: hppData,
      });

      const biayaAbnormal = await totalBiayaAbnormalSiklus(laporan.siklus_id, tx as typeof prisma);
      const nilaiPersediaan = hppCalc.total_biaya;
      const kreditWip = nilaiPersediaan.add(biayaAbnormal);

      if (kreditWip.gt(0)) {
        const akunPersediaan = await tx.akun.findUnique({
          where: { kode: AKUN_KODE.PERSEDIAAN_SAYUR },
        });
        const akunWip = await resolveAkunWip(tx);
        const akunKerugian = biayaAbnormal.gt(0)
          ? await tx.akun.findUnique({ where: { kode: AKUN_KODE.KERUGIAN_SUSUT } })
          : null;

        if (!akunPersediaan || !akunWip) {
          throw new HarvestError("Akun 1350 atau WIP (1360) tidak ditemukan.", 500);
        }
        if (biayaAbnormal.gt(0) && !akunKerugian) {
          throw new HarvestError("Akun 5300 tidak ditemukan.", 500);
        }

        const baris: { akunId: number; debit: Prisma.Decimal; kredit: Prisma.Decimal }[] = [
          { akunId: akunPersediaan.id, debit: nilaiPersediaan, kredit: new Prisma.Decimal(0) },
        ];
        if (biayaAbnormal.gt(0) && akunKerugian) {
          baris.push({
            akunId: akunKerugian.id,
            debit: biayaAbnormal,
            kredit: new Prisma.Decimal(0),
          });
        }
        baris.push({ akunId: akunWip.id, debit: new Prisma.Decimal(0), kredit: kreditWip });

        await tx.jurnal.create({
          data: {
            tanggal: new Date(),
            keterangan: `Panen disetujui ${laporan.siklus.kode_batch} (Dr persediaan, Cr WIP)`,
            status: "APPROVED",
            sumber: "AUTO",
            dibuatOlehId: userId,
            diputusOlehId: userId,
            diputusPada: new Date(),
            baris: { create: baris },
          },
        });

        await tx.akun.update({
          where: { id: akunPersediaan.id },
          data: { saldo: { increment: nilaiPersediaan } },
        });
        if (biayaAbnormal.gt(0) && akunKerugian) {
          await tx.akun.update({
            where: { id: akunKerugian.id },
            data: { saldo: { increment: biayaAbnormal } },
          });
        }
        await tx.akun.update({
          where: { id: akunWip.id },
          data: { saldo: { decrement: kreditWip } },
        });
      }

      return updatedLaporan;
    },
    { maxWait: 20_000, timeout: 60_000 }
  );
}

export async function rejectLaporanPanen(id: number, userId: number, alasan: string) {
  if (!alasan || !alasan.trim()) {
    throw new HarvestError("Alasan penolakan wajib diisi.", 400);
  }

  return prisma.$transaction(
    async (tx) => {
      const laporan = await tx.laporan_Panen.findUnique({
        where: { id },
        include: { siklus: true },
      });

      if (!laporan) throw new HarvestError("Laporan tidak ditemukan.", 404);
      if (laporan.status !== "PENDING") {
        throw new HarvestError("Laporan tidak dalam status PENDING.", 400);
      }

      // Update status laporan
      const updatedLaporan = await tx.laporan_Panen.update({
        where: { id },
        data: { 
          status: "REJECTED",
          catatan: (laporan.catatan ? laporan.catatan + "\n" : "") + `Ditolak: ${alasan.trim()}`,
        },
      });

      return updatedLaporan;
    },
    { maxWait: 20_000, timeout: 60_000 }
  );
}
