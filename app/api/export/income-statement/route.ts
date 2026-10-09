import { NextResponse } from "next/server";
import { requireExportRole, parsePeriodParams } from "@/lib/export-auth";
import { buildIncomeStatement } from "@/lib/income-statement";
import { incomeStatementPdfLines, pdfBufferFromReport } from "@/lib/pdf-simple";

export async function GET(request: Request) {
  const session = await requireExportRole(["ADMIN", "OWNER"]);
  if (!session) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const url = new URL(request.url);
  const { dari, sampai, start, end } = parsePeriodParams(url);
  const report = await buildIncomeStatement(start, end);
  const lines = incomeStatementPdfLines(`${dari} s/d ${sampai}`, report.lines);
  const buffer = pdfBufferFromReport("Laporan Laba Rugi — Kokonus Farm", lines);
  const filename = `laba-rugi-${dari}-${sampai}.pdf`;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
