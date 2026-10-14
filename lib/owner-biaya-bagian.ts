import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { rataHppPerLubangVarietas } from "@/lib/varietas-hpp-rata";

export type OwnerBiayaBagian =
  | "langsung"
  | "umum"
  | "alokasi"
  | "kolam"
  | "hpp-kg"
  | "hpp-lubang"
  | "cek-hpp"
  | "hpp-pack";

export function parseOwnerBiayaBagian(raw: string | undefined): OwnerBiayaBagian {
  const ids: OwnerBiayaBagian[] = [
    "langsung",
    "umum",
    "alokasi",
    "kolam",
    "hpp-kg",
    "hpp-lubang",
    "cek-hpp",
    "hpp-pack",
  ];
  if (raw && ids.includes(raw as OwnerBiayaBagian)) return raw as OwnerBiayaBagian;
  return "langsung";
}

export type VarietasHppRingkasan = {
  varietasId: number;
  nama: string;
  hargaJualCurah: string;
  hargaJualPack: string;
  hppPerKg: string | null;
  hppPerLubang: string | null;
  hppPerPack: string | null;
  batchCount: number;
  marginKg: string | null;
  marginPack: string | null;
  layak: boolean;
};

const nol = new Prisma.Decimal(0);

async function loadVarietasHppRingkasan(): Promise<VarietasHppRingkasan[]> {
  const varietasList = await prisma.varietas.findMany({
    orderBy: { nama: "asc" },
    select: {
      id: true,
      nama: true,
      harga_jual_curah: true,
      harga_jual_pack: true,
    },
  });

  const hppRows = await prisma.hPP.findMany({
    where: { siklus: { laporanPanen: { status: "APPROVED" } } },
    select: {
      hpp_per_kg: true,
      hpp_per_lubang: true,
      hpp_per_pack: true,
      siklus: {
        select: {
          varietas_id: true,
          jumlah_layak_jual: true,
          laporanPanen: { select: { jumlah_layak: true } },
        },
      },
    },
  });

  type Acc = {
    wKg: Prisma.Decimal;
    wLubang: Prisma.Decimal;
    wPack: Prisma.Decimal;
    bobot: number;
    batches: number;
  };

  const byVar = new Map<number, Acc>();
  for (const row of hppRows) {
    const vid = row.siklus.varietas_id;
    const lubang = row.siklus.laporanPanen?.jumlah_layak ?? row.siklus.jumlah_layak_jual;
    if (lubang <= 0) continue;
    const acc = byVar.get(vid) ?? {
      wKg: nol,
      wLubang: nol,
      wPack: nol,
      bobot: 0,
      batches: 0,
    };
    acc.wKg = acc.wKg.add(row.hpp_per_kg.mul(lubang));
    acc.wLubang = acc.wLubang.add(row.hpp_per_lubang.mul(lubang));
    acc.wPack = acc.wPack.add(row.hpp_per_pack.mul(lubang));
    acc.bobot += lubang;
    acc.batches += 1;
    byVar.set(vid, acc);
  }

  const out: VarietasHppRingkasan[] = [];
  for (const v of varietasList) {
    const acc = byVar.get(v.id);
    const rataLubang = await rataHppPerLubangVarietas(v.id);

    let hppKg: string | null = null;
    let hppLubang: string | null = rataLubang?.toFixed(2) ?? null;
    let hppPack: string | null = null;

    if (acc && acc.bobot > 0) {
      hppKg = acc.wKg.div(acc.bobot).toFixed(2);
      if (!hppLubang) hppLubang = acc.wLubang.div(acc.bobot).toFixed(2);
      hppPack = acc.wPack.div(acc.bobot).toFixed(2);
    }

    const marginKg =
      hppKg != null ? v.harga_jual_curah.sub(hppKg).toFixed(2) : null;
    const marginPack =
      hppPack != null ? v.harga_jual_pack.sub(hppPack).toFixed(2) : null;

    const layak =
      marginKg != null &&
      marginPack != null &&
      new Prisma.Decimal(marginKg).gt(0) &&
      new Prisma.Decimal(marginPack).gt(0);

    out.push({
      varietasId: v.id,
      nama: v.nama,
      hargaJualCurah: v.harga_jual_curah.toFixed(2),
      hargaJualPack: v.harga_jual_pack.toFixed(2),
      hppPerKg: hppKg,
      hppPerLubang: hppLubang,
      hppPerPack: hppPack,
      batchCount: acc?.batches ?? 0,
      marginKg,
      marginPack,
      layak,
    });
  }
  return out;
}

export async function loadOwnerBiayaLangsungRows() {
  const rows = await prisma.biaya_Langsung.findMany({
    include: {
      siklus: {
        select: {
          kode_batch: true,
          varietas: { select: { nama: true } },
          kolam: {
            select: {
              nama: true,
              greenhouse: { select: { nama: true } },
            },
          },
        },
      },
    },
    orderBy: { siklus_id: "desc" },
    take: 120,
  });

  return rows.map((r) => ({
    id: r.siklus_id,
    batch: r.siklus.kode_batch,
    varietas: r.siklus.varietas.nama,
    lokasi: `${r.siklus.kolam.greenhouse.nama} · ${r.siklus.kolam.nama}`,
    benih: r.biaya_benih.toFixed(2),
    rockwool: r.biaya_rockwool.toFixed(2),
    nutrisi: r.biaya_nutrisi.toFixed(2),
    listrik: r.biaya_listrik_pompa.toFixed(2),
    subtotal: r.subtotal.toFixed(2),
  }));
}

export async function loadOwnerBiayaUmumRows() {
  const rows = await prisma.biaya_Overhead.findMany({ orderBy: { periode: "desc" }, take: 24 });
  return rows.map((r) => ({
    id: r.id,
    periode: r.periode.toISOString().slice(0, 10),
    depGreenhouse: r.depresiasi_greenhouse.toFixed(2),
    depListrik: r.depresiasi_listrik.toFixed(2),
    sewa: r.sewa_lahan.toFixed(2),
    gaji: r.gaji_karyawan.toFixed(2),
    subtotal: r.subtotal.toFixed(2),
  }));
}

export async function loadOwnerBiayaAlokasiRows() {
  const rows = await prisma.hPP.findMany({
    where: { siklus: { laporanPanen: { status: "APPROVED" } } },
    orderBy: { id: "desc" },
    take: 120,
    select: {
      overhead_teralokasi: true,
      biaya_langsung_total: true,
      total_biaya: true,
      siklus: {
        select: {
          kode_batch: true,
          varietas: { select: { nama: true } },
          kolam: {
            select: {
              nama: true,
              greenhouse: { select: { nama: true } },
            },
          },
        },
      },
    },
  });

  return rows.map((r) => ({
    batch: r.siklus.kode_batch,
    varietas: r.siklus.varietas.nama,
    lokasi: `${r.siklus.kolam.greenhouse.nama} · ${r.siklus.kolam.nama}`,
    langsung: r.biaya_langsung_total.toFixed(2),
    overhead: r.overhead_teralokasi.toFixed(2),
    total: r.total_biaya.toFixed(2),
  }));
}

export async function loadOwnerBiayaPerKolamRows() {
  const rows = await prisma.siklus_Produksi.findMany({
    where: { biaya_langsung: { isNot: null } },
    select: {
      kolam_id: true,
      kolam: {
        select: {
          nama: true,
          greenhouse: { select: { nama: true } },
        },
      },
      biaya_langsung: { select: { subtotal: true } },
      hpp: { select: { overhead_teralokasi: true, total_biaya: true } },
    },
  });

  const map = new Map<
    number,
    {
      kolam: string;
      greenhouse: string;
      langsung: Prisma.Decimal;
      overhead: Prisma.Decimal;
      total: Prisma.Decimal;
      siklus: number;
    }
  >();

  for (const s of rows) {
    const cur = map.get(s.kolam_id) ?? {
      kolam: s.kolam.nama,
      greenhouse: s.kolam.greenhouse.nama,
      langsung: nol,
      overhead: nol,
      total: nol,
      siklus: 0,
    };
    cur.langsung = cur.langsung.add(s.biaya_langsung?.subtotal ?? nol);
    cur.overhead = cur.overhead.add(s.hpp?.overhead_teralokasi ?? nol);
    cur.total = cur.total.add(s.hpp?.total_biaya ?? s.biaya_langsung?.subtotal ?? nol);
    cur.siklus += 1;
    map.set(s.kolam_id, cur);
  }

  return Array.from(map.values())
    .map((v) => ({
      kolam: v.kolam,
      greenhouse: v.greenhouse,
      jumlahSiklus: v.siklus,
      biayaLangsung: v.langsung.toFixed(2),
      overhead: v.overhead.toFixed(2),
      totalHpp: v.total.toFixed(2),
    }))
    .sort((a, b) => a.greenhouse.localeCompare(b.greenhouse) || a.kolam.localeCompare(b.kolam));
}

export async function loadOwnerBiayaBagianData(bagian: OwnerBiayaBagian) {
  const hppVarietas = await loadVarietasHppRingkasan();

  switch (bagian) {
    case "langsung":
      return { type: "langsung" as const, rows: await loadOwnerBiayaLangsungRows() };
    case "umum":
      return { type: "umum" as const, rows: await loadOwnerBiayaUmumRows() };
    case "alokasi":
      return { type: "alokasi" as const, rows: await loadOwnerBiayaAlokasiRows() };
    case "kolam":
      return { type: "kolam" as const, rows: await loadOwnerBiayaPerKolamRows() };
    case "hpp-kg":
      return { type: "hpp-kg" as const, varietas: hppVarietas };
    case "hpp-lubang":
      return { type: "hpp-lubang" as const, varietas: hppVarietas };
    case "hpp-pack":
      return { type: "hpp-pack" as const, varietas: hppVarietas };
    case "cek-hpp":
      return { type: "cek-hpp" as const, varietas: hppVarietas };
  }
}
