import { NextResponse } from "next/server";
import { requireExportRole, parsePeriodParams } from "@/lib/export-auth";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { balanceSheetPdfLines, pdfBufferFromReport } from "@/lib/pdf-simple";

export async function GET(request: Request) {
  const session = await requireExportRole(["ADMIN", "OWNER"]);
  if (!session) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
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
}
