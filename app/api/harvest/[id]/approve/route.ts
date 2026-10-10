import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { approveLaporanPanen, HarvestError } from "@/lib/laporan-panen";

export const POST = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied, session } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const userId = Number(session?.user?.id);
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return apiFail("INVALID_ID", "ID tidak valid.", 400);
  }
  try {
    let raw: Record<string, unknown> = {};
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      raw = {};
    }
    const result = await approveLaporanPanen(id, userId, raw);
    return apiOk({ status: result.status });
  } catch (error) {
    if (error instanceof HarvestError) {
      return apiFail("HARVEST_ERROR", error.message, error.status);
    }
    throw error;
  }
});
