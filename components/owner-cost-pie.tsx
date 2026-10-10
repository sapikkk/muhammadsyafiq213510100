"use client";

import Link from "next/link";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CostSlice } from "@/lib/cost-breakdown-types";
import { formatRupiah } from "@/lib/format";

const COLORS = [
  "hsl(0 0% 9%)",
  "hsl(0 0% 25%)",
  "hsl(0 0% 40%)",
  "hsl(0 0% 55%)",
  "hsl(0 0% 70%)",
  "hsl(0 0% 85%)",
  "hsl(0 0% 92%)",
];

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
    name: `${s.kode} ${s.nama}`,
    value: Number(s.total),
    akunId: s.akunId,
  }));

  if (data.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
        Belum ada beban tercatat di jurnal APPROVED untuk periode ini.
      </p>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.akunId}
                fill={COLORS[i % COLORS.length]}
                stroke={selectedAkunId === entry.akunId ? "hsl(var(--foreground))" : undefined}
                strokeWidth={selectedAkunId === entry.akunId ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-4 space-y-1 text-sm">
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
              {s.kode} {s.nama} — {formatRupiah(s.total)} ({s.persen.toFixed(1)}%)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
