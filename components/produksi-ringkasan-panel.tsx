import { MetricCards } from "@/components/metric-cards";
import { MonochromeProgressBar } from "@/components/monochrome-progress-bar";
import type { ProduksiRingkasan } from "@/lib/produksi-kapasitas-types";

export function ProduksiRingkasanPanel({
  data,
  showKapasitasBar = true,
}: {
  data: ProduksiRingkasan;
  showKapasitasBar?: boolean;
}) {
  const k = data.kapasitas;

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
        columns={2}
        items={[
          ...data.fase.map((f) => ({
            id: `fase-${f.fase}`,
            label: f.label,
            value: f.lubang.toLocaleString("id-ID"),
            hint: `${f.jumlahBatch} batch`,
          })),
          {
            id: "siap-jual",
            label: "Siap jual",
            value: data.siapJualLubang.toLocaleString("id-ID"),
            hint: "Lubang layak jual, belum dipesan",
          },
        ]}
      />
    </div>
  );
}
