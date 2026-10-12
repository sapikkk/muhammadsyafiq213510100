"use client";

import dynamic from "next/dynamic";
import type { MonitorGrafikTitik } from "@/lib/monitor-kolam-types";

function ChartSkeleton() {
  return (
    <div
      className="flex h-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
      aria-busy="true"
    >
      Memuat grafik…
    </div>
  );
}

const PetaniMonitorChartInner = dynamic(
  () =>
    import("@/components/petani-monitor-chart").then((mod) => ({
      default: mod.PetaniMonitorChart,
    })),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

export function PetaniMonitorChartLazy({ points }: { points: MonitorGrafikTitik[] }) {
  return <PetaniMonitorChartInner points={points} />;
}
