import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchCuacaLokal } from "@/lib/cuaca";

function CuacaIkon({ kode }: { kode: number }) {
  if (kode === 0 || kode === 1) return <Sun className="h-8 w-8" aria-hidden />;
  if (kode >= 61 && kode <= 65) return <CloudRain className="h-8 w-8" aria-hidden />;
  if (kode === 2 || kode === 3) return <Cloud className="h-8 w-8" aria-hidden />;
  return <CloudSun className="h-8 w-8" aria-hidden />;
}

/** Cuaca lokal kebun (Open-Meteo). Atur koordinat lewat WEATHER_LAT / WEATHER_LON. */
export async function CuacaWidget() {
  const cuaca = await fetchCuacaLokal();
  if (!cuaca) {
    return (
      <Card className="flex items-center gap-3 p-4 shadow-none">
        <CloudSun className="h-8 w-8 text-muted-foreground" aria-hidden />
        <div>
          <p className="text-sm font-medium">Cuaca</p>
          <p className="text-xs text-muted-foreground">Data cuaca belum tersedia.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex items-center gap-4 p-4 shadow-none">
      <CuacaIkon kode={cuaca.kodeCuaca} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{cuaca.label}</p>
        <p className="text-2xl font-semibold tabular-nums">{cuaca.suhuC}°C</p>
        <p className="text-xs text-muted-foreground">{cuaca.deskripsi}</p>
      </div>
      {cuaca.kelembapan != null ? (
        <p className="text-xs text-muted-foreground">Lembap {cuaca.kelembapan}%</p>
      ) : null}
    </Card>
  );
}
