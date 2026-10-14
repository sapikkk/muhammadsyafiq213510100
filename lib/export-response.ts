import { NextResponse } from "next/server";
import type { ExportDocument, ExportFormat, ExportOrientation } from "@/lib/export-document-types";
import { normalizeExportDocument } from "@/lib/export-align";
import { pdfBufferFromExportDocument } from "@/lib/pdf-table-document";
import { xlsxBufferFromExportDocument } from "@/lib/export-table-xlsx";

export async function respondExportDocument(
  doc: ExportDocument,
  filenameBase: string,
  format: ExportFormat,
  orient: ExportOrientation,
) {
  const normalized = normalizeExportDocument(doc);
  if (format === "xlsx") {
    const buffer = await xlsxBufferFromExportDocument(normalized);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filenameBase}.xlsx"`,
      },
    });
  }
  const buffer = await pdfBufferFromExportDocument(normalized, orient);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filenameBase}.pdf"`,
    },
  });
}
