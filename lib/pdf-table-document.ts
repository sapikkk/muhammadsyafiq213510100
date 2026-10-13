import type { ExportDocument, ExportOrientation } from "@/lib/export-document-types";

function pageSize(orient: ExportOrientation) {
  return orient === "landscape"
    ? { w: 297, h: 210, margin: 12, contentW: 273 }
    : { w: 210, h: 297, margin: 14, contentW: 182 };
}

function drawTable(
  doc: {
    setFont: (face: string, style: string) => void;
    splitTextToSize: (text: string, maxWidth: number) => string[];
    addPage: () => void;
    text: (text: string, x: number, y: number) => void;
    setDrawColor: (v: number) => void;
    rect: (x: number, y: number, w: number, h: number) => void;
    line: (x1: number, y1: number, x2: number, y2: number) => void;
  },
  x: number,
  y: number,
  contentW: number,
  headers: string[],
  rows: string[][],
  startY: number,
  pageH: number,
  margin: number,
): number {
  const colCount = headers.length;
  const colW = contentW / colCount;
  let cy = startY;

  const drawRow = (cells: string[], bold: boolean) => {
    if (bold) doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    let maxLines = 1;
    const wrapped: string[][] = cells.map((cell) => {
      const lines = doc.splitTextToSize(cell, colW - 2);
      maxLines = Math.max(maxLines, lines.length);
      return lines;
    });
    const rowH = maxLines * 4.5 + 2;
    if (cy + rowH > pageH - margin) {
      doc.addPage();
      cy = margin + 8;
    }
    doc.setDrawColor(180);
    doc.rect(x, cy - 4, contentW, rowH);
    for (let c = 0; c < colCount; c++) {
      const cx = x + c * colW;
      doc.line(cx, cy - 4, cx, cy - 4 + rowH);
      const lines = wrapped[c];
      for (let li = 0; li < lines.length; li++) {
        doc.text(lines[li], cx + 1.5, cy + li * 4.5);
      }
    }
    cy += rowH;
    return cy;
  };

  cy = drawRow(headers, true);
  doc.setFont("helvetica", "normal");
  for (const row of rows) {
    cy = drawRow(row, false);
  }
  return cy;
}

export async function pdfBufferFromExportDocument(
  doc: ExportDocument,
  orient: ExportOrientation = "portrait",
): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");
  const { w, h, margin, contentW } = pageSize(orient);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: orient });
  pdf.setFontSize(14);
  pdf.text(doc.title, margin, 16);
  pdf.setFontSize(9);
  let y = 24;
  for (const line of doc.subtitleLines ?? []) {
    pdf.text(line, margin, y);
    y += 5;
  }
  y += 4;

  for (const section of doc.sections) {
    if (section.title) {
      if (y > h - margin - 20) {
        pdf.addPage();
        y = margin + 8;
      }
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text(section.title, margin, y);
      pdf.setFont("helvetica", "normal");
      y += 7;
    }
    y = drawTable(pdf, margin, y, contentW, section.headers, section.rows, y, h, margin);
    y += 6;
  }

  return Buffer.from(pdf.output("arraybuffer"));
}

/** Teks bebas (laporan lama) + orientasi. */
export async function pdfBufferFromLines(
  title: string,
  lines: string[],
  orient: ExportOrientation = "portrait",
): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");
  const { h, margin } = pageSize(orient);
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: orient });
  doc.setFontSize(14);
  doc.text(title, margin, 18);
  doc.setFontSize(10);
  let y = 28;
  for (const line of lines) {
    const wrapped = doc.splitTextToSize(line, pageSize(orient).contentW);
    for (const part of wrapped) {
      if (y > h - margin) {
        doc.addPage();
        y = margin + 8;
      }
      doc.text(part, margin, y);
      y += 5;
    }
  }
  return Buffer.from(doc.output("arraybuffer"));
}
