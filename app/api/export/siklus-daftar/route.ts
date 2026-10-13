import { withApiHandler } from "@/lib/api-response";
import { buildSiklusDaftarDocument } from "@/lib/export-daftar-documents";
import { respondListExport } from "@/lib/export-list-handler";

export const GET = withApiHandler(async (request: Request) =>
  respondListExport(request, ["PEKERJA", "ADMIN", "OWNER"], "siklus-daftar", buildSiklusDaftarDocument),
);
