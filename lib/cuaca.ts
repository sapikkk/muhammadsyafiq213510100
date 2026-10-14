import "server-only";

export type CuacaRingkas = {
  label: string;
  suhuC: number;
  kodeCuaca: number;
  deskripsi: string;
  kelembapan?: number;
  anginKmh?: number;
};

export type CuacaHari = {
  tanggal: string;
  label: string;
  suhuMin: number;
  suhuMax: number;
  kodeCuaca: number;
  deskripsi: string;
  probHujanPct?: number;
};

export type CuacaDashboard = {
  label: string;
  saatIni: Omit<CuacaRingkas, "label">;
  tujuhHari: CuacaHari[];
};

const WMO: Record<number, string> = {
  0: "Cerah",
  1: "Sebagian cerah",
  2: "Berawan",
  3: "Mendung",
  45: "Berkabut",
  48: "Berkabut tebal",
  51: "Gerimis ringan",
  53: "Gerimis",
  55: "Gerimis lebat",
  61: "Hujan ringan",
  63: "Hujan",
  65: "Hujan lebat",
  80: "Hujan lokal",
  95: "Badai petir",
};

export function deskripsiCuaca(code: number): string {
  return WMO[code] ?? "Cuaca tidak diketahui";
}

function parseCoord(raw: string | undefined, fallback: number): number {
  if (!raw?.trim()) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function labelHariCuaca(tanggal: string, indeks: number): string {
  if (indeks === 0) return "Hari ini";
  const d = new Date(`${tanggal}T12:00:00+07:00`);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

function bulatSuhu(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Open-Meteo (gratis). Atur WEATHER_LAT, WEATHER_LON, WEATHER_LABEL. */
export async function fetchCuacaDashboard(): Promise<CuacaDashboard | null> {
  const lat = parseCoord(process.env.WEATHER_LAT, -6.2);
  const lon = parseCoord(process.env.WEATHER_LON, 106.8);
  const label = process.env.WEATHER_LABEL?.trim() || "Lokasi kebun";

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "Asia/Jakarta");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 900 } });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      current?: {
        temperature_2m?: number;
        weather_code?: number;
        relative_humidity_2m?: number;
        wind_speed_10m?: number;
      };
      daily?: {
        time?: string[];
        weather_code?: number[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        precipitation_probability_max?: number[];
      };
    };
    const cur = json.current;
    const daily = json.daily;
    if (!cur || cur.temperature_2m == null || cur.weather_code == null) return null;
    if (!daily?.time?.length) return null;

    const tujuhHari: CuacaHari[] = daily.time.slice(0, 7).map((tanggal, i) => {
      const kode = daily.weather_code?.[i] ?? 0;
      const min = daily.temperature_2m_min?.[i];
      const max = daily.temperature_2m_max?.[i];
      const prob = daily.precipitation_probability_max?.[i];
      return {
        tanggal,
        label: labelHariCuaca(tanggal, i),
        suhuMin: min != null ? bulatSuhu(min) : 0,
        suhuMax: max != null ? bulatSuhu(max) : 0,
        kodeCuaca: kode,
        deskripsi: deskripsiCuaca(kode),
        probHujanPct: prob != null ? Math.round(prob) : undefined,
      };
    });

    return {
      label,
      saatIni: {
        suhuC: bulatSuhu(cur.temperature_2m),
        kodeCuaca: cur.weather_code,
        deskripsi: deskripsiCuaca(cur.weather_code),
        kelembapan: cur.relative_humidity_2m,
        anginKmh: cur.wind_speed_10m,
      },
      tujuhHari,
    };
  } catch {
    return null;
  }
}

export async function fetchCuacaLokal(): Promise<CuacaRingkas | null> {
  const paket = await fetchCuacaDashboard();
  if (!paket) return null;
  return { label: paket.label, ...paket.saatIni };
}
