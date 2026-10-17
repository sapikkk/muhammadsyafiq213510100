"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilterChipOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label?: string;
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** `segmented`: satu baris kapsul (rentang waktu); default: chip terpisah. */
  layout?: "chips" | "segmented";
  className?: string;
};

/** Chip preset — referensi FILTER_CHIP_GROUP Figma. */
export function FilterChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  layout = "chips",
  className,
}: Props<T>) {
  const groupLabel = label ?? "Filter";

  if (layout === "segmented") {
    return (
      <div className={cn("flex min-w-0 flex-col gap-2", className)}>
        {label ? <span className="text-sm font-medium">{label}</span> : null}
        <div
          className="inline-flex w-full min-w-0 max-w-xl rounded-full border border-border bg-muted/80 p-1"
          role="group"
          aria-label={groupLabel}
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "min-h-10 flex-1 truncate rounded-full px-2 text-center text-xs font-medium transition-colors sm:min-h-11 sm:px-3 sm:text-sm",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={active}
                onClick={() => onChange(opt.value)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? <span className="text-sm font-medium">{label}</span> : null}
      <div className="flex flex-wrap gap-2" role="group" aria-label={groupLabel}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <Button
              key={opt.value}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              className="min-h-11 rounded-full px-4"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
