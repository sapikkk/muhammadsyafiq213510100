import { cn } from "@/lib/utils";

export function MonochromeProgressBar({
  value,
  label,
  hint,
  className,
}: {
  /** 0–100 */
  value: number;
  label?: string;
  hint?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      {label || hint ? (
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
          {label ? <span className="font-medium text-foreground">{label}</span> : <span />}
          {hint ? (
            <span className="tabular-nums text-muted-foreground">{hint}</span>
          ) : (
            <span className="tabular-nums text-muted-foreground">{clamped}%</span>
          )}
        </div>
      ) : null}
      <div
        className="h-3 w-full overflow-hidden rounded-full border border-border bg-muted/40"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-foreground transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
