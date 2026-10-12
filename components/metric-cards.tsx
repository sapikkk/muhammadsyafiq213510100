import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MetricCardItem = {
  label: ReactNode;
  value: ReactNode;
  hint?: string;
  /** Kunci unik kartu (default: string label). */
  id?: string;
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
        <Card key={item.id ?? (typeof item.label === "string" ? item.label : `metric-${i}`)} className="p-4">
          <p className="text-xs font-medium leading-snug text-muted-foreground">{item.label}</p>
          <div className="mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-foreground sm:text-xl">
            {item.value}
          </div>
          {item.hint ? (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.hint}</p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
