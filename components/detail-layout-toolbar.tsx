"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageCoachmark } from "@/components/page-coachmark";
import { resolveCoachMeta } from "@/lib/coach-meta";

export function DetailLayoutToolbar({ actions }: { actions?: ReactNode }) {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  if (!meta && !actions) return null;

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5">
      {meta ? (
        <PageCoachmark
          pageKey={meta.pageKey}
          steps={meta.steps}
          title={meta.title}
          placement="toolbar"
        />
      ) : null}
      {actions}
    </div>
  );
}
