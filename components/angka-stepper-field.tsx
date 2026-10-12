"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type AngkaStepTombol = { delta: number; label: string };

function formatTampilan(n: number, decimals: number) {
  if (!Number.isFinite(n)) return "";
  return n.toFixed(decimals).replace(".", ",");
}

function parseTampilan(raw: string): number {
  const s = raw.trim().replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function roundTo(n: number, decimals: number) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}

export function AngkaStepperField({
  label,
  name,
  value,
  onChange,
  minus,
  plus,
  decimals,
  min,
  max,
  required,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (next: number) => void;
  minus: AngkaStepTombol[];
  plus: AngkaStepTombol[];
  decimals: number;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  const apply = (next: number) => {
    let v = roundTo(next, decimals);
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    onChange(v);
  };

  const bump = (delta: number) => apply(value + delta);

  const btnClass =
    "h-9 w-[3.25rem] shrink-0 px-0 tabular-nums text-xs sm:text-sm";

  return (
    <div className="mx-auto w-full max-w-md space-y-2 text-sm">
      <p className="text-center font-medium">{label}</p>
      <input type="hidden" name={name} value={value.toFixed(decimals)} />
      <div className="grid grid-cols-[1fr_5.5rem_1fr] items-center gap-x-1.5 sm:gap-x-2">
        <div className="flex flex-wrap justify-end gap-1.5">
          {minus.map((s) => (
            <Button
              key={s.label}
              type="button"
              variant="outline"
              size="sm"
              className={btnClass}
              onClick={() => bump(s.delta)}
            >
              {s.label}
            </Button>
          ))}
        </div>
        <Input
          className="h-11 w-[5.5rem] tabular-nums text-center"
          inputMode="decimal"
          value={formatTampilan(value, decimals)}
          onChange={(e) => apply(parseTampilan(e.target.value))}
          required={required}
          aria-label={label}
        />
        <div className="flex flex-wrap justify-start gap-1.5">
          {plus.map((s) => (
            <Button
              key={s.label}
              type="button"
              variant="outline"
              size="sm"
              className={btnClass}
              onClick={() => bump(s.delta)}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
