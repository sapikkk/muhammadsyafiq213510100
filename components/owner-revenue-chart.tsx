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
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { formatRupiah } from "@/lib/format";
import { useChartPalette } from "@/lib/chart-palette";

export function OwnerRevenueChart({ months }: { months: MonthPoint[] }) {
  const { primary, secondary } = useChartPalette();
  const data = months.map((m) => ({
    name: m.label,
    pendapatan: Number(m.pendapatan),
    pengeluaran: Number(m.pengeluaran),
  }));

  if (data.every((d) => d.pendapatan === 0 && d.pengeluaran === 0)) {
    return (
      <DashboardBentoEmpty
        message="Belum ada catatan disetujui dengan pendapatan atau beban pada 6 bulan terakhir."
        actionLabel="Lihat catatan keuangan"
        href="/owner/jurnal"
      />
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
          <Bar dataKey="pendapatan" name="Pendapatan" fill={primary} radius={[4, 4, 0, 0]} />
          <Bar dataKey="pengeluaran" name="Beban" fill={secondary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
