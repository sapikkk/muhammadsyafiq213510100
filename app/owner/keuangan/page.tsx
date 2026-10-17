import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import { OwnerKeuanganDashboardLayout } from "@/components/owner-keuangan-dashboard-layout";
import { PageHeaderRow } from "@/components/page-header-row";
import { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";

export const dynamic = "force-dynamic";

export default async function OwnerKeuanganPage() {
  const keuangan = await loadOwnerDashboardKeuangan();

  return (
    <OwnerKeuanganChrome>
      <PageHeaderRow title="Laporan keuangan" />
      <OwnerKeuanganDashboardLayout data={keuangan} />
    </OwnerKeuanganChrome>
  );
}
