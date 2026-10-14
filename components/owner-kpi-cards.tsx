import { MetricCards } from "@/components/metric-cards";
import { formatRupiah } from "@/lib/format";

const JURNAL_HREF = "/owner/jurnal";
const PRODUKSI_HREF = "/owner/produksi";

function keuanganKosong(pendapatan: string, pengeluaran: string): boolean {
  return Number(pendapatan) === 0 && Number(pengeluaran) === 0;
}

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
  const keuanganBelumAda = keuanganKosong(pendapatan, pengeluaran);

  return (
    <MetricCards
      columns={3}
      items={[
        {
          label: "Pendapatan bulan ini",
          value: formatRupiah(pendapatan),
          ...(keuanganBelumAda
            ? {
                emptyState: {
                  message: "Belum ada pendapatan tercatat bulan ini.",
                  actionLabel: "Lihat catatan keuangan",
                  href: JURNAL_HREF,
                },
              }
            : {}),
        },
        {
          label: "Beban bulan ini",
          value: formatRupiah(pengeluaran),
          ...(keuanganBelumAda
            ? {
                emptyState: {
                  message: "Belum ada beban tercatat bulan ini.",
                  actionLabel: "Lihat catatan keuangan",
                  href: JURNAL_HREF,
                },
              }
            : {}),
        },
        {
          label: "Laba kasar",
          value: formatRupiah(labaKasar),
          ...(keuanganBelumAda
            ? {
                emptyState: {
                  message: "Belum ada laba kasar bulan ini.",
                  actionLabel: "Lihat catatan keuangan",
                  href: JURNAL_HREF,
                },
              }
            : {
                followUp: { actionLabel: "Lihat catatan keuangan", href: JURNAL_HREF },
              }),
        },
        {
          label: "HPP rata-rata per lubang",
          value: batchPanenApproved > 0 ? formatRupiah(avgHppPerLubang) : "—",
          ...(batchPanenApproved <= 0
            ? {
                emptyState: {
                  message: "Belum ada batch panen disetujui.",
                  actionLabel: "Lihat produksi",
                  href: PRODUKSI_HREF,
                },
              }
            : {}),
        },
        {
          label: "Hasil panen rata-rata",
          value: batchPanenApproved > 0 ? `${avgYieldPct}%` : "—",
          ...(batchPanenApproved <= 0
            ? {
                emptyState: {
                  message: "Belum ada data hasil panen.",
                  actionLabel: "Lihat produksi",
                  href: PRODUKSI_HREF,
                },
              }
            : {}),
        },
      ]}
    />
  );
}
