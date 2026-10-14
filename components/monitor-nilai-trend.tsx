"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { MonitorTrendIndex } from "@/lib/monitor-trend-index";
import { cn } from "@/lib/utils";

function fmtDelta(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 100) return abs.toLocaleString("id-ID", { maximumFractionDigits: 0 });
  return abs.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

function labelTrend(tren: MonitorTrendIndex, satuan?: string): string {
  const suf = satuan ? ` ${satuan}` : "";
  if (tren.arah === "tidak_ada") return "Belum ada pembanding pada halaman ini.";
  if (tren.arah === "sama") return `Sama dengan catatan sebelumnya${suf}.`;
  if (tren.arah === "naik") return `Naik ${fmtDelta(tren.delta)}${suf} dari catatan sebelumnya.`;
  return `Turun ${fmtDelta(tren.delta)}${suf} dari catatan sebelumnya.`;
}

export function MonitorNilaiTrend({
  nilai,
  tren,
  satuan,
  className,
}: {
  nilai: string;
  tren: MonitorTrendIndex;
  satuan?: string;
  className?: string;
}) {
  const Icon =
    tren.arah === "naik"
      ? TrendingUp
      : tren.arah === "turun"
        ? TrendingDown
        : tren.arah === "sama"
          ? Minus
          : null;

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 tabular-nums", className)}
      title={labelTrend(tren, satuan)}
    >
      <span>{nilai}</span>
      {Icon ? (
        <Icon
          className={cn(
            "size-3.5 shrink-0",
            tren.arah === "naik" && "text-foreground",
            tren.arah === "turun" && "text-muted-foreground",
            tren.arah === "sama" && "text-muted-foreground/70",
          )}
          aria-hidden
        />
      ) : (
        <span className="text-muted-foreground/50 text-xs" aria-hidden>
          —
        </span>
      )}
      {tren.arah === "naik" || tren.arah === "turun" ? (
        <span className="text-[10px] text-muted-foreground">
          {tren.arah === "naik" ? "+" : "−"}
          {fmtDelta(tren.delta)}
        </span>
      ) : null}
    </span>
  );
}
