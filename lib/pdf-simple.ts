import { jsPDF } from "jspdf";
import { formatRupiah } from "@/lib/format";

export function pdfBufferFromReport(title: string, lines: string[]): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFontSize(14);
  doc.text(title, 14, 18);
  doc.setFontSize(10);
  let y = 28;
  for (const line of lines) {
    const wrapped = doc.splitTextToSize(line, 180);
    for (const part of wrapped) {
      if (y > 285) {
        doc.addPage();
        y = 20;
      }
      doc.text(part, 14, y);
      y += 5;
    }
  }
  return Buffer.from(doc.output("arraybuffer"));
}

export function incomeStatementPdfLines(
  periode: string,
  rows: { label: string; nominal: string }[],
): string[] {
  return [
    `Periode: ${periode}`,
    "",
    ...rows.map((r) => `${r.label}: ${formatRupiah(r.nominal)}`),
    "",
    "Sumber: jurnal berstatus APPROVED dalam periode.",
  ];
}

export function balanceSheetPdfLines(
  asOf: string,
  sections: { tipe: string; rows: { kode: string; nama: string; saldo: string }[]; subtotal: string }[],
  footer: { totalAset: string; totalKewajibanModal: string },
): string[] {
  const lines = [`Per tanggal: ${asOf}`, ""];
  for (const sec of sections) {
    lines.push(`--- ${sec.tipe} ---`);
    for (const r of sec.rows) {
      lines.push(`${r.kode} ${r.nama}: ${formatRupiah(r.saldo)}`);
    }
    lines.push(`Subtotal ${sec.tipe}: ${formatRupiah(sec.subtotal)}`, "");
  }
  lines.push(
    `Total aset: ${formatRupiah(footer.totalAset)}`,
    `Total kewajiban + modal: ${formatRupiah(footer.totalKewajibanModal)}`,
  );
  return lines;
}
