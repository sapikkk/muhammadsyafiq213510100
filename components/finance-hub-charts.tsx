"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/chart-card";
import type { FinanceHubStats } from "@/lib/finance-hub-stats";
import { CHART_PRIMARY, CHART_SECONDARY, chartFillAt } from "@/lib/chart-monochrome";
import { formatRupiah } from "@/lib/format";
import type { MonthPoint } from "@/lib/monthly-summary-types";

type Props = {
  role: "ADMIN" | "OWNER";
  stats: FinanceHubStats;
  pendapatanBulanIni?: number | string;
  pengeluaranBulanIni?: number | string;
  monthTrend?: MonthPoint[];
};

export function FinanceHubCharts({
  role,
  stats,
  pendapatanBulanIni,
  pengeluaranBulanIni,
  monthTrend = [],
}: Props) {
  const counts = [
    { name: "Catatan", jumlah: stats.catatanBulanIni },
    { name: "Menunggu", jumlah: stats.jurnalMenunggu },
    { name: "Piutang", jumlah: stats.pesananPiutang },
  ];

  const pend = Number(pendapatanBulanIni ?? 0);
  const beban = Number(pengeluaranBulanIni ?? 0);
  const bulanIni =
    pend > 0 || beban > 0
      ? [
          { name: "Pendapatan", value: pend },
          { name: "Beban", value: beban },
        ]
      : [];

  const trend = monthTrend.map((m) => ({
    name: m.label,
    pendapatan: Number(m.pendapatan),
    beban: Number(m.pengeluaran),
  }));
  const hasTrend = trend.some((d) => d.pendapatan > 0 || d.beban > 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Aktivitas bulan ini">
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={counts} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={32} />
              <Tooltip />
              <Bar dataKey="jumlah" name="Jumlah" radius={[2, 2, 0, 0]}>
                {counts.map((_, i) => (
                  <Cell key={i} fill={chartFillAt(i)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {role === "OWNER" && bulanIni.length > 0 ? (
        <ChartCard title="Pendapatan vs beban (bulan ini)">
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bulanIni}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                >
                  {bulanIni.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? CHART_PRIMARY : CHART_SECONDARY} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      ) : null}

      {hasTrend ? (
        <ChartCard
          title="Tren 6 bulan"
          className={role === "OWNER" && bulanIni.length > 0 ? "lg:col-span-2" : "lg:col-span-2"}
        >
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} width={36} />
                <Tooltip formatter={(v: number) => formatRupiah(String(v))} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pendapatan"
                  name="Pendapatan"
                  stroke={CHART_PRIMARY}
                  strokeWidth={2}
                  dot={{ r: 3, fill: CHART_PRIMARY }}
                />
                <Line
                  type="monotone"
                  dataKey="beban"
                  name="Beban"
                  stroke={CHART_SECONDARY}
                  strokeWidth={2}
                  dot={{ r: 3, fill: CHART_SECONDARY }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      ) : null}
    </div>
  );
}
