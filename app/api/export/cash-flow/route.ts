import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parsePeriodParams } from "@/lib/export-auth";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { buildCashFlowDocument } from "@/lib/export-finance-documents";
import { respondExportDocument } from "@/lib/export-response";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const { dari, sampai } = parsePeriodParams(url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await buildCashFlowDocument(dari, sampai);
  return respondExportDocument(doc, `arus-kas-${dari}-${sampai}`, format, orient);
});
