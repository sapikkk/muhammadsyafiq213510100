import { ChartCard } from "@/components/chart-card";
import { MetricCards } from "@/components/metric-cards";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { PageSection } from "@/components/page-section";
import type { MonthPoint } from "@/lib/monthly-summary-types";
import { OwnerLaporanLabaRugiPresentasi } from "@/components/owner-laporan-laba-rugi-presentasi";
import { OwnerNeracaTampilan } from "@/components/owner-neraca-tampilan";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { buildIncomeStatement } from "@/lib/income-statement";
import { formatRupiah } from "@/lib/format";

export type OwnerLaporanJenis = "laba-rugi" | "neraca";

function monthBounds(dari: string, sampai: string) {
  const start = new Date(`${dari}-01T00:00:00`);
  const [y, m] = sampai.split("-").map(Number);
  const end = new Date(y, m, 0, 23, 59, 59);
  return { start, end };
}

export async function OwnerLaporanKeuanganPanel({
  jenis,
  dari,
  sampai,
  monthTrend,
}: {
  jenis: OwnerLaporanJenis;
  dari: string;
  sampai: string;
  monthTrend?: MonthPoint[];
}) {
  const { start, end } = monthBounds(dari, sampai);

  if (jenis === "neraca") {
    const sheet = await buildBalanceSheet(end);
    return <OwnerNeracaTampilan sheet={sheet} />;
  }

  const laba = await buildIncomeStatement(start, end);
  const labaBersih = Number(laba.labaBersih);

  return (
    <div className="space-y-6">
      {monthTrend && monthTrend.length > 0 ? (
        <ChartCard title="Tren pendapatan & beban (6 bulan)">
          <OwnerRevenueChart months={monthTrend} />
        </ChartCard>
      ) : null}
      <MetricCards
        columns={3}
        items={[
          {
            label: "Laba bersih periode",
            value: formatRupiah(labaBersih),
          },
          {
            label: "Periode",
            value: `${dari === sampai ? dari : `${dari} – ${sampai}`}`,
          },
          {
            label: "Baris laporan",
            value: laba.lines.length,
          },
        ]}
      />
      <OwnerLaporanLabaRugiPresentasi
        lines={laba.lines}
        periodeLabel={dari === sampai ? dari : `${dari} – ${sampai}`}
      />
    </div>
  );
}
