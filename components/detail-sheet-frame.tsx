"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

/** Sheet detail lebar — tutup = router.back() agar daftar tetap terbuka. */
export function DetailSheetFrame({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <SheetContent side="right" size="detail">
        <SheetTitle className="sr-only">Detail</SheetTitle>
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto pr-6 pb-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
