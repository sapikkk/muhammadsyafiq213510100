import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parsePeriodParams } from "@/lib/export-auth";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { balanceSheetPdfLines, pdfBufferFromReport } from "@/lib/pdf-simple";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const { end } = parsePeriodParams(url);
  const sheet = await buildBalanceSheet(end);
  const lines = balanceSheetPdfLines(sheet.asOf, sheet.sections, {
    totalAset: sheet.totalAset,
    totalKewajibanModal: sheet.totalKewajibanModal,
  });
  const buffer = pdfBufferFromReport("Neraca — Kokonus Farm", lines);
  const filename = `neraca-${sheet.asOf}.pdf`;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});
