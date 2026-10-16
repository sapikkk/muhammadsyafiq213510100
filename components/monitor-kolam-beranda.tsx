"use client";

import { useState } from "react";
import { BentoSection } from "@/components/dashboard-bento";
import { DashboardMonitorKolam } from "@/components/dashboard-monitor-kolam";
import { DashboardMonitorKolamRingkas } from "@/components/dashboard-monitor-kolam-ringkas";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import type { MonitorFilterOption } from "@/components/petani-monitor-section";
import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";
import { Button } from "@/components/ui/button";
import type { PermissionSectionBadge } from "@/lib/permission-section-badge";

type EmptyAction = { message: string; actionLabel: string; href: string };

/** Monitor kolam beranda — sama owner, admin, petani (ringkas dulu, lalu lengkap). */
export function MonitorKolamBeranda({
  totalLogs,
  logTerbaru,
  lahan,
  greenhouse,
  kolam,
  siklus,
  defaultTglAwal,
  defaultTglAkhir,
  emptyAction,
  badge,
  hidePermissionBadge,
  className,
}: {
  totalLogs: number;
  logTerbaru: MonitorLogBaris[];
  lahan: MonitorFilterOption[];
  greenhouse: MonitorFilterOption[];
  kolam: MonitorFilterOption[];
  siklus: MonitorFilterOption[];
  defaultTglAwal: string;
  defaultTglAkhir: string;
  emptyAction: EmptyAction;
  badge?: PermissionSectionBadge;
  hidePermissionBadge?: boolean;
  className?: string;
}) {
  const [lengkap, setLengkap] = useState(false);

  if (totalLogs === 0 && logTerbaru.length === 0) {
    return (
      <BentoSection
        title="Monitor kolam"
        badge={badge}
        hidePermissionBadge={hidePermissionBadge}
        className={className}
      >
        <DashboardBentoEmpty {...emptyAction} />
      </BentoSection>
    );
  }

  if (lengkap) {
    return (
      <BentoSection
        title="Monitor kolam"
        badge={badge}
        hidePermissionBadge={hidePermissionBadge}
        className={className}
      >
        <div className="mb-2 flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="min-h-11 text-sm"
            onClick={() => setLengkap(false)}
          >
            Tutup tampilan lengkap
          </Button>
        </div>
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

  return (
    <BentoSection
      title="Monitor kolam"
      badge={badge}
      hidePermissionBadge={hidePermissionBadge}
      className={className}
    >
      <DashboardMonitorKolamRingkas rows={logTerbaru} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {logTerbaru.length} catatan terbaru · {totalLogs.toLocaleString("id-ID")} total di farm
        </p>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="min-h-11"
          onClick={() => setLengkap(true)}
        >
          Buka monitor lengkap
        </Button>
      </div>
    </BentoSection>
  );
}
