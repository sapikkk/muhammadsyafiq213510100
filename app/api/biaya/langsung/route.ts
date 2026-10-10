import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  BiayaError,
  listBiayaLangsungBySiklus,
  serializeBiayaLangsung,
  updateBiayaLangsung,
} from "@/lib/biaya";

function handleError(error: unknown) {
  if (error instanceof BiayaError) {
    return apiFail("BIAYA_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const siklusId = Number(new URL(request.url).searchParams.get("siklusId"));
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    return apiFail("INVALID_QUERY", "siklusId wajib.", 400);
  }
  const row = await listBiayaLangsungBySiklus(siklusId);
  if (!row) return apiFail("NOT_FOUND", "Tidak ditemukan.", 404);
  return apiOk(serializeBiayaLangsung(row));
});

export const PUT = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const body = await request.json();
    const siklusId = Number(body.siklusId);
    if (!Number.isInteger(siklusId) || siklusId <= 0) {
      return apiFail("INVALID_BODY", "siklusId wajib.", 400);
    }
    const row = await updateBiayaLangsung(siklusId, body);
    const full = await listBiayaLangsungBySiklus(row.siklus_id);
    if (!full) return apiFail("NOT_FOUND", "Tidak ditemukan.", 404);
    return apiOk(serializeBiayaLangsung(full));
  } catch (error) {
    return handleError(error);
  }
});
