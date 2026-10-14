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

/** Di layar sempit, hanya tampilkan tombol dengan langkah «tengah» (mis. ±10 PPM). */
function kelasTombolSempit(compact: boolean, delta: number, grup: AngkaStepTombol[]) {
  if (!compact || grup.length <= 2) return "";
  const abs = [...grup.map((g) => Math.abs(g.delta))].sort((a, b) => a - b);
  const mid = abs[Math.floor(abs.length / 2)]!;
  return Math.abs(delta) === mid ? "" : "max-[479px]:hidden";
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
  compactOnNarrow,
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
  /** Layar ≤479px: kurangi tombol stepper (form monitor kolam). */
  compactOnNarrow?: boolean;
}) {
  const apply = (next: number) => {
    let v = roundTo(next, decimals);
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    onChange(v);
  };

  const bump = (delta: number) => apply(value + delta);

  const btnClass =
    "h-11 min-w-[3.25rem] shrink-0 px-2 tabular-nums text-xs sm:text-sm";

  const renderTombol = (s: AngkaStepTombol, grup: AngkaStepTombol[]) => (
    <Button
      key={s.label}
      type="button"
      variant="outline"
      size="sm"
      className={`${btnClass} ${kelasTombolSempit(Boolean(compactOnNarrow), s.delta, grup)}`}
      onClick={() => bump(s.delta)}
    >
      {s.label}
    </Button>
  );

  return (
    <div className="mx-auto w-full max-w-md space-y-2 text-sm">
      <p className="text-center font-medium">{label}</p>
      <input type="hidden" name={name} value={value.toFixed(decimals)} />
      <div className="grid w-full grid-cols-[1fr_5.5rem_1fr] items-center gap-x-1.5 sm:gap-x-2 max-[479px]:max-w-sm max-[479px]:grid-cols-1 max-[479px]:gap-3">
        <div className="flex flex-wrap justify-end gap-1.5 max-[479px]:order-2 max-[479px]:justify-center">
          {minus.map((s) => renderTombol(s, minus))}
        </div>
        <Input
          className="h-11 w-[5.5rem] justify-self-center tabular-nums text-center max-[479px]:order-1 max-[479px]:w-full max-[479px]:max-w-[8rem]"
          inputMode="decimal"
          value={formatTampilan(value, decimals)}
          onChange={(e) => apply(parseTampilan(e.target.value))}
          required={required}
          aria-label={label}
        />
        <div className="flex flex-wrap justify-start gap-1.5 max-[479px]:order-3 max-[479px]:justify-center">
          {plus.map((s) => renderTombol(s, plus))}
        </div>
      </div>
    </div>
  );
}
