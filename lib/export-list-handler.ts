import "server-only";

import { requireApiRole } from "@/lib/api-auth";
import type { ExportDocument } from "@/lib/export-document-types";
import { parseExportFormat, parseExportOrientation } from "@/lib/export-params";
import { respondExportDocument } from "@/lib/export-response";
import type { Role } from "@/types/role";

export async function respondListExport(
  request: Request,
  allowed: readonly Role[],
  fileStem: string,
  build: () => Promise<ExportDocument>,
) {
  const { denied } = await requireApiRole(allowed);
  if (denied) return denied;
  const url = new URL(request.url);
  const format = parseExportFormat(url.searchParams.get("format"));
  const orient = parseExportOrientation(url.searchParams.get("orient"));
  const doc = await build();
  return respondExportDocument(doc, fileStem, format, orient);
}
