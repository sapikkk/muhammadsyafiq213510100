import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";

/** Judul halaman + toolbar kanan (Panduan, aksi utama). */
export function PageHeaderRow({
  title,
  description,
  eyebrow,
  guide,
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  guide?: ReactNode;
  actions?: ReactNode;
}) {
  const hasToolbar = guide || actions;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <PageHeader title={title} description={description} eyebrow={eyebrow} />
      {hasToolbar ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5">
          {guide}
          {actions}
        </div>
      ) : null}
    </div>
  );
}
