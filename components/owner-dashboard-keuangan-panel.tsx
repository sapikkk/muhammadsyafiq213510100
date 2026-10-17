import Link from "next/link";
import { ChartCard } from "@/components/chart-card";
import { MetricCards } from "@/components/metric-cards";
import { OwnerKasNetTrendChart } from "@/components/owner-kas-net-trend-chart";
import { BentoSection } from "@/components/dashboard-bento";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";
import type { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";

type Keuangan = Awaited<ReturnType<typeof loadOwnerDashboardKeuangan>>;

export function OwnerDashboardKeuanganPanel({ data }: { data: Keuangan }) {
  return (
    <BentoSection
      title="Indikator keuangan utama"
      headerAction={
        <Button asChild size="sm" className="min-h-11 rounded-full px-4">
          <Link href="/owner/keuangan">Periksa keuangan secara lengkap</Link>
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <MetricCards
          hideActions
          variant="default"
          items={[
            {
              id: "kas",
              label: "Saldo kas & bank",
              value: formatRupiah(data.saldoKas),
            },
            {
              id: "laba",
              label: "Laba bersih (perkiraan)",
              value: formatRupiah(data.labaBersih),
            },
            {
              id: "piutang",
              label: "Piutang belum tertagih",
              value: formatRupiah(data.totalPiutang),
              hint:
                data.jumlahPiutang > 0
                  ? `${data.jumlahPiutang} pesanan`
                  : "Tidak ada piutang terbuka",
            },
            {
              id: "tagih",
              label: "Perlu ditagih (≥30 hari)",
              value: formatRupiah(data.piutangPerluDitagih),
              hint:
                data.jumlahPiutangPerluDitagih > 0
                  ? `${data.jumlahPiutangPerluDitagih} pesanan`
                  : "Semua piutang masih fresh",
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
