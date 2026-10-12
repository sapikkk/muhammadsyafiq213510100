/** Grafik keuangan: hitam–putih dulu (grayscale HSL). */
export const CHART_FILL = [
  "hsl(0 0% 9%)",
  "hsl(0 0% 28%)",
  "hsl(0 0% 45%)",
  "hsl(0 0% 58%)",
  "hsl(0 0% 72%)",
  "hsl(0 0% 85%)",
] as const;

export const CHART_PRIMARY = CHART_FILL[0];
export const CHART_SECONDARY = CHART_FILL[2];
export const CHART_TERTIARY = CHART_FILL[4];

export function chartFillAt(i: number): string {
  return CHART_FILL[i % CHART_FILL.length];
}
