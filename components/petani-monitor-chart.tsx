"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonitorGrafikTitik } from "@/lib/monitor-kolam-types";

export function PetaniMonitorChart({ points }: { points: MonitorGrafikTitik[] }) {
  if (points.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
        Belum ada catatan monitor kolam. Buka Siklus → filter kolam → Monitor kolam hari ini.
      </p>
    );
  }

  const data = points.map((p) => ({
    name: p.label,
    ppm: p.ppm,
    ph: p.ph,
    suhu: p.suhu,
    kolam: p.kolam,
    batch: p.siklusKode,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis yAxisId="ppm" tick={{ fontSize: 10 }} width={36} />
          <YAxis
            yAxisId="ph"
            orientation="right"
            tick={{ fontSize: 10 }}
            width={28}
            domain={[0, 14]}
          />
          <YAxis
            yAxisId="suhu"
            orientation="right"
            tick={{ fontSize: 10 }}
            width={32}
            dx={28}
            domain={["auto", "auto"]}
          />
          <Tooltip
            labelStyle={{ fontSize: 12 }}
            formatter={(value: number, key: string) => {
              if (key === "suhu") return [`${value} °C`, "Suhu"];
              if (key === "ph") return [value, "pH"];
              return [value, "PPM"];
            }}
            labelFormatter={(_, payload) => {
              const row = payload?.[0]?.payload as { kolam?: string; batch?: string } | undefined;
              if (!row) return "";
              return `${row.batch} · ${row.kolam}`;
            }}
          />
          <Legend />
          <Line yAxisId="ppm" type="monotone" dataKey="ppm" name="PPM" stroke="hsl(142 76% 36%)" dot={false} strokeWidth={2} />
          <Line yAxisId="ph" type="monotone" dataKey="ph" name="pH" stroke="hsl(221 83% 53%)" dot={false} strokeWidth={2} />
          <Line
            yAxisId="suhu"
            type="monotone"
            dataKey="suhu"
            name="Suhu (°C)"
            stroke="hsl(25 95% 53%)"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
