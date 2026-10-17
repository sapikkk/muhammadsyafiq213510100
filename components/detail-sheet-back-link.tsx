"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dismissDetailSheet } from "@/lib/dismiss-detail-sheet";
import { cn } from "@/lib/utils";

/** Tutup intercept `@detail` — Link ke URL daftar yang sama sering no-op saat pathname masih list. */
export function DetailSheetBackLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "-ml-2 mb-3 min-h-11 gap-1.5 px-2 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        className,
      )}
      onClick={() => dismissDetailSheet(router, href)}
    >
      <ArrowLeft className="size-3.5" aria-hidden />
      <span>{label}</span>
    </Button>
  );
}
