import { MetricCards } from "@/components/metric-cards";
import { formatRupiah } from "@/lib/format";

export function OwnerKpiCards({
  pendapatan,
  pengeluaran,
  labaKasar,
  batchPanenApproved,
  avgHppPerLubang,
  avgYieldPct,
}: {
  pendapatan: string;
  pengeluaran: string;
  labaKasar: string;
  batchPanenApproved: number;
  avgHppPerLubang: string;
  avgYieldPct: string;
}) {
  return (
    <MetricCards
      columns={3}
      items={[
        { label: "Pendapatan bulan ini", value: formatRupiah(pendapatan) },
        { label: "Beban bulan ini", value: formatRupiah(pengeluaran) },
        { label: "Laba kasar", value: formatRupiah(labaKasar) },
        {
          label: "HPP rata-rata per lubang",
          value: batchPanenApproved > 0 ? formatRupiah(avgHppPerLubang) : "—",
        },
        {
          label: "Hasil panen rata-rata",
          value: batchPanenApproved > 0 ? `${avgYieldPct}%` : "—",
        },
      ]}
    />
  );
}
