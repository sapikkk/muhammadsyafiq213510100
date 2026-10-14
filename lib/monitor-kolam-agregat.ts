import type {
  MonitorAgregatBaris,
  MonitorGrafikTitik,
  MonitorKelompokMode,
  MonitorLogBaris,
} from "@/lib/monitor-kolam-types";

function rata(sum: number, n: number): number {
  return n > 0 ? Math.round((sum / n) * 100) / 100 : 0;
}

function mulaiMingguIso(d: Date): string {
  const x = new Date(d);
  const day = x.getDay() || 7;
  x.setDate(x.getDate() - day + 1);
  return x.toISOString().slice(0, 10);
}

export function kunciPeriode(waktu: string, mode: MonitorKelompokMode): string {
  const d = new Date(waktu);
  if (mode === "hari") return d.toISOString().slice(0, 10);
  if (mode === "bulan") {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  return mulaiMingguIso(d);
}

export function labelPeriode(kunci: string, mode: MonitorKelompokMode): string {
  if (mode === "bulan") {
    const [y, m] = kunci.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    return d.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  }
  const d = new Date(`${kunci}T12:00:00`);
  if (mode === "minggu") {
    const akhir = new Date(d);
    akhir.setDate(akhir.getDate() + 6);
    const fmt: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return `${d.toLocaleDateString("id-ID", fmt)} – ${akhir.toLocaleDateString("id-ID", fmt)}`;
  }
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function keBarisLog(points: MonitorGrafikTitik[]): MonitorLogBaris[] {
  const fmt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return points.map((p) => ({
    id: `${p.kolamId}-${p.waktu}`,
    waktu: p.waktu,
    waktuLabel: fmt.format(new Date(p.waktu)),
    greenhouse: p.greenhouseNama,
    kolam: p.kolamNama,
    kolamId: p.kolamId,
    siklusLabel: p.siklusLabel,
    ph: p.ph,
    ppm: p.ppm,
    suhu: p.suhu,
  }));
}

export function agregatMonitor(
  points: MonitorGrafikTitik[],
  mode: MonitorKelompokMode,
): MonitorAgregatBaris[] {
  const acc = new Map<
    string,
    {
      periodeKey: string;
      greenhouse: string;
      kolam: string;
      kolamId: number;
      greenhouseId: number;
      ph: number;
      ppm: number;
      suhu: number;
      n: number;
    }
  >();

  for (const p of points) {
    const periodeKey = kunciPeriode(p.waktu, mode);
    const key = `${periodeKey}|${p.kolamId}`;
    const cur = acc.get(key);
    if (cur) {
      cur.ph += p.ph;
      cur.ppm += p.ppm;
      cur.suhu += p.suhu;
      cur.n += 1;
    } else {
      acc.set(key, {
        periodeKey,
        greenhouse: p.greenhouseNama,
        kolam: p.kolamNama,
        kolamId: p.kolamId,
        greenhouseId: p.greenhouseId,
        ph: p.ph,
        ppm: p.ppm,
        suhu: p.suhu,
        n: 1,
      });
    }
  }

  return Array.from(acc.values())
    .map((v) => ({
      id: `${v.periodeKey}|${v.kolamId}`,
      periodeLabel: labelPeriode(v.periodeKey, mode),
      periodeSort: v.periodeKey,
      greenhouse: v.greenhouse,
      kolam: v.kolam,
      kolamId: v.kolamId,
      greenhouseId: v.greenhouseId,
      jumlah: v.n,
      phRata: rata(v.ph, v.n),
      ppmRata: rata(v.ppm, v.n),
      suhuRata: rata(v.suhu, v.n),
    }))
    .sort((a, b) => {
      const byPeriod = b.periodeSort.localeCompare(a.periodeSort);
      if (byPeriod !== 0) return byPeriod;
      const byGh = a.greenhouse.localeCompare(b.greenhouse, "id");
      if (byGh !== 0) return byGh;
      return a.kolam.localeCompare(b.kolam, "id");
    });
}
