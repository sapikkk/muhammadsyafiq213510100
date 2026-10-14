"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/chart-card";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import type { FaseMetrikBaris } from "@/lib/produksi-kapasitas-types";
import { CHART_PRIMARY } from "@/lib/chart-monochrome";

export function DashboardProduksiFaseChart({
  fase,
  siapJual,
  kolamSetupHref,
}: {
  fase: FaseMetrikBaris[];
  siapJual: number;
  kolamSetupHref: string;
}) {
  const data = [
    ...fase.map((f) => ({
      name: f.label,
      lubang: f.lubang,
    })),
    { name: "Siap jual", lubang: siapJual },
  ].filter((d) => d.lubang > 0);

  if (data.length === 0) {
    return (
      <ChartCard title="Lubang per fase">
        <DashboardBentoEmpty
          message="Belum ada lubang terisi per fase."
          actionLabel="Atur kolam"
          href={kolamSetupHref}
        />
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Lubang per fase">
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={56} />
            <YAxis tick={{ fontSize: 10 }} width={36} />
            <Tooltip formatter={(v: number) => [v.toLocaleString("id-ID"), "Lubang"]} />
            <Bar dataKey="lubang" name="Lubang" fill={CHART_PRIMARY} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
