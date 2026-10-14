import { withApiHandler } from "@/lib/api-response";
import { buildPenjualanDocument } from "@/lib/export-daftar-documents";
import { respondListExport } from "@/lib/export-list-handler";

export const GET = withApiHandler(async (request: Request) =>
  respondListExport(request, ["ADMIN", "OWNER"], "penjualan", () => buildPenjualanDocument(true)),
);
