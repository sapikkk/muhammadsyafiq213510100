import { cn } from "@/lib/utils";

export type KokonusProgressSegment = {
  label: string;
  value: number;
  max: number;
  tone?: "green" | "lime" | "muted";
};

const fillClass: Record<NonNullable<KokonusProgressSegment["tone"]>, string> = {
  green: "bg-[var(--kokonus-green,#1a3d2e)]",
  lime: "bg-[var(--kokonus-lime-mark,#d3fa53)]",
  muted: "bg-muted-foreground/35",
};

/** Bar progress multi-segment — referensi alokasi anggaran Figma. */
export function KokonusProgressBar({
  segments,
  className,
}: {
  segments: KokonusProgressSegment[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {segments.map((seg) => {
        const pct = seg.max > 0 ? Math.min(100, (seg.value / seg.max) * 100) : 0;
        const tone = seg.tone ?? "green";
        return (
          <li key={seg.label} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{seg.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {seg.value.toLocaleString("id-ID")} / {seg.max.toLocaleString("id-ID")}
              </span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-muted/50"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={cn("h-full rounded-full transition-[width]", fillClass[tone])}
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
