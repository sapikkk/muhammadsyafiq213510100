import type { ExportFormat, ExportOrientation } from "@/lib/export-document-types";

export function parseExportFormat(raw: string | null): ExportFormat {
  const v = (raw ?? "pdf").trim().toLowerCase();
  return v === "xlsx" ? "xlsx" : "pdf";
}

export function parseExportOrientation(raw: string | null): ExportOrientation {
  const v = (raw ?? "portrait").trim().toLowerCase();
  return v === "landscape" ? "landscape" : "portrait";
}

/** YYYY-MM-DD; fallback hari ini jika tidak valid. */
export function parseIsoDate(raw: string | null, fallback: Date): Date {
  const text = (raw ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [y, m, d] = text.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  }
  return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate(), 12, 0, 0, 0);
}

export function parseDateRangeParams(url: URL) {
  const now = new Date();
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const tglAwal = parseIsoDate(url.searchParams.get("tglAwal"), monthAgo);
  const tglAkhir = parseIsoDate(url.searchParams.get("tglAkhir"), now);
  const start = tglAwal <= tglAkhir ? tglAwal : tglAkhir;
  const end = tglAwal <= tglAkhir ? tglAkhir : tglAwal;
  end.setHours(23, 59, 59, 999);
  start.setHours(0, 0, 0, 0);
  return {
    tglAwal: start.toISOString().slice(0, 10),
    tglAkhir: end.toISOString().slice(0, 10),
    start,
    end,
  };
}

export function appendExportQuery(
  base: URLSearchParams,
  format: ExportFormat,
  orient: ExportOrientation,
) {
  base.set("format", format);
  base.set("orient", orient);
  return base;
}
