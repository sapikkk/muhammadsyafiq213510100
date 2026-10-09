import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  ActivePackError,
  buatActivePack,
  listActivePack,
  pakaiActivePack,
  parseActivePackInput,
  serializeActivePack,
} from "@/lib/active-pack";

function handleError(error: unknown) {
  if (error instanceof ActivePackError) {
    return apiFail("ACTIVE_PACK_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "PEKERJA"]);
  if (denied) return denied;
  const hanyaAktif = new URL(request.url).searchParams.get("aktif") === "1";
  const rows = await listActivePack(hanyaAktif);
  return apiOk(rows.map(serializeActivePack));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["ADMIN", "PEKERJA"]);
  if (denied) return denied;
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const pack = await buatActivePack(parseActivePackInput(body, userId));
    return apiOk(serializeActivePack(pack), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});

export const PUT = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "PEKERJA"]);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    const aksi = String(body.aksi ?? "").trim();
    if (!Number.isInteger(id) || id <= 0) {
      return apiFail("INVALID_ID", "id wajib diisi.", 400);
    }
    if (aksi !== "PAKAI") {
      return apiFail("INVALID_ACTION", "Aksi tidak dikenal.", 400);
    }
    const pack = await pakaiActivePack(id, body.jumlah);
    return apiOk(serializeActivePack(pack));
  } catch (error) {
    return handleError(error);
  }
});
