import { cn } from "@/lib/utils";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";

const FLOW = ["DRAFT", "CONFIRMED", "SHIPPED", "DELIVERED"] as const;

const SHORT: Record<(typeof FLOW)[number], string> = {
  DRAFT: "Sementara",
  CONFIRMED: "Konfirmasi",
  SHIPPED: "Kirim",
  DELIVERED: "Sampai",
};

export function SalesOrderProgressStrip({ status }: { status: string }) {
  if (status === "CANCELLED") {
    return (
      <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        Pesanan dibatalkan.
      </p>
    );
  }

  const current = FLOW.includes(status as (typeof FLOW)[number])
    ? (status as (typeof FLOW)[number])
    : "DRAFT";
  const currentIdx = FLOW.indexOf(current);

  return (
    <nav aria-label="Tahap pesanan" className="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
      {FLOW.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <span key={step} className="inline-flex items-center gap-1">
            {i > 0 ? (
              <span className="text-muted-foreground/50 px-0.5" aria-hidden>
                →
              </span>
            ) : null}
            <span
              className={cn(
                "rounded border px-2 py-0.5 tabular-nums",
                active && "border-foreground bg-foreground text-background font-medium",
                done && !active && "border-border text-muted-foreground",
                !done && !active && "border-border/60 text-muted-foreground/70",
              )}
            >
              {SHORT[step]}
            </span>
          </span>
        );
      })}
      <span className="sr-only">Status sekarang: {labelSalesOrderStatus(status)}</span>
    </nav>
  );
}
