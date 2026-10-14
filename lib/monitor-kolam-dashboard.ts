import "server-only";

import { countMonitorLogs } from "@/lib/monitor-kolam-query";
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

  const [totalLogs, filter] = await Promise.all([
    countMonitorLogs({ start, end }),
    listMonitorFilterOptionsDashboard(),
  ]);

  return {
    totalLogs,
    lahan: filter.lahan,
    greenhouse: filter.greenhouse,
    kolam: filter.kolam,
    siklus: filter.siklus,
    defaultTglAwal,
    defaultTglAkhir,
  };
}
