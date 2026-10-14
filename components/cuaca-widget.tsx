import { Droplets, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CuacaIkon } from "@/components/cuaca-ikon";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { fetchCuacaDashboard } from "@/lib/cuaca";
import { cn } from "@/lib/utils";

function CuacaKosong() {
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm font-medium">Cuaca</p>
      <DashboardBentoEmpty
        message="Data cuaca belum tersedia. Periksa koneksi atau koordinat kebun (WEATHER_LAT / WEATHER_LON)."
        actionLabel="Buka pengaturan"
        href="/pengaturan"
      />
    </Card>
  );
}

/** Cuaca kebun: hari ini + prakiraan 7 hari (Open-Meteo), layout bento. */
export async function CuacaWidget() {
  const data = await fetchCuacaDashboard();
  if (!data) return <CuacaKosong />;

  const { label, saatIni, tujuhHari } = data;
  const suhuMinggu = tujuhHari.flatMap((h) => [h.suhuMin, h.suhuMax]);
  const suhuTerendah = suhuMinggu.length ? Math.min(...suhuMinggu) : null;
  const suhuTertinggi = suhuMinggu.length ? Math.max(...suhuMinggu) : null;

  return (
    <section aria-label="Cuaca 7 hari" className="grid gap-3 lg:grid-cols-6">
      <Card className="flex flex-col justify-between gap-4 p-5 sm:col-span-2 lg:col-span-4 lg:min-h-[9.5rem]">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex flex-wrap items-center gap-4">
          <CuacaIkon kode={saatIni.kodeCuaca} className="h-12 w-12" />
          <div className="min-w-0">
            <p className="text-3xl font-semibold tabular-nums tracking-tight">
              {saatIni.suhuC}°C
            </p>
            <p className="text-sm text-muted-foreground">{saatIni.deskripsi}</p>
          </div>
        </div>
        {suhuTerendah != null && suhuTertinggi != null ? (
          <p className="text-xs text-muted-foreground">
            Prakiraan 7 hari: {suhuTerendah}° sampai {suhuTertinggi}°
          </p>
        ) : null}
      </Card>

      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
        <Card className="flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/30">
            <Droplets className="h-4 w-4 text-muted-foreground" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Kelembapan</p>
            <p className="text-lg font-semibold tabular-nums">
              {saatIni.kelembapan != null ? `${saatIni.kelembapan}%` : "—"}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/30">
            <Wind className="h-4 w-4 text-muted-foreground" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Angin</p>
            <p className="text-lg font-semibold tabular-nums">
              {saatIni.anginKmh != null ? `${saatIni.anginKmh} km/j` : "—"}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-4 lg:col-span-6 lg:grid-cols-7">
        {tujuhHari.map((hari, i) => (
          <Card
            key={hari.tanggal}
            title={hari.deskripsi}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 text-center",
              i === 0 && "bg-muted/25 ring-1 ring-border",
            )}
          >
            <p className="text-xs font-medium leading-none">{hari.label}</p>
            <CuacaIkon kode={hari.kodeCuaca} className="h-6 w-6" />
            <p className="text-xs tabular-nums text-foreground">
              {hari.suhuMax}°{" "}
              <span className="text-muted-foreground">{hari.suhuMin}°</span>
            </p>
            {hari.probHujanPct != null && hari.probHujanPct >= 25 ? (
              <p className="text-[10px] leading-tight text-muted-foreground">
                Hujan {hari.probHujanPct}%
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}
