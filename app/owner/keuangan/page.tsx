import { OwnerDashboardKeuanganPanel } from "@/components/owner-dashboard-keuangan-panel";
import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import { OwnerKeuanganHubBento } from "@/components/owner-keuangan-hub-bento";
import { PageHeaderRow } from "@/components/page-header-row";
import { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";

export const dynamic = "force-dynamic";

export default async function OwnerKeuanganPage() {
  const keuangan = await loadOwnerDashboardKeuangan();

  return (
    <OwnerKeuanganChrome>
      <PageHeaderRow title="Laporan keuangan" />
      <OwnerDashboardKeuanganPanel data={keuangan} />
      <OwnerKeuanganHubBento />
    </OwnerKeuanganChrome>
  );
}
