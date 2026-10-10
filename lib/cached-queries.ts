import "server-only";

import { cache } from "react";
import { kpiHidroponikMvp as kpiHidroponikMvpImpl } from "@/lib/kpi-hidroponik";
import { monthlySummary as monthlySummaryImpl } from "@/lib/monthly-summary";
import { prisma } from "@/lib/prisma";
import { listSiklusProduksi } from "@/lib/siklus-produksi";

/** Satu query stok rendah per request React — layout + dashboard + banner. */
export const listAlertStokMinimumCached = cache(async () => {
  const items = await prisma.itemInventaris.findMany({
    where: { aktif: true },
    orderBy: { kode: "asc" },
    select: {
      id: true,
      kode: true,
      nama: true,
      satuan: true,
      stokSaatIni: true,
      stokMinimum: true,
      aktif: true,
    },
  });
  return items.filter((item) => item.stokSaatIni.lt(item.stokMinimum));
});

export async function getStokRendahCount() {
  const rows = await listAlertStokMinimumCached();
  return rows.length;
}

/** Siklus aktif saja — dashboard petani & tugas (bukan full history). */
export const listSiklusProduksiCached = cache(listSiklusProduksi);

export const monthlySummaryCached = cache(monthlySummaryImpl);

export const kpiHidroponikMvpCached = cache(kpiHidroponikMvpImpl);

export const listSiklusAktifCached = cache(async () => {
  return prisma.siklus_Produksi.findMany({
    where: { status: { notIn: ["SELESAI", "GAGAL_TOTAL"] } },
    orderBy: { id: "desc" },
    take: 80,
    include: {
      varietas: { select: { nama: true, status: true } },
      kolam: {
        select: {
          nama: true,
          greenhouse: { select: { nama: true } },
        },
      },
      laporanPanen: { select: { id: true, status: true } },
    },
  });
});
