import type { ExportDocument, ExportTableSection } from "@/lib/export-document-types";

const TEXT_HEADER =
  /^(nama|pelanggan|status|keterangan|lokasi|produksi|jenis|field|pos|akun|catatan|waktu|tanggal|petani|dibuat|tahap|penyebab|varietas|greenhouse|kolam|satuan|fase|dari|ke|item|merk|siklus|no\.\s*faktur|faktur|invoice)$/i;

export function cellLooksNumeric(value: string): boolean {
  const t = value.trim();
  if (!t || t === "—" || t === "-") return false;
  if (t.startsWith("Rp")) return true;
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return false;
  return /^-?\d[\d.,\s]*$/.test(t);
}

export function inferAlignRight(headers: string[], rows: string[][]): number[] {
  const right = new Set<number>();
  for (let c = 0; c < headers.length; c++) {
    const h = (headers[c] ?? "").trim();
    if (TEXT_HEADER.test(h)) continue;
    if (
      /(rp\)|nominal|total|harga|stok|qty|jumlah|debit|kredit|margin|masuk|keluar|net|berat|unit|minimum|kekurangan|subtotal|saldo|omzet|packing|tagihan|biji|benih|kecambah|disemai|layak|susut|ph|ppm|suhu|gram|ekor|hari|%|nilai)/i.test(
        h,
      )
    ) {
      right.add(c);
      continue;
    }
    if (h === "Field") {
      right.add(1);
      continue;
    }
    let numeric = 0;
    let total = 0;
    for (const row of rows) {
      const v = row[c] ?? "";
      if (!v.trim() || v === "—") continue;
      total++;
      if (cellLooksNumeric(v)) numeric++;
    }
    if (total > 0 && numeric / total >= 0.6) right.add(c);
  }
  return Array.from(right).sort((a, b) => a - b);
}

export function normalizeExportSection(sec: ExportTableSection): ExportTableSection {
  return {
    ...sec,
    alignRight: sec.alignRight ?? inferAlignRight(sec.headers, sec.rows),
  };
}

export function normalizeExportDocument(doc: ExportDocument): ExportDocument {
  return {
    ...doc,
    sections: doc.sections.map(normalizeExportSection),
  };
}
