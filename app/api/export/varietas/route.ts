import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { buildVarietasDocument } from "@/lib/export-daftar-documents";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";

export const GET = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["PEKERJA", "ADMIN", "OWNER"]);
  if (denied) return denied;
  const role = session!.user!.role!;
  const onlyAktif = role === "PEKERJA";
  const includeRataHpp = role !== "PEKERJA";
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await buildVarietasDocument({ onlyAktif, includeRataHpp });
  return respondExportDocument(doc, "varietas", format, orient);
});
