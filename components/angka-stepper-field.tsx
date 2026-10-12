"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function formatTampilan(n: number, decimals: number) {
  if (!Number.isFinite(n)) return "";
  return n.toFixed(decimals).replace(".", ",");
}

function parseTampilan(raw: string): number {
  const s = raw.trim().replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

export function AngkaStepperField({
  label,
  name,
  value,
  onChange,
  stepKecil,
  stepBesar,
  labelKecil,
  labelBesar,
  decimals,
  required,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (next: number) => void;
  stepKecil: number;
  stepBesar: number;
  labelKecil: string;
  labelBesar: string;
  decimals: number;
  required?: boolean;
}) {
  const bump = (delta: number) => {
    const next = Math.round((value + delta) * 10 ** decimals) / 10 ** decimals;
    onChange(next);
  };

  return (
    <div className="space-y-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input type="hidden" name={name} value={value.toFixed(decimals)} />
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="h-11 w-24 tabular-nums"
          inputMode="decimal"
          value={formatTampilan(value, decimals)}
          onChange={(e) => onChange(parseTampilan(e.target.value))}
          required={required}
          aria-label={label}
        />
        <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => bump(stepKecil)}>
          {labelKecil}
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => bump(stepBesar)}>
          {labelBesar}
        </Button>
      </div>
    </div>
  );
}
