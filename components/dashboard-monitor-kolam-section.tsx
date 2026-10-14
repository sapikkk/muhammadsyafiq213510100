import { BentoSection } from "@/components/dashboard-bento";
import { DashboardMonitorKolam } from "@/components/dashboard-monitor-kolam";
import type { MonitorFilterOption } from "@/components/petani-monitor-section";

export function DashboardMonitorKolamSection({
  totalLogs,
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
    <BentoSection title="Monitor kolam" badge="Read" hidePermissionBadge={hidePermissionBadge}>
      <DashboardMonitorKolam
        totalLogs={totalLogs}
        lahan={lahan}
        greenhouse={greenhouse}
        kolam={kolam}
        siklus={siklus}
        defaultTglAwal={defaultTglAwal}
        defaultTglAkhir={defaultTglAkhir}
        emptyAction={emptyAction}
      />
    </BentoSection>
  );
}
