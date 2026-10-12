import type { ReactNode } from "react";
import { FinanceModuleNav } from "@/components/finance-module-nav";
import { FlowSteps, type FlowStep } from "@/components/flow-steps";
import { PageHeaderRow } from "@/components/page-header-row";
import { PageSection } from "@/components/page-section";
import { UI_COPY } from "@/lib/ui-copy";

export function CrudPageLayout({
  title,
  description,
  actions,
  flowSteps,
  coachKey,
  coachTips,
  coachTitle,
  list,
  listTitle = UI_COPY.crudListTitle,
  listDescription,
  create,
  createTitle = UI_COPY.crudCreateTitle,
  createDescription,
  extra,
  financeNavRole,
}: {
  title: string;
  description?: string;
  /** Tab modul keuangan (Books-style IA, design system Kokonus). */
  financeNavRole?: "ADMIN" | "OWNER";
  actions?: ReactNode;
  flowSteps?: FlowStep[];
  /** Override kunci coachmark (default: path halaman) */
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
}) {
  const guide = flowSteps ? (
    <FlowSteps
      steps={flowSteps}
      pageKey={coachKey}
      tips={coachTips}
      title={coachTitle}
      toolbar
    />
  ) : null;

  return (
    <div className="flex flex-col gap-6">
      {financeNavRole ? <FinanceModuleNav role={financeNavRole} /> : null}
      <PageHeaderRow
        title={title}
        description={description}
        guide={guide}
        actions={actions}
      />
      {list ? (
        <PageSection title={listTitle} description={listDescription} badge="Read" id="crud-list">
          {list}
        </PageSection>
      ) : null}
      {create ? (
        <PageSection title={createTitle} description={createDescription} badge="Create" id="crud-create">
          {create}
        </PageSection>
      ) : null}
      {extra}
    </div>
  );
}
