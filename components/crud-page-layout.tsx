import type { ReactNode } from "react";
import { FlowSteps, type FlowStep } from "@/components/flow-steps";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";

export function CrudPageLayout({
  title,
  description,
  eyebrow,
  actions,
  flowSteps,
  list,
  listTitle = "Daftar data",
  listDescription,
  create,
  createTitle = "Tambah data baru",
  createDescription,
  extra,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  flowSteps?: FlowStep[];
  list?: ReactNode;
  listTitle?: string;
  listDescription?: string;
  create?: ReactNode;
  createTitle?: string;
  createDescription?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title={title} description={description} eyebrow={eyebrow} />
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
      {flowSteps ? <FlowSteps steps={flowSteps} /> : null}
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
