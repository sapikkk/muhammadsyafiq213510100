import "server-only";

import { formatRupiah } from "@/lib/format";
import type { ExportDocument } from "@/lib/export-document-types";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { buildCashFlow } from "@/lib/cash-flow";
import { buildIncomeStatement } from "@/lib/income-statement";

export function incomeStatementDocument(
  periodeLabel: string,
  lines: { label: string; nominal: string }[],
): ExportDocument {
  return {
    title: "Laba rugi — Kokonus Farm",
    subtitleLines: [
      `Periode: ${periodeLabel}`,
      "Sumber: jurnal berstatus disetujui dalam periode.",
    ],
    sections: [
      {
        headers: ["Pos", "Nominal (Rp)"],
        rows: lines.map((l) => [l.label, formatRupiah(l.nominal)]),
      },
    ],
  };
}

export async function buildIncomeStatementDocument(start: Date, end: Date, periodeLabel: string) {
  const report = await buildIncomeStatement(start, end);
  return incomeStatementDocument(periodeLabel, report.lines);
}

export async function buildBalanceSheetDocument(end: Date) {
  const sheet = await buildBalanceSheet(end);
  const sections = sheet.sections.flatMap((sec) => {
    const rows = sec.rows.map((r) => [r.nama, formatRupiah(r.saldo)]);
    rows.push([`Subtotal ${sec.tipe}`, formatRupiah(sec.subtotal)]);
    return [
      {
        title: sec.tipe,
        headers: ["Akun", "Saldo (Rp)"],
        rows,
      },
    ];
  });
  sections.push({
    title: "Ringkasan",
    headers: ["Pos", "Nominal (Rp)"],
    rows: [
      ["Total aset", formatRupiah(sheet.totalAset)],
      ["Total kewajiban + modal", formatRupiah(sheet.totalKewajibanModal)],
    ],
  });
  return {
    title: "Neraca — Kokonus Farm",
    subtitleLines: [`Per tanggal: ${sheet.asOf}`],
    sections,
  } satisfies ExportDocument;
}

export async function buildCashFlowDocument(dari: string, sampai: string) {
  const report = await buildCashFlow({ dari, sampai });
  const ringkas: ExportDocument = {
    title: "Arus kas — Kokonus Farm",
    subtitleLines: [
      `Periode: ${report.dari} s/d ${report.sampai}`,
      `Saldo awal kas: ${formatRupiah(report.saldoAwal)}`,
      `Perubahan bersih: ${formatRupiah(report.netChange)}`,
      `Saldo akhir kas: ${formatRupiah(report.saldoAkhir)}`,
    ],
    sections: [
      {
        title: "Ringkas per kategori",
        headers: ["Kategori", "Masuk (Rp)", "Keluar (Rp)", "Net (Rp)"],
        rows: report.sections.map((s) => [
          s.label,
          formatRupiah(s.masuk),
          formatRupiah(s.keluar),
          formatRupiah(s.net),
        ]),
      },
      {
        title: "Rincian per jurnal",
        headers: ["Tanggal", "Kategori", "Keterangan", "Masuk (Rp)", "Keluar (Rp)"],
        rows: report.movements.map((m) => [
          m.tanggal,
          m.kategori,
          m.keterangan.slice(0, 80),
          formatRupiah(m.masuk),
          formatRupiah(m.keluar),
        ]),
      },
    ],
  };
  return ringkas;
}
