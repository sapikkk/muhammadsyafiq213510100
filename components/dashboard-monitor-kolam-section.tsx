import { MonitorKolamBeranda } from "@/components/monitor-kolam-beranda";
import type { MonitorFilterOption } from "@/components/petani-monitor-section";
import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";

export function DashboardMonitorKolamSection({
  totalLogs,
  logTerbaru,
  lahan,
  greenhouse,
  kolam,
  siklus,
  defaultTglAwal,
  defaultTglAkhir,
  emptyAction,
  hidePermissionBadge,
}: {
  totalLogs: number;
  logTerbaru: MonitorLogBaris[];
  lahan: MonitorFilterOption[];
  greenhouse: MonitorFilterOption[];
  kolam: MonitorFilterOption[];
  siklus: MonitorFilterOption[];
  defaultTglAwal: string;
  defaultTglAkhir: string;
  emptyAction: { message: string; actionLabel: string; href: string };
  hidePermissionBadge?: boolean;
}) {
  return (
    <MonitorKolamBeranda
      totalLogs={totalLogs}
      logTerbaru={logTerbaru}
      lahan={lahan}
      greenhouse={greenhouse}
      kolam={kolam}
      siklus={siklus}
      defaultTglAwal={defaultTglAwal}
      defaultTglAkhir={defaultTglAkhir}
      emptyAction={emptyAction}
      badge="Read"
      hidePermissionBadge={hidePermissionBadge}
    />
  );
}
