"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { listHrefFromDetailPathname } from "@/lib/detail-list-href";

/** Sheet detail lebar — tutup kembali ke daftar (bukan router.back). */
export function DetailSheetFrame({
  children,
  dismissHref,
}: {
  children: ReactNode;
  /** Default: induk path dari URL saat ini (mis. /admin/inventaris/5 → /admin/inventaris). */
  dismissHref?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const listHref = dismissHref ?? listHrefFromDetailPathname(pathname);

  const dismiss = () => {
    router.replace(listHref, { scroll: false });
  };

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) dismiss();
      }}
    >
      <SheetContent side="right" size="detail" className="flex flex-col gap-0 p-0">
        <SheetTitle className="sr-only">Detail</SheetTitle>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
