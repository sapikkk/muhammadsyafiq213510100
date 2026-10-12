import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { kpiHidroponikMvp as kpiHidroponikMvpImpl } from "@/lib/kpi-hidroponik";
import { monthlySummary as monthlySummaryImpl } from "@/lib/monthly-summary";
import { prisma } from "@/lib/prisma";
import { listSiklusUntukPilihAdmin } from "@/lib/siklus-produksi";

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

export const countNotifikasiBelumDibacaCached = cache(async (userId: number) => {
  return prisma.notifikasi.count({
    where: { userId, dibacaPada: null },
  });
});

/** Opsi siklus admin biaya — arsip penuh, select ringan. */
export const listSiklusUntukPilihAdminCached = cache(listSiklusUntukPilihAdmin);

const monthlySummaryData = unstable_cache(
  async (monthCount: number) => monthlySummaryImpl(monthCount),
  ["monthly-summary"],
  { revalidate: 120, tags: ["monthly-summary"] },
);

const kpiHidroponikMvpData = unstable_cache(
  async () => kpiHidroponikMvpImpl(),
  ["kpi-hidroponik-mvp"],
  { revalidate: 120, tags: ["kpi-hidroponik"] },
);

/** Dedup per request + cache 120s antar request (beranda owner/admin keuangan). */
export const monthlySummaryCached = cache((monthCount = 6) =>
  monthlySummaryData(monthCount),
);

export const kpiHidroponikMvpCached = cache(() => kpiHidroponikMvpData());

export { revalidateOwnerDashboardCaches } from "@/lib/owner-dashboard-cache";

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
