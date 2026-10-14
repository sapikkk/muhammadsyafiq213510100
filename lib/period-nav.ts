const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

export type PeriodeMode = "bulan" | "rentang";

export function defaultYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function isYearMonth(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

export function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function shiftYearMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function labelBulanIndonesia(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  if (!y || m < 1 || m > 12) return ym;
  return `${NAMA_BULAN[m - 1]} ${y}`;
}

/** Akhir bulan (YYYY-MM-DD) untuk YYYY-MM. */
export function akhirBulanIso(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  const last = new Date(y, m, 0);
  return `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, "0")}-${String(last.getDate()).padStart(2, "0")}`;
}

export function parsePeriodeMode(raw: string | undefined): PeriodeMode {
  return raw === "rentang" ? "rentang" : "bulan";
}
