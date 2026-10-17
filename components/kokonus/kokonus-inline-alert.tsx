import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "peringatan" | "info" | "sukses";

const variantClass: Record<Variant, string> = {
  peringatan: "kokonus-inline-alert border-amber-900/15 bg-[var(--kokonus-warn-surface,#faf6e8)] text-[var(--kokonus-warn-ink,#5c4a12)]",
  info: "border-border bg-muted/40 text-foreground",
  sukses: "border-emerald-900/15 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-100",
};

/** Banner peringatan — referensi INLINE_ALERT_BANNER Figma. */
export function KokonusInlineAlert({
  title,
  children,
  variant = "peringatan",
  className,
}: {
  title: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <div role="alert" className={cn("rounded-xl border px-4 py-3 text-sm", variantClass[variant], className)}>
      <strong className="mb-1 block text-[0.6875rem] font-bold uppercase tracking-wide">{title}</strong>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
