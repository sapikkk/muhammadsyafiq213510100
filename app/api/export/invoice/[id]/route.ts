import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";
import { buildInvoicePelangganDocument } from "@/lib/export-invoice-doc";
import { SalesOrderError } from "@/lib/sales-order";

export const GET = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const params = (context as { params?: { id: string } })?.params;
  const id = Number(params?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return new Response("Pesanan tidak valid.", { status: 400 });
  }
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  try {
    const doc = await buildInvoicePelangganDocument(id);
    return respondExportDocument(doc, `faktur-so-${id}`, format, orient);
  } catch (e) {
    if (e instanceof SalesOrderError) {
      return new Response(e.message, { status: e.status });
    }
    throw e;
  }
});
