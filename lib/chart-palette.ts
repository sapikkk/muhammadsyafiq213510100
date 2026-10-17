"use client";

import { useUiTheme } from "@/components/ui-theme-provider";
import {
  CHART_PRIMARY,
  CHART_SECONDARY,
  CHART_TERTIARY,
  chartFillAt,
} from "@/lib/chart-monochrome";

/** Palet grafik saat tema Lime aktif (hijau farm + aksen lime). */
export const CHART_LIME_FILLS = [
  "#1a3d2e",
  "#2d5a45",
  "#d3fa53",
  "#6b9080",
  "#a4c3b2",
  "#eef9c8",
] as const;

export const CHART_LIME_PRIMARY = CHART_LIME_FILLS[0];
export const CHART_LIME_SECONDARY = CHART_LIME_FILLS[2];
export const CHART_LIME_TERTIARY = CHART_LIME_FILLS[3];

export function chartLimeFillAt(i: number): string {
  return CHART_LIME_FILLS[i % CHART_LIME_FILLS.length];
}

export function useChartPalette() {
  const { theme } = useUiTheme();
  const lime = theme === "lime";
  return {
    lime,
    primary: lime ? CHART_LIME_PRIMARY : CHART_PRIMARY,
    secondary: lime ? CHART_LIME_SECONDARY : CHART_SECONDARY,
    tertiary: lime ? CHART_LIME_TERTIARY : CHART_TERTIARY,
    fillAt: (i: number) => (lime ? chartLimeFillAt(i) : chartFillAt(i)),
  };
}
