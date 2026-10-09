import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  SiklusError,
  lanjutFase,
  serializeSiklus,
  getSiklusProduksi,
  listSiklusProduksi,
} from "@/lib/siklus-produksi";

function handleError(error: unknown) {
  if (error instanceof SiklusError) {
    return apiFail("SIKLUS_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const PUT = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied, session } = await requireApiRole(["PEKERJA"]);
  if (denied) return denied;
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return apiFail("INVALID_ID", "id tidak valid.", 400);
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const hasil = await lanjutFase(id, userId, body);
    const rows = await listSiklusProduksi();
    const row = rows.find((r) => r.id === id);
    return apiOk({
      fase_dari: hasil.fase_dari,
      fase_ke: hasil.fase_ke,
      label_ke: hasil.label_ke,
      siklus: row ? serializeSiklus(row) : null,
    });
  } catch (error) {
    return handleError(error);
  }
});

export const GET = withApiHandler(async (_request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return apiFail("INVALID_ID", "id tidak valid.", 400);
  }
  const siklus = await getSiklusProduksi(id);
  if (!siklus) {
    return apiFail("NOT_FOUND", "Siklus tidak ditemukan.", 404);
  }
  const rows = await listSiklusProduksi();
  const row = rows.find((r) => r.id === id)!;
  return apiOk(serializeSiklus(row));
});
