import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  HarvestError,
  kirimLaporanPanen,
  listLaporanPanen,
  parseHarvestInput,
  serializeLaporanPanen,
} from "@/lib/laporan-panen";

function handleError(error: unknown) {
  if (error instanceof HarvestError) {
    return apiFail("HARVEST_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const status = new URL(request.url).searchParams.get("status") ?? undefined;
  const rows = await listLaporanPanen(status || undefined);
  return apiOk(rows.map(serializeLaporanPanen));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["PEKERJA"]);
  if (denied) return denied;
  const userId = Number(session?.user?.id);
  if (!Number.isInteger(userId)) {
    return apiFail("UNAUTHORIZED", "Sesi tidak valid.", 401);
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const laporan = await kirimLaporanPanen(userId, parseHarvestInput(body));
    return apiOk({ id: laporan.id, status: laporan.status }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
