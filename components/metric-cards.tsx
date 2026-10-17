import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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
  /** Ikon line di samping label (Lucide). */
  icon?: LucideIcon;
  /** Kunci unik kartu (default: string label). */
  id?: string;
  /** Tampilkan pesan + tombol alih-alih angka utama. */
  emptyState?: MetricEmptyAction;
  /** Tombol di bawah angka (data ada, perlu tindak lanjut). */
  followUp?: Pick<MetricEmptyAction, "actionLabel" | "href">;
};

/** Kartu metrik: mobile 2 kolom, layar lebar satu baris (jumlah kartu = jumlah kolom). */
export function MetricCards({
  items,
  columns: _columns = 3,
  variant = "default",
  hideActions = false,
  className,
}: {
  items: MetricCardItem[];
  /** @deprecated Grid mengikuti jumlah item; prop diabaikan. */
  columns?: 2 | 3 | 4;
  /** `compact`: padding kecil; otomatis juga jika item ≥ 5. */
  variant?: "default" | "compact";
  /** Sembunyikan tombol/link di bawah kartu (CTA dipusatkan di luar grid). */
  hideActions?: boolean;
  className?: string;
}) {
  const n = Math.max(1, items.length);
  const compact = variant === "compact" || n >= 5;

  const cardClass = compact
    ? "@container flex min-w-0 flex-col overflow-hidden px-1.5 py-1.5 max-sm:px-2 max-sm:py-2 sm:px-3"
    : "@container flex min-w-0 flex-col overflow-hidden p-4";

  const valueClass = compact
    ? "mt-0.5 min-w-0 max-w-full text-[clamp(0.6875rem,2.8cqi,0.875rem)] font-semibold leading-tight tabular-nums tracking-tight text-foreground sm:text-sm"
    : "mt-1.5 min-w-0 max-w-full text-[clamp(0.8125rem,3.2cqi,1.125rem)] font-semibold leading-tight tabular-nums tracking-tight text-foreground min-[220px]:text-lg sm:text-xl";

  const labelClass = compact
    ? "min-w-0 line-clamp-2 text-[11px] font-medium leading-tight text-muted-foreground"
    : "min-w-0 line-clamp-2 text-xs font-medium leading-snug text-muted-foreground";

  const hintClass = compact
    ? "mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground"
    : "mt-1 line-clamp-2 text-xs text-muted-foreground";

  const gridClass =
    n <= 4
      ? "grid-cols-2 lg:grid-cols-4"
      : cn(
          n === 1 ? "grid-cols-1" : "grid-cols-1 min-[220px]:grid-cols-2",
          "md:[grid-template-columns:repeat(var(--metric-n),minmax(0,1fr))]",
        );

  return (
    <div
      className={cn("grid gap-2", gridClass, className)}
      style={n > 4 ? ({ "--metric-n": n } as CSSProperties) : undefined}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
        <Card
          key={item.id ?? (typeof item.label === "string" ? item.label : `metric-${i}`)}
          className={cardClass}
        >
          <div className="flex items-start gap-1.5">
            {Icon ? (
              <Icon
                className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            ) : null}
            <p className={cn(labelClass, "min-w-0 flex-1")}>{item.label}</p>
          </div>
          {item.emptyState ? (
            <div className="mt-1.5 flex flex-1 flex-col gap-1.5">
              <p className="text-xs text-muted-foreground">{item.emptyState.message}</p>
              {!hideActions ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn(
                    "mt-auto w-full max-w-full whitespace-normal",
                    compact ? "min-h-9 text-xs" : "min-h-11",
                  )}
                >
                  <Link href={item.emptyState.href}>{item.emptyState.actionLabel}</Link>
                </Button>
              ) : null}
            </div>
          ) : (
            <>
              <div className={valueClass}>{item.value}</div>
              {item.hint ? <p className={hintClass}>{item.hint}</p> : null}
              {!hideActions && item.followUp ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn(
                    "mt-2 w-full max-w-full whitespace-normal",
                    compact ? "min-h-9 text-xs" : "min-h-11",
                  )}
                >
                  <Link href={item.followUp.href}>{item.followUp.actionLabel}</Link>
                </Button>
              ) : null}
            </>
          )}
        </Card>
      );
      })}
    </div>
  );
}
