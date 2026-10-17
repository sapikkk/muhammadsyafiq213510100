"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/chart-card";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { useChartPalette } from "@/lib/chart-palette";

type ChartPayload = {
  harian: { label: string; ppm: number; ph: number; suhu: number }[];
  bandingKolam: {
    kolam: string;
    greenhouse: string;
    ppm: number;
    ph: number;
    suhu: number;
    jumlah: number;
  }[];
};

/** Grafik monitor kolam — pakai filter yang sama dengan tabel (tanpa paginasi). */
export function MonitorKolamDiagramView({
  filterQuery,
  emptyHref,
  compact = false,
}: {
  filterQuery: string;
  emptyHref: string;
  compact?: boolean;
}) {
  const { primary, secondary, tertiary } = useChartPalette();
  const [data, setData] = useState<ChartPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/monitor-kolam/chart?${filterQuery}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [filterQuery]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Memuat diagram…</p>;
  }

  if (!data?.harian.length && !data?.bandingKolam.length) {
    return (
      <DashboardBentoEmpty
        message="Belum ada data untuk diagram pada filter ini."
        actionLabel="Atur kolam"
        href={emptyHref}
      />
    );
  }

  const banding = data.bandingKolam.map((r) => ({
    name: `${r.greenhouse} · ${r.kolam}`,
    ppm: r.ppm,
    ph: r.ph,
    suhu: r.suhu,
  }));

  const chartHeight = compact ? "h-48" : "h-56";

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <ChartCard title="Trend harian (rata-rata)">
        {data.harian.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada titik harian.</p>
        ) : (
          <div className={`${chartHeight} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.harian} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="ppm" tick={{ fontSize: 10 }} width={32} />
                <YAxis
                  yAxisId="ph"
                  orientation="right"
                  domain={[0, 14]}
                  tick={{ fontSize: 10 }}
                  width={28}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="ppm"
                  type="monotone"
                  dataKey="ppm"
                  name="PPM"
                  stroke={primary}
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="ph"
                  type="monotone"
                  dataKey="ph"
                  name="pH"
                  stroke={secondary}
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="ppm"
                  type="monotone"
                  dataKey="suhu"
                  name="Suhu (°C)"
                  stroke={tertiary}
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </ChartCard>

      <ChartCard title="Perbandingan kolam (PPM rata-rata)">
        {banding.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada perbandingan kolam.</p>
        ) : (
          <div className={`${chartHeight} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={banding} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={64}
                />
                <YAxis tick={{ fontSize: 10 }} width={36} />
                <Tooltip />
                <Bar dataKey="ppm" name="PPM rata-rata" fill={primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ChartCard>
    </div>
  );
}
