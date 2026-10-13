import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parsePeriodParams } from "@/lib/export-auth";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { buildBalanceSheetDocument } from "@/lib/export-finance-documents";
import { respondExportDocument } from "@/lib/export-response";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const { end } = parsePeriodParams(url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await buildBalanceSheetDocument(end);
  const asOf = doc.subtitleLines?.[0]?.replace("Per tanggal: ", "") ?? "neraca";
  return respondExportDocument(doc, `neraca-${asOf}`, format, orient);
});
