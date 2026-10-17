import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import {
  labelPermissionSectionBadge,
  type PermissionSectionBadge,
} from "@/lib/permission-section-badge";
import { cn } from "@/lib/utils";

/** Grid bento 6 kolom (lg+); di bawah lg satu kolom penuh agar HP tidak terpotong. */
export function DashboardBento({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 auto-rows-min sm:gap-2.5 lg:grid-cols-6 lg:gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

const SPAN_LG: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
};

/** Satu sel bento. `span` = lebar di lg (dari 6 kolom). Di bawah lg selalu lebar penuh. */
export function BentoSlot({
  children,
  span = 6,
  className,
}: {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  return (
    <div className={cn("col-span-full min-w-0", SPAN_LG[span], className)}>
      {children}
    </div>
  );
}

export function BentoSection({
  title,
  badge,
  hidePermissionBadge,
  headerAction,
  children,
  className,
  id,
}: {
  title?: string;
  badge?: PermissionSectionBadge;
  hidePermissionBadge?: boolean;
  /** Tombol/link di kanan judul (mis. CTA ke halaman lengkap). */
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const badgeLabel = labelPermissionSectionBadge(badge, Boolean(hidePermissionBadge));

  return (
    <Card
      id={id}
      className={cn(
        "flex h-full min-w-0 flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-3 lg:gap-3",
        className,
      )}
    >
      {title || badgeLabel || headerAction ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-baseline gap-2">
            {title ? (
              <h2 className="text-sm font-semibold leading-snug tracking-tight sm:text-base">
                {title}
              </h2>
            ) : null}
            {badgeLabel ? (
              <span className="rounded border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {badgeLabel}
              </span>
            ) : null}
          </div>
          {headerAction ? (
            <div className="flex shrink-0 justify-end sm:justify-end">{headerAction}</div>
          ) : null}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
    </Card>
  );
}
