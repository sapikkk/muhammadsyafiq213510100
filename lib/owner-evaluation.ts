import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);

export type SiklusMarginRow = {
  kodeBatch: string;
  varietas: string;
  hppPerKg: string;
  hppPerPack: string;
  hargaCurah: string;
  hargaPack: string;
  marginCurahPerKg: string;
  marginPackPerPack: string;
  marginCurahPct: string;
};

export type OwnerEvaluationResult = {
  kapasitas: {
    totalLubang: number;
    lubangTerpakai: number;
    lubangMenganggur: number;
    kolamTerpakai: number;
    kolamMenganggur: number;
    idlePct: string;
  };
  rataRata: {
    hppPerKg: string;
    hppPerPack: string;
    hargaCurah: string;
    hargaPack: string;
    marginCurahPerKg: string;
    marginPackPerPack: string;
  };
  bep: {
    overheadBulan: string;
    overheadPeriode: string | null;
    kontribusiCurahPerKg: string;
    kontribusiPackPerPack: string;
    bepKgCurah: string | null;
    bepLubangMin: string | null;
  };
  siklusTerbaru: SiklusMarginRow[];
  rekomendasi: string[];
};

function pct(margin: Prisma.Decimal, price: Prisma.Decimal): string {
  if (price.lte(0)) return "0";
  return margin.div(price).mul(100).toFixed(1);
}

function dec(value: Prisma.Decimal) {
  return value.toFixed(2);
}

export async function ownerEvaluation(): Promise<OwnerEvaluationResult> {
  const kolams = await prisma.kolam.findMany({
    select: { status: true, kapasitas_lubang: true },
  });

  let totalLubang = 0;
  let lubangTerpakai = 0;
  let kolamTerpakai = 0;
  let kolamMenganggur = 0;
  for (const k of kolams) {
    totalLubang += k.kapasitas_lubang;
    if (k.status === "TERPAKAI") {
      kolamTerpakai += 1;
      lubangTerpakai += k.kapasitas_lubang;
    } else {
      kolamMenganggur += 1;
    }
  }
  const lubangMenganggur = Math.max(0, totalLubang - lubangTerpakai);
  const idlePct =
    totalLubang > 0
      ? new Prisma.Decimal(lubangMenganggur).div(totalLubang).mul(100).toFixed(1)
      : "0";

  const hppRows = await prisma.hPP.findMany({
    include: {
      siklus: {
        include: {
          varietas: {
            select: {
              nama: true,
              harga_jual_curah: true,
              harga_jual_pack: true,
            },
          },
          laporanPanen: {
            select: { status: true, berat_layak_gram: true, jumlah_layak: true },
          },
        },
      },
    },
    orderBy: { id: "desc" },
    take: 24,
  });

  const approved = hppRows.filter((r) => r.siklus.laporanPanen?.status === "APPROVED");

  let sumHppKg = nol;
  let sumHppPack = nol;
  let sumHargaCurah = nol;
  let sumHargaPack = nol;
  let sumMarginLubang = nol;
  let n = 0;

  for (const row of approved) {
    const v = row.siklus.varietas;
    const lp = row.siklus.laporanPanen!;
    sumHppKg = sumHppKg.add(row.hpp_per_kg);
    sumHppPack = sumHppPack.add(row.hpp_per_pack);
    sumHargaCurah = sumHargaCurah.add(v.harga_jual_curah);
    sumHargaPack = sumHargaPack.add(v.harga_jual_pack);
    const jumlahLayak = new Prisma.Decimal(Math.max(1, lp.jumlah_layak));
    const kgPerLubang = lp.berat_layak_gram.div(1000).div(jumlahLayak);
    const pendapatanPerLubang = v.harga_jual_curah.mul(kgPerLubang);
    sumMarginLubang = sumMarginLubang.add(pendapatanPerLubang.sub(row.hpp_per_lubang));
    n += 1;
  }

  const siklusTerbaru: SiklusMarginRow[] = approved.slice(0, 6).map((row) => {
    const v = row.siklus.varietas;
    const marginCurah = v.harga_jual_curah.sub(row.hpp_per_kg);
    const marginPack = v.harga_jual_pack.sub(row.hpp_per_pack);
    return {
      kodeBatch: row.siklus.kode_batch,
      varietas: v.nama,
      hppPerKg: dec(row.hpp_per_kg),
      hppPerPack: dec(row.hpp_per_pack),
      hargaCurah: dec(v.harga_jual_curah),
      hargaPack: dec(v.harga_jual_pack),
      marginCurahPerKg: dec(marginCurah),
      marginPackPerPack: dec(marginPack),
      marginCurahPct: pct(marginCurah, v.harga_jual_curah),
    };
  });

  const avgHppKg = n > 0 ? sumHppKg.div(n) : nol;
  const avgHppPack = n > 0 ? sumHppPack.div(n) : nol;
  const avgHargaCurah = n > 0 ? sumHargaCurah.div(n) : nol;
  const avgHargaPack = n > 0 ? sumHargaPack.div(n) : nol;
  const kontribusiCurah = avgHargaCurah.sub(avgHppKg);
  const kontribusiPack = avgHargaPack.sub(avgHppPack);
  const kontribusiLubang = n > 0 ? sumMarginLubang.div(n) : nol;

  const overhead = await prisma.biaya_Overhead.findFirst({ orderBy: { periode: "desc" } });
  const overheadBulan = overhead?.subtotal ?? nol;
  const overheadPeriode = overhead ? overhead.periode.toISOString().slice(0, 10) : null;

  let bepKgCurah: string | null = null;
  if (kontribusiCurah.gt(0) && overheadBulan.gt(0)) {
    bepKgCurah = overheadBulan.div(kontribusiCurah).toFixed(2);
  }

  let bepLubangMin: string | null = null;
  if (kontribusiLubang.gt(0) && overheadBulan.gt(0)) {
    bepLubangMin = overheadBulan.div(kontribusiLubang).toFixed(0);
  }

  const rekomendasi: string[] = [];
  if (n === 0) {
    rekomendasi.push("Belum ada HPP dari panen disetujui — selesaikan approve harvest untuk evaluasi margin.");
  } else {
    if (kontribusiCurah.lte(0)) {
      rekomendasi.push("Harga curah di bawah HPP rata-rata: sesuaikan harga jual atau turunkan biaya produksi.");
    } else if (avgHargaCurah.gt(0) && kontribusiCurah.div(avgHargaCurah).lt(0.15)) {
      rekomendasi.push("Margin curah tipis (<15%): pertimbangkan efisiensi biaya langsung atau kenaikan harga.");
    }
  }
  if (Number(idlePct) >= 25) {
    rekomendasi.push(
      `Kapasitas menganggur ${idlePct}% — manfaatkan kolam idle atau evaluasi biaya tetap (overhead).`,
    );
  } else if (Number(idlePct) <= 5 && kontribusiCurah.gt(0)) {
    rekomendasi.push("Kapasitas hampir penuh dengan margin positif — peluang ekspansi produksi jika permintaan mendukung.");
  }
  if (rekomendasi.length === 0) {
    rekomendasi.push("Indikator dalam batas wajar — pantau tren laba bulanan di dashboard.");
  }

  return {
    kapasitas: {
      totalLubang,
      lubangTerpakai,
      lubangMenganggur,
      kolamTerpakai,
      kolamMenganggur,
      idlePct,
    },
    rataRata: {
      hppPerKg: dec(avgHppKg),
      hppPerPack: dec(avgHppPack),
      hargaCurah: dec(avgHargaCurah),
      hargaPack: dec(avgHargaPack),
      marginCurahPerKg: dec(kontribusiCurah),
      marginPackPerPack: dec(kontribusiPack),
    },
    bep: {
      overheadBulan: dec(overheadBulan),
      overheadPeriode,
      kontribusiCurahPerKg: dec(kontribusiCurah),
      kontribusiPackPerPack: dec(kontribusiPack),
      bepKgCurah,
      bepLubangMin,
    },
    siklusTerbaru,
    rekomendasi,
  };
}
