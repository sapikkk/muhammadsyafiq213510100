"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthPoint } from "@/lib/monthly-summary-types";
import { formatRupiah } from "@/lib/format";
import { CHART_PRIMARY, CHART_SECONDARY } from "@/lib/chart-monochrome";

export function OwnerRevenueChart({ months }: { months: MonthPoint[] }) {
  const data = months.map((m) => ({
    name: m.label,
    pendapatan: Number(m.pendapatan),
    pengeluaran: Number(m.pengeluaran),
  }));

  if (data.every((d) => d.pendapatan === 0 && d.pengeluaran === 0)) {
    return (
      <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
        Belum ada catatan keuangan sudah disetujui dengan pendapatan atau beban pada periode ini. Setujui jurnal
        penjualan untuk mengisi grafik.
      </p>
    );
  }

  return (
    <div className="h-56 w-full sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
          <Tooltip
            formatter={(value: number) => formatRupiah(String(value))}
            labelStyle={{ fontSize: 12 }}
          />
          <Legend />
          <Bar dataKey="pendapatan" name="Pendapatan" fill={CHART_PRIMARY} radius={[2, 2, 0, 0]} />
          <Bar dataKey="pengeluaran" name="Beban" fill={CHART_SECONDARY} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
