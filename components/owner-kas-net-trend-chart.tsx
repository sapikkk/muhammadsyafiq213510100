"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartPalette } from "@/lib/chart-palette";
import { formatRupiah } from "@/lib/format";

export function OwnerKasNetTrendChart({
  points,
}: {
  points: { label: string; net: string }[];
}) {
  const { primary, secondary } = useChartPalette();
  const data = points.map((p) => ({ name: p.label, net: Number(p.net) }));
  if (data.every((d) => d.net === 0)) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Belum ada pergerakan kas tercatat. Catat penjualan dan beban di modul keuangan.
      </p>
    );
  }

  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} width={40} />
          <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
          <Line
            type="monotone"
            dataKey="net"
            name="Net operasi"
            stroke={primary}
            strokeWidth={2}
            dot={{ r: 3, fill: primary, stroke: secondary }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
