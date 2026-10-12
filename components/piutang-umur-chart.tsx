"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "@/components/chart-card";
import { MetricCards } from "@/components/metric-cards";
import { chartFillAt } from "@/lib/chart-monochrome";
import { formatRupiah } from "@/lib/format";
import { labelUmurPiutang } from "@/lib/piutang-penjualan-types";

export function PiutangRingkasanPanel({
  byUmur,
  totalPiutang,
}: {
  byUmur: Record<string, string>;
  totalPiutang: string;
}) {
  const keys = Object.keys(labelUmurPiutang) as (keyof typeof labelUmurPiutang)[];
  const slices = keys
    .map((key) => ({
      name: labelUmurPiutang[key],
      value: Number(byUmur[key] ?? 0),
    }))
    .filter((s) => s.value > 0);

  const cards = keys.map((key) => ({
    label: labelUmurPiutang[key],
    value: formatRupiah(byUmur[key] ?? "0"),
  }));
  cards.push({ label: "Total piutang", value: formatRupiah(totalPiutang) });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MetricCards items={cards} columns={2} />
      {slices.length > 0 ? (
        <ChartCard title="Piutang per umur">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {slices.map((_, i) => (
                    <Cell key={i} fill={chartFillAt(i)} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      ) : null}
    </div>
  );
}
