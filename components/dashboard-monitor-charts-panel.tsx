"use client";

import { MonitorKolamDiagramView } from "@/components/monitor-kolam-diagram-view";

export function DashboardMonitorChartsPanel({
  tglAwal,
  tglAkhir,
  emptyHref,
}: {
  tglAwal: string;
  tglAkhir: string;
  emptyHref: string;
}) {
  const filterQuery = new URLSearchParams({ tglAwal, tglAkhir }).toString();
  return (
    <MonitorKolamDiagramView filterQuery={filterQuery} emptyHref={emptyHref} />
  );
}
