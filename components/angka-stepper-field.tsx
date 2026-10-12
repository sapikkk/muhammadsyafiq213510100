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

  return (
    <div className="space-y-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input type="hidden" name={name} value={value.toFixed(decimals)} />
      <div className="flex flex-wrap items-center gap-1.5">
        {minus.map((s) => (
          <Button
            key={s.label}
            type="button"
            variant="outline"
            size="sm"
            className="h-9 min-w-[2.75rem] px-2 tabular-nums"
            onClick={() => bump(s.delta)}
          >
            {s.label}
          </Button>
        ))}
        <Input
          className="h-11 w-[4.5rem] shrink-0 tabular-nums text-center"
          inputMode="decimal"
          value={formatTampilan(value, decimals)}
          onChange={(e) => apply(parseTampilan(e.target.value))}
          required={required}
          aria-label={label}
        />
        {plus.map((s) => (
          <Button
            key={s.label}
            type="button"
            variant="outline"
            size="sm"
            className="h-9 min-w-[2.75rem] px-2 tabular-nums"
            onClick={() => bump(s.delta)}
          >
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
