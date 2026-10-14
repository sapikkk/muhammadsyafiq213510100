import { CrudPageLayout } from "@/components/crud-page-layout";
import { FinanceHubPanel } from "@/components/finance-hub-panel";
import { getAdminFinanceHubStats } from "@/lib/finance-hub-stats";
import { monthlySummaryCached } from "@/lib/cached-queries";

export const dynamic = "force-dynamic";

export default async function AdminKeuanganPage() {
  const [stats, summary] = await Promise.all([
    getAdminFinanceHubStats(),
    monthlySummaryCached(6),
  ]);

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      title="Modul keuangan"
      list={
        <FinanceHubPanel role="ADMIN" stats={stats} monthTrend={summary.months} />
      }
      listTitle="Ringkasan"
    />
  );
}
