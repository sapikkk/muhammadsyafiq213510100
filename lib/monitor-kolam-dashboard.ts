import "server-only";

import { countMonitorLogs, paginateMonitorLogs } from "@/lib/monitor-kolam-query";
import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";
import { listMonitorFilterOptionsDashboard } from "@/lib/monitor-kolam-dashboard-filters";

const HARI_DEFAULT = 90;

export { listMonitorFilterOptionsDashboard } from "@/lib/monitor-kolam-dashboard-filters";

export async function loadDashboardMonitorKolam(hari = HARI_DEFAULT) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date();
  start.setDate(start.getDate() - Math.max(7, Math.min(365, hari)));
  start.setHours(0, 0, 0, 0);

  const defaultTglAwal = start.toISOString().slice(0, 10);
  const defaultTglAkhir = end.toISOString().slice(0, 10);

  const filterRange = { start, end };
  const [totalLogs, filter, recent] = await Promise.all([
    countMonitorLogs(filterRange),
    listMonitorFilterOptionsDashboard(),
    paginateMonitorLogs(filterRange, 1, 4),
  ]);

  return {
    totalLogs,
    logTerbaru: recent.rows as MonitorLogBaris[],
    lahan: filter.lahan,
    greenhouse: filter.greenhouse,
    kolam: filter.kolam,
    siklus: filter.siklus,
    defaultTglAwal,
    defaultTglAkhir,
  };
}
