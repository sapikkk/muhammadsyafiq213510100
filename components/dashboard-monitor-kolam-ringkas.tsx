import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";

export function DashboardMonitorKolamRingkas({ rows }: { rows: MonitorLogBaris[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Belum ada catatan monitor kolam.</p>
    );
  }

  return (
    <div className="-mx-0.5 overflow-x-auto rounded-md border">
      <table className="w-full min-w-[20rem] text-left text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-2 py-1.5 font-semibold">Rumah kaca</th>
            <th className="px-2 py-1.5 font-semibold">Kolam</th>
            <th className="px-2 py-1.5 font-semibold tabular-nums">PPM</th>
            <th className="px-2 py-1.5 font-semibold tabular-nums">pH</th>
            <th className="px-2 py-1.5 font-semibold tabular-nums">Suhu</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/80 odd:bg-muted/10">
              <td className="max-w-[5rem] truncate px-2 py-1.5">{r.greenhouse}</td>
              <td className="max-w-[4.5rem] truncate px-2 py-1.5">{r.kolam}</td>
              <td className="px-2 py-1.5 tabular-nums">{r.ppm.toLocaleString("id-ID")}</td>
              <td className="px-2 py-1.5 tabular-nums">{r.ph.toLocaleString("id-ID")}</td>
              <td className="px-2 py-1.5 tabular-nums">{r.suhu.toLocaleString("id-ID")}°</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
