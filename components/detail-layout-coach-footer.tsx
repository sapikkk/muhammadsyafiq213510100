"use client";

import { usePathname } from "next/navigation";
import { PageCoachmark } from "@/components/page-coachmark";
import { resolveCoachMeta } from "@/lib/coach-meta";

/** Panduan halaman detail — di bawah konten agar tidak bentrok dengan aksi utama. */
export function DetailLayoutCoachFooter() {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  if (!meta) return null;

  return (
    <div className="border-t pt-6">
      <PageCoachmark
        pageKey={meta.pageKey}
        steps={meta.steps}
        title={meta.title}
        placement="block"
      />
    </div>
  );
}
