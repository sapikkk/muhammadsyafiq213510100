import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { rejectLaporanPanen, HarvestError } from "@/lib/laporan-panen";

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
    const body = (await request.json()) as { alasan: string };
    if (!body.alasan) {
      throw new HarvestError("Alasan wajib diisi.", 400);
    }
    const result = await rejectLaporanPanen(id, userId, body.alasan);
    return apiOk({ status: result.status });
  } catch (error) {
    if (error instanceof HarvestError) {
      return apiFail("HARVEST_ERROR", error.message, error.status);
    }
    if (error instanceof SyntaxError) {
      return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
    }
    throw error;
  }
});
