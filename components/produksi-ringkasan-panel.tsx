import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { MetricCards } from "@/components/metric-cards";
import { MonochromeProgressBar } from "@/components/monochrome-progress-bar";
import { METRIC_ICON_BY_ID, metricIconForFaseLabel } from "@/lib/metric-icons";
import type { ProduksiRingkasan } from "@/lib/produksi-kapasitas-types";

export function ProduksiRingkasanPanel({
  data,
  showKapasitasBar = true,
  metricsVariant = "default",
  kolamSetupHref,
  kolamSetupLabel = "Atur lahan dan kolam",
}: {
  data: ProduksiRingkasan;
  showKapasitasBar?: boolean;
  metricsVariant?: "default" | "compact";
  /** Jika kapasitas nol, tampilkan pesan + tombol ke halaman ini. */
  kolamSetupHref?: string;
  kolamSetupLabel?: string;
}) {
  const k = data.kapasitas;

  if (k.totalLubang <= 0 && kolamSetupHref) {
    return (
      <DashboardBentoEmpty
        message="Belum ada lubang kolam. Atur infrastruktur dulu agar ringkasan tanam muncul."
        actionLabel={kolamSetupLabel}
        href={kolamSetupHref}
      />
    );
  }

  return (
    <div className="space-y-4">
      {showKapasitasBar ? (
        <MonochromeProgressBar
          label="Lubang terisi"
          hint={`${k.pctTerisi}% terisi · ${k.lubangKosong.toLocaleString("id-ID")} lubang masih kosong`}
          value={k.pctTerisi}
        />
      ) : null}

      <MetricCards
        variant={metricsVariant}
        columns={metricsVariant === "compact" ? 3 : 2}
        items={[
          ...data.fase.map((f) => ({
            id: `fase-${f.fase}`,
            icon: metricIconForFaseLabel(f.label),
            label: f.label,
            value: f.lubang.toLocaleString("id-ID"),
            hint: `${f.jumlahBatch} batch`,
          })),
          {
            id: "siap-jual",
            icon: METRIC_ICON_BY_ID["siap-jual"],
            label: "Siap jual",
            value: data.siapJualLubang.toLocaleString("id-ID"),
            hint: "Lubang layak jual, belum dipesan",
          },
        ]}
      />
    </div>
  );
}
