import { Suspense } from "react";
import { OwnerSectionTabs, type OwnerSectionTab } from "@/components/owner-section-tabs";

export function OwnerSectionTabsShell({ tabs }: { tabs: OwnerSectionTab[] }) {
  return (
    <Suspense fallback={null}>
      <OwnerSectionTabs tabs={tabs} />
    </Suspense>
  );
}
