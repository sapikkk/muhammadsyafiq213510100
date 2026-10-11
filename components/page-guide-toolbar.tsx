"use client";

import { usePathname } from "next/navigation";
import { PageCoachmark } from "@/components/page-coachmark";
import { resolveCoachMeta } from "@/lib/coach-meta";

/** Tombol Panduan dari URL — dipasang di baris header halaman. */
export function PageGuideToolbar() {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  if (!meta) return null;

  return (
    <PageCoachmark
      pageKey={meta.pageKey}
      steps={meta.steps}
      title={meta.title}
      placement="toolbar"
    />
  );
}
