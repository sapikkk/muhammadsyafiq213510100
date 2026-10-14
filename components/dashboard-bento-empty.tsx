"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Pesan kosong di beranda bento + satu tombol ke halaman terkait. */
export function DashboardBentoEmpty({
  message,
  actionLabel,
  href,
  className,
  compact,
}: {
  message: string;
  actionLabel?: string;
  href?: string;
  className?: string;
  /** Di dalam kartu metrik (padding lebih rapat). */
  compact?: boolean;
}) {
  const hasAction = Boolean(actionLabel && href);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-md border border-dashed border-border bg-muted/15",
        compact ? "px-3 py-4" : "px-4 py-6",
        hasAction && !compact && "sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{message}</p>
      {hasAction ? (
        <Button asChild size="sm" variant="outline" className="min-h-11 shrink-0">
          <Link href={href!}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
