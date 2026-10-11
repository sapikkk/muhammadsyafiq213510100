import { MetricRowsTable } from "@/components/metric-rows-table";
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
    <MetricRowsTable
      caption="KPI keuangan dan produksi bulan ini"
      rows={[
        { label: "Pendapatan bulan ini", value: formatRupiah(pendapatan) },
        { label: "Beban bulan ini", value: formatRupiah(pengeluaran) },
        {
          label: "Laba kasar",
          value: formatRupiah(labaKasar),
          hint: "Pendapatan − beban (akun 4xxx / 5xxx)",
        },
        {
          label: "HPP rata-rata per lubang",
          value: batchPanenApproved > 0 ? formatRupiah(avgHppPerLubang) : "—",
          hint: `v2-G.1 · ${batchPanenApproved} batch panen APPROVED`,
        },
        {
          label: "Yield rata-rata",
          value: batchPanenApproved > 0 ? `${avgYieldPct}%` : "—",
          hint: "Lubang layak ÷ jumlah disemai",
        },
      ]}
    />
  );
}
