import "server-only";

import { prisma } from "@/lib/prisma";
import { labelTahap } from "@/lib/kegagalan-labels";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
  ringkasanSiklusUntukTeks,
} from "@/lib/produksi-ui-labels";

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

const siklusRingkasanSelect = {
  kode_batch: true,
  jumlah_disemai: true,
  total_susut: true,
  jumlah_layak_jual: true,
  status: true,
  varietas: { select: { nama: true } },
  kolam: {
    select: {
      nama: true,
      greenhouse: { select: { nama: true } },
    },
  },
  laporanPanen: { select: { jumlah_layak: true, jumlah_tidak_layak: true } },
} as const;

export async function loadOwnerKegagalanSusutDashboard() {
  const [pending, logs, siklusRows, aggKategori] = await Promise.all([
    prisma.log_Kegagalan.findMany({
      where: { kategori_susut: "MENUNGGU" },
      include: { siklus: { select: siklusRingkasanSelect } },
      orderBy: { id: "desc" },
    }),
    prisma.log_Kegagalan.findMany({
      include: { siklus: { select: siklusRingkasanSelect } },
      orderBy: { id: "desc" },
      take: 150,
    }),
    prisma.siklus_Produksi.findMany({
      where: { jumlah_disemai: { gt: 0 } },
      select: siklusRingkasanSelect,
      orderBy: { id: "desc" },
      take: 80,
    }),
    prisma.log_Kegagalan.groupBy({
      by: ["kategori_susut"],
      _count: { _all: true },
      _sum: { jumlah_gagal: true },
    }),
  ]);

  let totalSusut = 0;
  let totalLayakJual = 0;
  let totalTidakLayakPanen = 0;
  for (const s of siklusRows) {
    totalSusut += s.total_susut;
    totalLayakJual += s.jumlah_layak_jual;
    totalTidakLayakPanen += s.laporanPanen?.jumlah_tidak_layak ?? 0;
  }

  const normal = aggKategori.find((g) => g.kategori_susut === "NORMAL");
  const abnormal = aggKategori.find((g) => g.kategori_susut === "ABNORMAL");
  const menunggu = aggKategori.find((g) => g.kategori_susut === "MENUNGGU");

  return {
    metrics: {
      menungguKlasifikasi: pending.length,
      totalSusut,
      totalLayakJual,
      totalTidakLayakPanen,
      catatanNormal: normal?._count._all ?? 0,
      catatanAbnormal: abnormal?._count._all ?? 0,
      bibitNormal: normal?._sum.jumlah_gagal ?? 0,
      bibitAbnormal: abnormal?._sum.jumlah_gagal ?? 0,
      catatanMenunggu: menunggu?._count._all ?? 0,
    },
    pending: pending.map((row) => ({
      id: row.id,
      tahapLabel: labelTahap(row.tahap),
      jumlahGagal: row.jumlah_gagal,
      penyebab: row.penyebab,
      lokasi: labelBarisProduksiUtama(partsFromSiklusNested(row.siklus)),
    })),
    riwayat: logs.map((row) => ({
      id: row.id,
      waktu: row.id,
      tahapLabel: labelTahap(row.tahap),
      jumlahGagal: row.jumlah_gagal,
      kategori: labelKategoriSusut(row.kategori_susut),
      penyebab: row.penyebab,
      lokasi: labelBarisProduksiUtama(partsFromSiklusNested(row.siklus)),
    })),
    perSiklus: siklusRows.map((s) => ({
      id: s.kode_batch,
      label: ringkasanSiklusUntukTeks({
        kode_batch: s.kode_batch,
        varietas: s.varietas,
        kolam: s.kolam,
      }),
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
