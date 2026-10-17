"use client";

import { useRouter } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function DetailSheetLoading() {
  return (
    <div className="flex flex-col gap-4 px-1 py-2" aria-busy="true" aria-label="Memuat detail">
      <div className="h-8 w-2/3 max-w-xs animate-pulse rounded bg-muted" />
      <div className="h-4 w-full max-w-md animate-pulse rounded bg-muted/80" />
      <div className="mt-2 h-32 w-full animate-pulse rounded-md bg-muted/60" />
    </div>
  );
}

/**
 * Sheet detail lebar — tutup kembali ke daftar (`router.replace`, bukan `router.back`).
 * `listHref` wajib: intercept `@detail` sering membuat pathname = URL daftar, jadi fallback pathname tidak cukup.
 */
export function DetailSheetFrame({
  children,
  listHref,
}: {
  children: ReactNode;
  /** Daftar induk modul, mis. `/petani/inventaris`. */
  listHref: string;
}) {
  const router = useRouter();

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
        <div className={cn("min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-6")}>
          <Suspense fallback={<DetailSheetLoading />}>{children}</Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}
