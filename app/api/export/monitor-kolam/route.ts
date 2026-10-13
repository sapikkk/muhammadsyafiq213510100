import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parseDateRangeParams, parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";
import {
  buildMonitorKolamDocument,
  parseMonitorExportFilter,
} from "@/lib/monitor-kolam-export";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["PEKERJA", "ADMIN", "OWNER"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const { start, end, tglAwal, tglAkhir } = parseDateRangeParams(url);
  const filter = parseMonitorExportFilter(url, start, end);
  const doc = await buildMonitorKolamDocument(filter, tglAwal, tglAkhir);
  return respondExportDocument(doc, `monitor-kolam-${tglAwal}-${tglAkhir}`, format, orient);
});
