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
  className,
}: {
  items: MetricCardItem[];
  /** @deprecated Grid mengikuti jumlah item; prop diabaikan. */
  columns?: 2 | 3 | 4;
  /** `compact`: padding kecil; otomatis juga jika item ≥ 5. */
  variant?: "default" | "compact";
  className?: string;
}) {
  const n = Math.max(1, items.length);
  const compact = variant === "compact" || n >= 5;

  const cardClass = compact
    ? "flex min-w-0 flex-col px-1.5 py-1.5 max-sm:px-2 max-sm:py-2 sm:px-3"
    : "flex min-w-0 flex-col p-4";

  const valueClass = compact
    ? "mt-0.5 text-sm font-semibold tabular-nums tracking-tight text-foreground min-[220px]:text-base"
    : "mt-1.5 text-base font-semibold tabular-nums tracking-tight text-foreground min-[220px]:text-lg sm:text-xl";

  const labelClass = compact
    ? "text-[11px] font-medium leading-tight text-muted-foreground"
    : "text-xs font-medium leading-snug text-muted-foreground";

  const hintClass = compact
    ? "mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground"
    : "mt-1 line-clamp-2 text-xs text-muted-foreground";

  return (
    <div
      className={cn(
        "grid gap-2",
        n === 1 ? "grid-cols-1" : "grid-cols-1 min-[220px]:grid-cols-2",
        "md:[grid-template-columns:repeat(var(--metric-n),minmax(0,1fr))]",
        className,
      )}
      style={{ "--metric-n": n } as CSSProperties}
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
