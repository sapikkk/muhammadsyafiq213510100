import { ChartCard } from "@/components/chart-card";
import { MetricCards } from "@/components/metric-cards";
import { OwnerKasNetTrendChart } from "@/components/owner-kas-net-trend-chart";
import { BentoSection } from "@/components/dashboard-bento";
import { formatRupiah } from "@/lib/format";
import type { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";

type Keuangan = Awaited<ReturnType<typeof loadOwnerDashboardKeuangan>>;

export function OwnerDashboardKeuanganPanel({ data }: { data: Keuangan }) {
  const kosong =
    Number(data.pendapatanBulanIni) === 0 &&
    Number(data.bebanBulanIni) === 0 &&
    Number(data.saldoKas) === 0;

  return (
    <BentoSection title="Indikator keuangan utama">
      <div className="flex flex-col gap-4">
        <MetricCards
          columns={3}
          items={[
            {
              id: "kas",
              label: "Saldo kas & bank",
              value: formatRupiah(data.saldoKas),
              followUp: { actionLabel: "Rekening", href: "/owner/rekening" },
            },
            {
              id: "pendapatan",
              label: "Total pendapatan (bulan ini)",
              value: formatRupiah(data.pendapatanBulanIni),
              ...(kosong
                ? {
                    emptyState: {
                      message: "Belum ada pendapatan bulan ini.",
                      actionLabel: "Laba rugi",
                      href: "/owner/laporan?laporan=laba-rugi",
                    },
                  }
                : {
                    followUp: {
                      actionLabel: "Laba rugi",
                      href: "/owner/laporan?laporan=laba-rugi",
                    },
                  }),
            },
            {
              id: "beban",
              label: "Total beban (bulan ini)",
              value: formatRupiah(data.bebanBulanIni),
              followUp: { actionLabel: "Rincian biaya", href: "/owner/biaya" },
            },
            {
              id: "laba",
              label: "Laba bersih (perkiraan)",
              value: formatRupiah(data.labaBersih),
              followUp: { actionLabel: "Laba rugi", href: "/owner/laporan?laporan=laba-rugi" },
            },
            {
              id: "piutang",
              label: "Piutang belum tertagih",
              value: formatRupiah(data.totalPiutang),
              hint:
                data.jumlahPiutang > 0
                  ? `${data.jumlahPiutang} pesanan`
                  : "Tidak ada piutang terbuka",
              followUp: { actionLabel: "Daftar piutang", href: "/owner/penjualan/piutang" },
            },
            {
              id: "tagih",
              label: "Perlu ditagih (≥30 hari)",
              value: formatRupiah(data.piutangPerluDitagih),
              hint:
                data.jumlahPiutangPerluDitagih > 0
                  ? `${data.jumlahPiutangPerluDitagih} pesanan`
                  : "Semua piutang masih fresh",
              followUp: { actionLabel: "Piutang", href: "/owner/penjualan/piutang" },
            },
            {
              id: "aktiva",
              label: "Total aktiva",
              value: formatRupiah(data.totalAktiva),
              followUp: { actionLabel: "Neraca", href: "/owner/laporan?laporan=neraca" },
            },
            {
              id: "pasiva",
              label: "Total pasiva (hutang + modal)",
              value: formatRupiah(data.totalPasiva),
              followUp: { actionLabel: "Neraca", href: "/owner/laporan?laporan=neraca" },
            },
            {
              id: "lancar",
              label: "Aktiva lancar",
              value: formatRupiah(data.aktivaLancar),
              followUp: { actionLabel: "Daftar akun", href: "/owner/akun" },
            },
          ]}
        />
        <ChartCard title="Tren arus kas operasi (6 bulan)" className="h-full">
          <OwnerKasNetTrendChart points={data.arusKasTrend} />
        </ChartCard>
      </div>
    </BentoSection>
  );
}
