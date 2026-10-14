import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";
import { buildSiklusPaketDocument } from "@/lib/export-siklus-paket";

export const GET = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["PEKERJA", "ADMIN", "OWNER"]);
  if (denied) return denied;
  const params = (context as { params?: { id: string } })?.params;
  const id = Number(params?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return new Response("Siklus tidak valid.", { status: 400 });
  }
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await buildSiklusPaketDocument(id);
  if (!doc) return new Response("Siklus tidak ditemukan.", { status: 404 });
  return respondExportDocument(doc, `siklus-${id}-berkas`, format, orient);
});
