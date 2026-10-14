import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";
import { buildPelangganRiwayatDocument } from "@/lib/pelanggan-riwayat";

export const GET = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const params = (context as { params?: { id: string } })?.params;
  const id = Number(params?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return new Response("Pelanggan tidak valid.", { status: 400 });
  }
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await buildPelangganRiwayatDocument(id);
  if (!doc) return new Response("Pelanggan tidak ditemukan.", { status: 404 });
  return respondExportDocument(doc, `pelanggan-${id}-riwayat`, format, orient);
});
