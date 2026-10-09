import { Prisma } from "@prisma/client";
import { allocateOverheadForSiklus } from "@/lib/biaya";
import { prisma } from "@/lib/prisma";
import { BIAYA_PLASTIK_PER_PACK, type HppCalcResult } from "@/lib/hpp-override";
import { totalBiayaAbnormalSiklus } from "@/lib/susut";

type PrismaDb = typeof prisma;

export async function calculateHPP(siklusId: number, tx: PrismaDb = prisma) {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: {
      biaya_langsung: true,
      varietas: true,
      laporanPanen: true,
    },
  });

  if (!siklus) throw new Error("Siklus tidak ditemukan.");
  if (!siklus.laporanPanen) {
    throw new Error("Laporan panen belum dikirim.");
  }

  // 1. Biaya Langsung
  const biayaLangsungTotal = siklus.biaya_langsung?.subtotal || new Prisma.Decimal(0);

  const overheadTeralokasi = await allocateOverheadForSiklus(siklusId, tx);

  const beratLayakGram = siklus.laporanPanen.berat_layak_gram;
  const beratPerPackGram = siklus.varietas.berat_per_pack;
  let totalPackEst = new Prisma.Decimal(1);
  if (beratPerPackGram.gt(0)) {
    totalPackEst = beratLayakGram.div(beratPerPackGram);
  }
  const packsBulat = new Prisma.Decimal(Math.max(1, Math.ceil(totalPackEst.toNumber())));
  const biayaPlastikPacking = BIAYA_PLASTIK_PER_PACK.mul(packsBulat);

  const biayaAbnormal = await totalBiayaAbnormalSiklus(siklusId, tx as PrismaDb);

  // Total biaya HPP — susut abnormal tidak menggelembungkan HPP per kg
  let totalBiaya = biayaLangsungTotal
    .add(overheadTeralokasi)
    .add(biayaPlastikPacking)
    .sub(biayaAbnormal);
  if (totalBiaya.lt(0)) totalBiaya = new Prisma.Decimal(0);

  const jumlahLayakJual = new Prisma.Decimal(siklus.laporanPanen.jumlah_layak || 1);
  const beratKg = beratLayakGram.div(1000);
  const totalPack = totalPackEst;

  // HPP
  const hppPerLubang = totalBiaya.div(jumlahLayakJual);
  const hppPerKg = beratKg.gt(0) ? totalBiaya.div(beratKg) : new Prisma.Decimal(0);
  const hppPerPack = totalBiaya.div(totalPack);

  const result: HppCalcResult = {
    biaya_langsung_total: biayaLangsungTotal,
    overhead_teralokasi: overheadTeralokasi,
    biaya_plastik_packing: biayaPlastikPacking,
    total_biaya: totalBiaya,
    hpp_per_lubang: hppPerLubang,
    hpp_per_kg: hppPerKg,
    hpp_per_pack: hppPerPack,
  };
  return result;
}

export function yieldContextFromSiklus(
  laporan: { jumlah_layak: number; berat_layak_gram: Prisma.Decimal },
  beratPerPackGram: Prisma.Decimal,
) {
  const jumlahLayak = new Prisma.Decimal(laporan.jumlah_layak || 1);
  const beratKg = laporan.berat_layak_gram.div(1000);
  let totalPack = new Prisma.Decimal(1);
  if (beratPerPackGram.gt(0)) {
    totalPack = laporan.berat_layak_gram.div(beratPerPackGram);
  }
  return { jumlahLayak, beratKg, totalPack };
}
