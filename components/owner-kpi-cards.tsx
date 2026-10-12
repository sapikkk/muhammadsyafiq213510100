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
      caption="Ringkasan keuangan dan produksi bulan ini"
      rows={[
        { label: "Pendapatan bulan ini", value: formatRupiah(pendapatan) },
        { label: "Beban bulan ini", value: formatRupiah(pengeluaran) },
        {
          label: "Laba kasar",
          value: formatRupiah(labaKasar),
          hint: "Pendapatan dikurangi beban bulan ini",
        },
        {
          label: "Biaya produksi rata-rata per lubang",
          value: batchPanenApproved > 0 ? formatRupiah(avgHppPerLubang) : "—",
          hint:
            batchPanenApproved > 0
              ? `Dari ${batchPanenApproved} batch panen yang sudah disetujui`
              : "Belum ada panen disetujui bulan ini",
        },
        {
          label: "Hasil panen rata-rata",
          value: batchPanenApproved > 0 ? `${avgYieldPct}%` : "—",
          hint: "Persen lubang layak jual dari yang disemai",
        },
      ]}
    />
  );
}
