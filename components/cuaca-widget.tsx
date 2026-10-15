import { Droplets, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CuacaIkon } from "@/components/cuaca-ikon";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { fetchCuacaDashboard } from "@/lib/cuaca";
import { cn } from "@/lib/utils";

function CuacaKosong() {
  return (
    <Card className="p-3 sm:p-5">
      <p className="mb-2 text-sm font-medium">Cuaca</p>
      <DashboardBentoEmpty
        message="Data cuaca belum tersedia. Periksa koneksi atau koordinat kebun (WEATHER_LAT / WEATHER_LON)."
        actionLabel="Buka pengaturan"
        href="/pengaturan"
      />
    </Card>
  );
}

/** Cuaca kebun: `beranda` = muat satu layar bento; default = prakiraan 7 hari penuh. */
export async function CuacaWidget({ variant = "default" }: { variant?: "default" | "beranda" } = {}) {
  const data = await fetchCuacaDashboard();
  if (!data) {
    if (variant === "beranda") {
      return (
        <DashboardBentoEmpty
          message="Cuaca belum tersedia."
          actionLabel="Pengaturan"
          href="/pengaturan"
        />
      );
    }
    return <CuacaKosong />;
  }

  const { label, saatIni, tujuhHari } = data;
  const prakiraan = variant === "beranda" ? tujuhHari.slice(0, 4) : tujuhHari;

  if (variant === "beranda") {
    return (
      <div aria-label="Cuaca hari ini" className="flex min-h-0 flex-col gap-2">
        <div className="flex items-center gap-2">
          <CuacaIkon kode={saatIni.kodeCuaca} className="h-8 w-8 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] text-muted-foreground">{label}</p>
            <p className="text-xl font-semibold tabular-nums leading-none">{saatIni.suhuC}°C</p>
            <p className="truncate text-[11px] text-muted-foreground">{saatIni.deskripsi}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-1 text-right text-[10px] text-muted-foreground">
            <span className="inline-flex items-center justify-end gap-0.5 tabular-nums">
              <Droplets className="h-3 w-3" aria-hidden />
              {saatIni.kelembapan != null ? `${saatIni.kelembapan}%` : "—"}
            </span>
            <span className="inline-flex items-center justify-end gap-0.5 tabular-nums">
              <Wind className="h-3 w-3" aria-hidden />
              {saatIni.anginKmh != null ? `${saatIni.anginKmh} km/j` : "—"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1 max-[340px]:grid-cols-2 max-[340px]:gap-1.5">
          {prakiraan.map((hari, i) => (
            <div
              key={hari.tanggal}
              title={hari.deskripsi}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md border border-border/80 p-1 text-center",
                i === 0 && "bg-muted/30",
              )}
            >
              <p className="text-[9px] font-medium leading-none">{hari.label}</p>
              <CuacaIkon kode={hari.kodeCuaca} className="h-4 w-4" />
              <p className="text-[9px] tabular-nums">
                {hari.suhuMax}° <span className="text-muted-foreground">{hari.suhuMin}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Cuaca 7 hari" className="space-y-2 sm:space-y-3">
      <div className="flex flex-wrap items-stretch gap-2">
        <Card className="flex min-w-[9rem] flex-1 items-center gap-2 p-2.5 sm:gap-4 sm:p-4">
          <CuacaIkon kode={saatIni.kodeCuaca} className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" />
          <div className="min-w-0">
            <p className="truncate text-[11px] text-muted-foreground sm:text-sm">{label}</p>
            <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
              {saatIni.suhuC}°C
            </p>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{saatIni.deskripsi}</p>
          </div>
        </Card>

        <div className="flex shrink-0 gap-2">
          <Card className="flex w-[4.75rem] flex-col items-center justify-center gap-0.5 p-2 sm:w-auto sm:flex-row sm:gap-3 sm:p-3">
            <Droplets className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" aria-hidden />
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-muted-foreground sm:text-xs">Lembap</p>
              <p className="text-sm font-semibold tabular-nums sm:text-base">
                {saatIni.kelembapan != null ? `${saatIni.kelembapan}%` : "—"}
              </p>
            </div>
          </Card>
          <Card className="flex w-[4.75rem] flex-col items-center justify-center gap-0.5 p-2 sm:w-auto sm:flex-row sm:gap-3 sm:p-3">
            <Wind className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" aria-hidden />
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-muted-foreground sm:text-xs">Angin</p>
              <p className="text-sm font-semibold tabular-nums sm:text-base">
                {saatIni.anginKmh != null ? `${saatIni.anginKmh}` : "—"}
              </p>
              <p className="hidden text-[10px] text-muted-foreground sm:block">km/j</p>
            </div>
          </Card>
        </div>
      </div>

      <div
        className={cn(
          "flex gap-1.5 overflow-x-auto pb-0.5 snap-x snap-mandatory sm:grid sm:grid-cols-7 sm:gap-2 sm:overflow-visible sm:pb-0",
          "[scrollbar-width:thin]",
        )}
      >
        {prakiraan.map((hari, i) => (
          <Card
            key={hari.tanggal}
            title={hari.deskripsi}
            className={cn(
              "flex min-w-[3.6rem] shrink-0 snap-start flex-col items-center gap-0.5 p-1.5 text-center sm:min-w-0 sm:shrink sm:p-2.5",
              i === 0 && "bg-muted/25 ring-1 ring-border",
            )}
          >
            <p className="text-[10px] font-medium leading-none sm:text-xs">{hari.label}</p>
            <CuacaIkon kode={hari.kodeCuaca} className="h-5 w-5 sm:h-6 sm:w-6" />
            <p className="text-[10px] tabular-nums sm:text-xs">
              {hari.suhuMax}°{" "}
              <span className="text-muted-foreground">{hari.suhuMin}°</span>
            </p>
            {hari.probHujanPct != null && hari.probHujanPct >= 25 ? (
              <p className="hidden text-[10px] leading-tight text-muted-foreground min-[400px]:block">
                {hari.probHujanPct}%
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}
