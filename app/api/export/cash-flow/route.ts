import { NextResponse } from "next/server";
import { requireExportRole, parsePeriodParams } from "@/lib/export-auth";
import { buildCashFlow } from "@/lib/cash-flow";
import { cashFlowPdfLines, pdfBufferFromReport } from "@/lib/pdf-simple";

export async function GET(request: Request) {
  const session = await requireExportRole(["ADMIN", "OWNER"]);
  if (!session) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const url = new URL(request.url);
  const { dari, sampai } = parsePeriodParams(url);
  const report = await buildCashFlow({ dari, sampai });
  const lines = cashFlowPdfLines(
    `${dari} s/d ${sampai}`,
    {
      saldoAwal: report.saldoAwal,
      netChange: report.netChange,
      saldoAkhir: report.saldoAkhir,
    },
    report.sections.map((s) => ({
      label: s.label,
      masuk: s.masuk,
      keluar: s.keluar,
      net: s.net,
    })),
  );
  const buffer = pdfBufferFromReport("Laporan Arus Kas — Kokonus Farm", lines);
  const filename = `arus-kas-${dari}-${sampai}.pdf`;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
