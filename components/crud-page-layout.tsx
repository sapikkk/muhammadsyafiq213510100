import type { ReactNode } from "react";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { FinanceModuleNav } from "@/components/finance-module-nav";
import { PageHeaderRow } from "@/components/page-header-row";
import type { FlowStep } from "@/components/flow-steps";
import { PageSection } from "@/components/page-section";
import { pageContentClass } from "@/lib/ui-typography";
import { UI_COPY } from "@/lib/ui-copy";

export function CrudPageLayout({
  title,
  description,
  actions,
  list,
  listTitle = UI_COPY.crudListTitle,
  listDescription,
  create,
  createTitle = UI_COPY.crudCreateTitle,
  createDescription,
  extra,
  intro,
  leading,
  financeNavRole,
  hidePermissionBadges,
}: {
  title: string;
  description?: string;
  /** Konteks singkat di bawah judul (mis. petani RBAC). */
  intro?: ReactNode;
  /** Blok di atas daftar (ringkasan, filter). */
  leading?: ReactNode;
  /** Tab modul keuangan (Books-style IA, design system Kokonus). */
  financeNavRole?: "ADMIN" | "OWNER";
  actions?: ReactNode;
  /** @deprecated Panduan lewat ikon bawah halaman (coach-meta / coach-tips). */
  flowSteps?: FlowStep[];
  coachKey?: string;
  coachTips?: string[];
  coachTitle?: string;
  list?: ReactNode;
  listTitle?: string;
  listDescription?: string;
  create?: ReactNode;
  createTitle?: string;
  createDescription?: string;
  extra?: ReactNode;
  /** Tanpa badge Read/Create di section (halaman petani). */
  hidePermissionBadges?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4 min-[220px]:gap-6", pageContentClass)}>
      {financeNavRole ? (
        <Suspense fallback={null}>
          <FinanceModuleNav role={financeNavRole} />
        </Suspense>
      ) : null}
      <PageHeaderRow title={title} description={description} actions={actions} />
      {intro}
      {leading}
      {list ? (
        <PageSection
          title={listTitle}
          description={listDescription}
          badge="Read"
          hidePermissionBadge={hidePermissionBadges}
          id="crud-list"
        >
          {list}
        </PageSection>
      ) : null}
      {create ? (
        <PageSection
          title={createTitle}
          description={createDescription}
          badge="Create"
          hidePermissionBadge={hidePermissionBadges}
          id="crud-create"
        >
          {create}
        </PageSection>
      ) : null}
      {extra}
    </div>
  );
}
