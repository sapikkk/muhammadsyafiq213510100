import type { ReactNode } from "react";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_LAPORAN_KEUANGAN } from "@/lib/owner-laporan-keuangan-tabs";

export function OwnerKeuanganChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <OwnerSectionTabsShell tabs={TABS_LAPORAN_KEUANGAN} />
      {children}
    </div>
  );
}
