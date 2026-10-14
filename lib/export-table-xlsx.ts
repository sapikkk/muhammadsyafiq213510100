import type { ExportDocument } from "@/lib/export-document-types";

export async function xlsxBufferFromExportDocument(doc: ExportDocument): Promise<Buffer> {
  const XLSX = await import("xlsx");
  const book = XLSX.utils.book_new();

  for (let i = 0; i < doc.sections.length; i++) {
    const sec = doc.sections[i];
    const aoa: string[][] = [];
    if (doc.subtitleLines?.length && i === 0) {
      aoa.push([doc.title]);
      for (const line of doc.subtitleLines) aoa.push([line]);
      aoa.push([]);
    }
    if (sec.title) aoa.push([sec.title]);
    aoa.push(sec.headers);
    for (const row of sec.rows) aoa.push(row);
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    const name = (sec.title ?? `Tabel ${i + 1}`).slice(0, 31) || `Sheet${i + 1}`;
    XLSX.utils.book_append_sheet(book, sheet, name.replace(/[\\/?*[\]]/g, "_"));
  }

  if (doc.sections.length === 0) {
    const sheet = XLSX.utils.aoa_to_sheet([[doc.title], ...(doc.subtitleLines ?? []).map((l) => [l])]);
    XLSX.utils.book_append_sheet(book, sheet, "Laporan");
  }

  return Buffer.from(XLSX.write(book, { type: "buffer", bookType: "xlsx" }));
}
