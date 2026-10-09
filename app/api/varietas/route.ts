import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { isVarietasStatus } from "@/lib/varietas-status";
import {
  VarietasError,
  createVarietas,
  listVarietas,
  parseVarietasInput,
  serializeVarietas,
  setVarietasStatus,
} from "@/lib/varietas";

function handleError(error: unknown) {
  if (error instanceof VarietasError) {
    return apiFail("VARIETAS_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const onlyAktif = url.searchParams.get("aktif") === "1";
  const rows = await listVarietas(onlyAktif);
  return apiOk(rows.map(serializeVarietas));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  try {
    const row = await createVarietas(parseVarietasInput(await request.json()));
    return apiOk(serializeVarietas(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});

export const PUT = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  try {
    const raw = await request.json();
    const id = Number(raw.id);
    const status = String(raw.status ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new VarietasError("Pilih varietas.", 400);
    }
    if (!isVarietasStatus(status)) {
      throw new VarietasError("Status harus AKTIF atau NONAKTIF.", 400);
    }
    const row = await setVarietasStatus(id, status);
    return apiOk(serializeVarietas(row));
  } catch (error) {
    return handleError(error);
  }
});
