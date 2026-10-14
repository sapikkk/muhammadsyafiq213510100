import { BentoSection } from "@/components/dashboard-bento";
import { DashboardNavGrid } from "@/components/dashboard-nav-grid";
import { getDashboardHubItems } from "@/lib/dashboard-hub-items";

export function OwnerFlowDashboard({ stokRendahCount }: { stokRendahCount: number }) {
  return (
    <BentoSection title="Menu">
      <DashboardNavGrid items={getDashboardHubItems("OWNER", stokRendahCount)} />
    </BentoSection>
  );
}
