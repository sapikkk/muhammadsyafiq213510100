"use client";

import { usePathname } from "next/navigation";
import { PageCoachmark } from "@/components/page-coachmark";
import { coachPageKeyFromPathname } from "@/lib/coach-page-key";
import { resolveCoachMeta } from "@/lib/coach-meta";

/** Ikon panduan di bawah konten — teks panjang hanya di dialog. */
export function PageGuideFooter() {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  const pageKey = meta?.pageKey ?? coachPageKeyFromPathname(pathname);

  return (
    <PageCoachmark
      pageKey={pageKey}
      steps={meta?.steps ?? []}
      title={meta?.title ?? "Panduan halaman"}
      placement="footer"
    />
  );
}
