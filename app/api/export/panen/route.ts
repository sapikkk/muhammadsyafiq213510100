import { withApiHandler } from "@/lib/api-response";
import { buildPanenDocument } from "@/lib/export-daftar-documents";
import { respondListExport } from "@/lib/export-list-handler";

export const GET = withApiHandler(async (request: Request) =>
  respondListExport(request, ["ADMIN", "OWNER"], "laporan-panen", buildPanenDocument),
);
