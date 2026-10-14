import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MetricEmptyAction = {
  message: string;
  actionLabel: string;
  href: string;
};

export type MetricCardItem = {
  label: ReactNode;
  value: ReactNode;
  hint?: string;
  /** Kunci unik kartu (default: string label). */
  id?: string;
  /** Tampilkan pesan + tombol alih-alih angka utama. */
  emptyState?: MetricEmptyAction;
  /** Tombol di bawah angka (data ada, perlu tindak lanjut). */
  followUp?: Pick<MetricEmptyAction, "actionLabel" | "href">;
};

/** Kartu metrik ringkas — grid responsif, tidak mendominasi layar. */
export function MetricCards({
  items,
  columns = 3,
  variant = "default",
  className,
}: {
  items: MetricCardItem[];
  columns?: 2 | 3 | 4;
  /** `compact`: satu baris, padding kecil (infrastruktur / fase tanam). */
  variant?: "default" | "compact";
  className?: string;
}) {
  const grid =
    variant === "compact"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-[repeat(5,minmax(0,1fr))]"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : columns === 2
          ? "sm:grid-cols-2"
          : "sm:grid-cols-2 xl:grid-cols-3";

  const cardClass =
    variant === "compact" ? "flex min-w-0 flex-col px-2.5 py-2 sm:px-3" : "flex flex-col p-4";

  const valueClass =
    variant === "compact"
      ? "mt-0.5 text-base font-semibold tabular-nums tracking-tight text-foreground"
      : "mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-foreground sm:text-xl";

  const labelClass =
    variant === "compact"
      ? "text-[11px] font-medium leading-tight text-muted-foreground"
      : "text-xs font-medium leading-snug text-muted-foreground";

  const hintClass =
    variant === "compact"
      ? "mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground"
      : "mt-1 line-clamp-2 text-xs text-muted-foreground";

  return (
    <div className={cn("grid gap-2", grid, className)}>
      {items.map((item, i) => (
        <Card
          key={item.id ?? (typeof item.label === "string" ? item.label : `metric-${i}`)}
          className={cardClass}
        >
          <p className={labelClass}>{item.label}</p>
          {item.emptyState ? (
            <div className="mt-1.5 flex flex-1 flex-col gap-1.5">
              <p className="text-xs text-muted-foreground">{item.emptyState.message}</p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn("mt-auto w-full", variant === "compact" ? "min-h-9 text-xs" : "min-h-11")}
              >
                <Link href={item.emptyState.href}>{item.emptyState.actionLabel}</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className={valueClass}>{item.value}</div>
              {item.hint ? <p className={hintClass}>{item.hint}</p> : null}
              {item.followUp ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn("mt-2 w-full", variant === "compact" ? "min-h-9 text-xs" : "min-h-11")}
                >
                  <Link href={item.followUp.href}>{item.followUp.actionLabel}</Link>
                </Button>
              ) : null}
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
