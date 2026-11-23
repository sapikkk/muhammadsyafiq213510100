import { CHART_PRIMARY, CHART_SECONDARY, CHART_TERTIARY } from "@/lib/chart-monochrome";
import type { TitikRiwayatKolam } from "@/lib/petani-kolam-papan-types";

function polyline(values: number[], w: number, h: number): string {
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = values.length === 1 ? w / 2 : (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function KolamRiwayatSpark({ riwayat }: { riwayat: TitikRiwayatKolam[] }) {
  if (riwayat.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada catat air.</p>;
  }
  const w = 220;
  const h = 56;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" role="img" aria-label="Riwayat pH, PPM, suhu">
      <polyline fill="none" stroke={CHART_PRIMARY} strokeWidth="1.5" points={polyline(riwayat.map((r) => r.ph), w, h)} />
      <polyline fill="none" stroke={CHART_SECONDARY} strokeWidth="1.5" points={polyline(riwayat.map((r) => r.ppm), w, h)} />
      <polyline fill="none" stroke={CHART_TERTIARY} strokeWidth="1.5" points={polyline(riwayat.map((r) => r.suhu), w, h)} />
    </svg>
  );
}
