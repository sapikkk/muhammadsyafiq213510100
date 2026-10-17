"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "@/components/chart-card";
import { useChartPalette } from "@/lib/chart-palette";
import { formatRupiah } from "@/lib/format";

export function CashFlowSummaryChart({
  sections,
}: {
  sections: { label: string; net: string | number }[];
}) {
  const { fillAt } = useChartPalette();
  const data = sections.map((s) => ({
    name: s.label,
    net: Number(s.net),
  }));

  if (data.every((d) => d.net === 0)) return null;

  return (
    <ChartCard title="Arus bersih per kategori">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} width={36} />
            <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
            <Bar dataKey="net" name="Net" radius={[2, 2, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={fillAt(i)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
