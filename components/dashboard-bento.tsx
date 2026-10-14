import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Grid bento 6 kolom (lg+), 2 kolom di layar kecil — dipakai di semua beranda peran. */
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
        "grid grid-cols-2 gap-3 auto-rows-min lg:grid-cols-6",
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

/** Satu sel bento. `span` = lebar di lg (dari 6 kolom). Di HP selalu lebar penuh. */
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
    <div className={cn("col-span-2 min-w-0", SPAN_LG[span], className)}>{children}</div>
  );
}

export function BentoSection({
  title,
  badge,
  children,
  className,
  id,
}: {
  title?: string;
  badge?: "Read" | "Create" | "Update" | "Delete";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const badgeLabel =
    badge === "Create"
      ? "Buat"
      : badge === "Update"
        ? "Ubah"
        : badge === "Delete"
          ? "Hapus"
          : badge === "Read"
            ? "Lihat"
            : null;

  return (
    <Card id={id} className={cn("flex h-full flex-col gap-4 p-5", className)}>
      {title || badgeLabel ? (
        <div className="flex flex-wrap items-baseline gap-2">
          {title ? (
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          ) : null}
          {badgeLabel ? (
            <span className="rounded border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {badgeLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
    </Card>
  );
}
