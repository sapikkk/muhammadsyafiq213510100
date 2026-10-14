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
  className,
}: {
  items: MetricCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const grid =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={cn("grid gap-3", grid, className)}>
      {items.map((item, i) => (
        <Card
          key={item.id ?? (typeof item.label === "string" ? item.label : `metric-${i}`)}
          className="flex flex-col p-4"
        >
          <p className="text-xs font-medium leading-snug text-muted-foreground">{item.label}</p>
          {item.emptyState ? (
            <div className="mt-2 flex flex-1 flex-col gap-2">
              <p className="text-sm text-muted-foreground">{item.emptyState.message}</p>
              <Button asChild size="sm" variant="outline" className="mt-auto min-h-11 w-full">
                <Link href={item.emptyState.href}>{item.emptyState.actionLabel}</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-foreground sm:text-xl">
                {item.value}
              </div>
              {item.hint ? (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.hint}</p>
              ) : null}
              {item.followUp ? (
                <Button asChild size="sm" variant="outline" className="mt-3 min-h-11 w-full">
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
