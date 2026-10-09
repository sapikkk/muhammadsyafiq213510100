import { Prisma } from "@prisma/client";
import { allocateOverheadForSiklus } from "@/lib/biaya";
import { prisma } from "@/lib/prisma";
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

  // 3. Biaya Plastik Packing (Asumsi: dari harga_pack di varietas, atau kita set statis untuk MVP)
  // PRD: "berat per pack ditambah biaya plastik"
  const biayaPlastikPacking = new Prisma.Decimal(0);

  const biayaAbnormal = await totalBiayaAbnormalSiklus(siklusId, tx as PrismaDb);

  // Total biaya HPP — susut abnormal tidak menggelembungkan HPP per kg
  let totalBiaya = biayaLangsungTotal
    .add(overheadTeralokasi)
    .add(biayaPlastikPacking)
    .sub(biayaAbnormal);
  if (totalBiaya.lt(0)) totalBiaya = new Prisma.Decimal(0);

  // Yield
  const jumlahLayakJual = new Prisma.Decimal(siklus.laporanPanen.jumlah_layak || 1);
  const beratLayakGram = siklus.laporanPanen.berat_layak_gram;
  const beratKg = beratLayakGram.div(1000);
  
  const beratPerPackGram = siklus.varietas.berat_per_pack;
  let totalPack = new Prisma.Decimal(1);
  if (beratPerPackGram.gt(0)) {
     totalPack = beratLayakGram.div(beratPerPackGram);
  }

  // HPP
  const hppPerLubang = totalBiaya.div(jumlahLayakJual);
  const hppPerKg = beratKg.gt(0) ? totalBiaya.div(beratKg) : new Prisma.Decimal(0);
  const hppPerPack = totalBiaya.div(totalPack);

  return {
    biaya_langsung_total: biayaLangsungTotal,
    overhead_teralokasi: overheadTeralokasi,
    biaya_plastik_packing: biayaPlastikPacking,
    total_biaya: totalBiaya,
    hpp_per_lubang: hppPerLubang,
    hpp_per_kg: hppPerKg,
    hpp_per_pack: hppPerPack,
  };
}
