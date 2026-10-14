import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { labelTahap } from "@/lib/kegagalan-labels";
import {
  partsFromSiklusNested,
  ringkasanSiklusUntukTeks,
} from "@/lib/produksi-ui-labels";
import { formatTanggal } from "@/lib/format";

export type OwnerKegagalanBagian =
  | "menunggu"
  | "total"
  | "klasifikasi"
  | "layak"
  | "tidak-layak"
  | "per-siklus"
  | "riwayat";

export const OWNER_KEGAGALAN_BAGIAN: { id: OwnerKegagalanBagian; label: string; epic: string }[] =
  [
    { id: "menunggu", label: "Menunggu klasifikasi", epic: "3.1" },
    { id: "total", label: "Total susut", epic: "3.2" },
    { id: "klasifikasi", label: "Normal vs tidak normal", epic: "3.3" },
    { id: "layak", label: "Jumlah layak jual", epic: "3.4" },
    { id: "tidak-layak", label: "Tidak layak jual", epic: "3.5" },
    { id: "per-siklus", label: "Susut per siklus", epic: "3.6" },
    { id: "riwayat", label: "Riwayat catatan", epic: "" },
  ];

export function parseOwnerKegagalanBagian(raw: string | undefined): OwnerKegagalanBagian {
  const ok = OWNER_KEGAGALAN_BAGIAN.some((b) => b.id === raw);
  return ok ? (raw as OwnerKegagalanBagian) : "menunggu";
}

export type OwnerKegagalanFilterInput = {
  bulan?: string;
  dari?: string;
  sampai?: string;
};

export type OwnerKegagalanLogRow = {
  id: number;
  merk: string;
  varietas: string;
  susut: number;
  penyebab: string;
  tanggalLabel: string;
  tahapLabel: string;
  kategori?: string;
  kolam: string;
  greenhouse: string;
  lahan: string;
  kodeBatch: string;
};

export type OwnerKegagalanFunnel = {
  disemai: number;
  susutTercatat: number;
  sprout: number;
  pindahKolam: number;
  diKolam: number;
  gagalPanen: number;
  layakPanen: number;
  layakJual: number;
};

const siklusRingkasanSelect = {
  kode_batch: true,
  jumlah_disemai: true,
  total_susut: true,
  jumlah_layak_jual: true,
  tanggal_semai: true,
  tanggal_pindah_kolam: true,
  tanggal_panen: true,
  status: true,
  varietas: { select: { nama: true } },
  kolam: {
    select: {
      nama: true,
      greenhouse: {
        select: {
          nama: true,
          lahan_id: true,
        },
      },
    },
  },
  laporanPanen: { select: { jumlah_layak: true, jumlah_tidak_layak: true } },
} as const;

type SiklusNested = {
  kode_batch: string;
  tanggal_semai: Date;
  tanggal_pindah_kolam: Date | null;
  tanggal_panen: Date | null;
  varietas: { nama: string };
  kolam: {
    nama: string;
    greenhouse: { nama: string; lahan_id: number };
  };
};

function tanggalLog(tahap: string, siklus: SiklusNested): string {
  let d: Date | null = siklus.tanggal_semai;
  if (tahap === "PANEN_SORTASI") d = siklus.tanggal_panen ?? siklus.tanggal_semai;
  else if (tahap === "PINDAH_KOLAM" || tahap === "PENDEWASAAN") {
    d = siklus.tanggal_pindah_kolam ?? siklus.tanggal_semai;
  }
  return formatTanggal(d);
}

function mapLogRow(row: {
  id: number;
  tahap: string;
  jumlah_gagal: number;
  penyebab: string;
  kategori_susut: string;
  siklus: SiklusNested;
}): OwnerKegagalanLogRow {
  const parts = partsFromSiklusNested(row.siklus);
  return {
    id: row.id,
    merk: parts.greenhouseNama,
    varietas: parts.varietasNama,
    susut: row.jumlah_gagal,
    penyebab: row.penyebab,
    tanggalLabel: tanggalLog(row.tahap, row.siklus),
    tahapLabel: labelTahap(row.tahap),
    kategori: labelKategoriSusut(row.kategori_susut),
    kolam: parts.kolamNama,
    greenhouse: parts.greenhouseNama,
    lahan: `Lahan #${row.siklus.kolam.greenhouse.lahan_id}`,
    kodeBatch: row.siklus.kode_batch,
  };
}

function parsePeriode(raw: OwnerKegagalanFilterInput): {
  start: Date | null;
  end: Date | null;
  label: string;
} {
  if (raw.bulan && /^\d{4}-\d{2}$/.test(raw.bulan)) {
    const [y, m] = raw.bulan.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0, 23, 59, 59);
    return { start, end, label: raw.bulan };
  }
  const start =
    raw.dari && /^\d{4}-\d{2}-\d{2}$/.test(raw.dari) ? new Date(raw.dari) : null;
  const end =
    raw.sampai && /^\d{4}-\d{2}-\d{2}$/.test(raw.sampai)
      ? new Date(`${raw.sampai}T23:59:59`)
      : null;
  if (start && end) {
    return { start, end, label: `${raw.dari} – ${raw.sampai}` };
  }
  return { start: null, end: null, label: "Semua periode" };
}

function siklusDateWhere(start: Date | null, end: Date | null): Prisma.Siklus_ProduksiWhereInput {
  if (!start || !end) return {};
  return { tanggal_semai: { gte: start, lte: end } };
}

function sumTahap(logs: { tahap: string; jumlah_gagal: number }[], tahaps: string[]) {
  return logs
    .filter((l) => tahaps.includes(l.tahap))
    .reduce((s, l) => s + l.jumlah_gagal, 0);
}

export async function loadOwnerKegagalanSusutDashboard(filterInput: OwnerKegagalanFilterInput = {}) {
  const periode = parsePeriode(filterInput);
  const siklusWhere = siklusDateWhere(periode.start, periode.end);

  const [pending, logs, siklusRows, aggKategori] = await Promise.all([
    prisma.log_Kegagalan.findMany({
      where: {
        kategori_susut: "MENUNGGU",
        ...(periode.start && periode.end ? { siklus: siklusWhere } : {}),
      },
      include: { siklus: { select: siklusRingkasanSelect } },
      orderBy: { id: "desc" },
    }),
    prisma.log_Kegagalan.findMany({
      where: periode.start && periode.end ? { siklus: siklusWhere } : undefined,
      include: { siklus: { select: siklusRingkasanSelect } },
      orderBy: { id: "desc" },
    }),
    prisma.siklus_Produksi.findMany({
      where: { jumlah_disemai: { gt: 0 }, ...siklusWhere },
      select: siklusRingkasanSelect,
      orderBy: { id: "desc" },
    }),
    prisma.log_Kegagalan.groupBy({
      by: ["kategori_susut"],
      _count: { _all: true },
      _sum: { jumlah_gagal: true },
      where: periode.start && periode.end ? { siklus: siklusWhere } : undefined,
    }),
  ]);

  let totalSusut = 0;
  let totalLayakJual = 0;
  let totalTidakLayakPanen = 0;
  let totalLayakPanen = 0;
  let totalDisemai = 0;
  for (const s of siklusRows) {
    totalDisemai += s.jumlah_disemai;
    totalSusut += s.total_susut;
    totalLayakJual += s.jumlah_layak_jual;
    totalTidakLayakPanen += s.laporanPanen?.jumlah_tidak_layak ?? 0;
    totalLayakPanen += s.laporanPanen?.jumlah_layak ?? 0;
  }

  const susutTercatat = logs.reduce((s, l) => s + l.jumlah_gagal, 0);

  const funnel: OwnerKegagalanFunnel = {
    disemai: totalDisemai,
    susutTercatat,
    sprout: sumTahap(logs, ["SEMAI", "SPROUT_DAUN"]),
    pindahKolam: sumTahap(logs, ["PINDAH_KOLAM"]),
    diKolam: sumTahap(logs, ["PENDEWASAAN"]),
    gagalPanen: sumTahap(logs, ["PANEN_SORTASI"]),
    layakPanen: totalLayakPanen,
    layakJual: totalLayakJual,
  };

  const normal = aggKategori.find((g) => g.kategori_susut === "NORMAL");
  const abnormal = aggKategori.find((g) => g.kategori_susut === "ABNORMAL");

  const pendingRows = pending.map(mapLogRow);
  const riwayatRows = logs.map(mapLogRow);

  return {
    periodeLabel: periode.label,
    filterInput,
    funnel,
    metrics: {
      menungguKlasifikasi: pending.length,
      totalSusut,
      totalLayakJual,
      totalTidakLayakPanen,
      catatanNormal: normal?._count._all ?? 0,
      catatanAbnormal: abnormal?._count._all ?? 0,
      bibitNormal: normal?._sum.jumlah_gagal ?? 0,
      bibitAbnormal: abnormal?._sum.jumlah_gagal ?? 0,
    },
    pending: pendingRows,
    riwayat: riwayatRows,
    perSiklus: siklusRows.map((s) => ({
      id: s.kode_batch,
      label: ringkasanSiklusUntukTeks(s),
      disemai: s.jumlah_disemai,
      susut: s.total_susut,
      layakJual: s.jumlah_layak_jual,
      tidakLayakPanen: s.laporanPanen?.jumlah_tidak_layak ?? 0,
      layakPanen: s.laporanPanen?.jumlah_layak ?? 0,
    })),
  };
}

function labelKategoriSusut(k: string): string {
  if (k === "MENUNGGU") return "Menunggu";
  if (k === "NORMAL") return "Normal";
  if (k === "ABNORMAL") return "Tidak normal";
  return "Lainnya";
}
