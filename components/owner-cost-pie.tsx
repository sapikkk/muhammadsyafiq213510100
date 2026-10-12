"use client";

import Link from "next/link";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CostSlice } from "@/lib/cost-breakdown-types";
import { formatRupiah } from "@/lib/format";

import { ChartCard } from "@/components/chart-card";
import { chartFillAt } from "@/lib/chart-monochrome";

export function OwnerCostPie({
  slices,
  selectedAkunId,
  baseQuery,
}: {
  slices: CostSlice[];
  selectedAkunId: number | null;
  baseQuery: string;
}) {
  const data = slices.map((s) => ({
    name: s.nama,
    value: Number(s.total),
    akunId: s.akunId,
  }));

  if (data.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
        Belum ada beban tercatat di catatan keuangan sudah disetujui untuk periode ini.
      </p>
    );
  }

  return (
    <ChartCard title="Bagian beban per akun">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={68}
              paddingAngle={1}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.akunId}
                  fill={chartFillAt(i)}
                  stroke={selectedAkunId === entry.akunId ? "hsl(var(--foreground))" : undefined}
                  strokeWidth={selectedAkunId === entry.akunId ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-3 max-h-32 space-y-1 overflow-y-auto text-sm">
        {slices.map((s) => (
          <li key={s.akunId}>
            <Link
              href={`/owner/biaya?${baseQuery}&akunId=${s.akunId}`}
              className={
                selectedAkunId === s.akunId
                  ? "font-medium text-primary underline"
                  : "text-muted-foreground hover:text-foreground hover:underline"
              }
            >
              {s.nama} · {formatRupiah(s.total)} ({s.persen.toFixed(1)}%)
            </Link>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
