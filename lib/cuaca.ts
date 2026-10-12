import "server-only";

export type CuacaRingkas = {
  label: string;
  suhuC: number;
  kodeCuaca: number;
  deskripsi: string;
  kelembapan?: number;
  anginKmh?: number;
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

function deskripsiCuaca(code: number): string {
  return WMO[code] ?? "Cuaca tidak diketahui";
}

function parseCoord(raw: string | undefined, fallback: number): number {
  if (!raw?.trim()) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Open-Meteo (gratis). Untuk Google Weather API, ganti implementasi fetch di sini. */
export async function fetchCuacaLokal(): Promise<CuacaRingkas | null> {
  const lat = parseCoord(process.env.WEATHER_LAT, -6.2);
  const lon = parseCoord(process.env.WEATHER_LON, 106.8);
  const label = process.env.WEATHER_LABEL?.trim() || "Lokasi kebun";

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m");
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
    };
    const cur = json.current;
    if (!cur || cur.temperature_2m == null || cur.weather_code == null) return null;
    return {
      label,
      suhuC: Math.round(cur.temperature_2m * 10) / 10,
      kodeCuaca: cur.weather_code,
      deskripsi: deskripsiCuaca(cur.weather_code),
      kelembapan: cur.relative_humidity_2m,
      anginKmh: cur.wind_speed_10m,
    };
  } catch {
    return null;
  }
}
