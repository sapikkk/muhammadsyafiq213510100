import { CrudPageLayout } from "@/components/crud-page-layout";
import { FinanceHubPanel } from "@/components/finance-hub-panel";
import { getAdminFinanceHubStats } from "@/lib/finance-hub-stats";
import { monthlySummaryCached } from "@/lib/cached-queries";

export const dynamic = "force-dynamic";

export default async function OwnerKeuanganPage() {
  const [stats, summary] = await Promise.all([
    getAdminFinanceHubStats(),
    monthlySummaryCached(6),
  ]);

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Laporan keuangan"
      list={
        <FinanceHubPanel
          role="OWNER"
          stats={stats}
          pendapatanBulanIni={summary.pendapatanBulanIni}
          pengeluaranBulanIni={summary.pengeluaranBulanIni}
          monthTrend={summary.months}
        />
      }
      listTitle="Ringkasan"
    />
  );
}
