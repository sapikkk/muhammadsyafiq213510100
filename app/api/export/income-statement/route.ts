import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parsePeriodParams } from "@/lib/export-auth";
import { buildIncomeStatement } from "@/lib/income-statement";
import { incomeStatementPdfLines, pdfBufferFromReport } from "@/lib/pdf-simple";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
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
});
