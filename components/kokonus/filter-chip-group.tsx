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
  className?: string;
};

/** Chip preset — referensi FILTER_CHIP_GROUP Figma. */
export function FilterChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? <span className="text-sm font-medium">{label}</span> : null}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
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
