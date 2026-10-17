"use client";

import { useState } from "react";
import { BentoSection } from "@/components/dashboard-bento";
import { DashboardMonitorKolam } from "@/components/dashboard-monitor-kolam";
import { DashboardMonitorKolamRingkas } from "@/components/dashboard-monitor-kolam-ringkas";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import type { MonitorFilterOption } from "@/components/petani-monitor-section";
import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";
import { Button } from "@/components/ui/button";

export function PetaniMonitorKolamBeranda({
  totalLogs,
  logTerbaru,
  lahan,
  greenhouse,
  kolam,
  siklus,
  defaultTglAwal,
  defaultTglAkhir,
  emptyAction,
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
}) {
  const [lengkap, setLengkap] = useState(false);

  if (totalLogs === 0 && logTerbaru.length === 0) {
    return (
      <BentoSection title="Monitor kolam" className="max-sm:p-3" hidePermissionBadge>
        <DashboardBentoEmpty {...emptyAction} />
      </BentoSection>
    );
  }

  if (lengkap) {
    return (
      <BentoSection title="Monitor kolam" className="max-sm:p-3" hidePermissionBadge>
        <div className="mb-2 flex justify-end">
          <Button type="button" variant="ghost" size="sm" className="h-9 text-xs" onClick={() => setLengkap(false)}>
            Tampilkan ringkas
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
    <BentoSection title="Monitor kolam" className="max-sm:p-3" hidePermissionBadge>
      <DashboardMonitorKolamRingkas rows={logTerbaru} />
      <div className="mt-2 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
        <p className="text-[10px] text-muted-foreground">
          {logTerbaru.length} terbaru · {totalLogs.toLocaleString("id-ID")} total
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 w-full text-xs min-[480px]:w-auto"
          onClick={() => setLengkap(true)}
        >
          Selengkapnya
        </Button>
      </div>
    </BentoSection>
  );
}
