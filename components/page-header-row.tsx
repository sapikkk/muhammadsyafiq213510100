import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";

/** Judul halaman + aksi kanan (panduan lewat ikon di bawah AppShell). */
export function PageHeaderRow({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 max-w-full flex-col gap-3 min-[220px]:gap-4 sm:flex-row sm:items-start sm:justify-between">
      <PageHeader title={title} description={description} />
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
