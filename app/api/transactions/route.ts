import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  JurnalError,
  ajukanJurnal,
  createJurnal,
  listJurnal,
  parseJurnalInput,
  serializeJurnalListRow,
  setujuiJurnal,
  tolakJurnal,
} from "@/lib/jurnal";

function handleError(error: unknown) {
  if (error instanceof JurnalError) {
    return apiFail("JURNAL_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const auth = await requireApiRole(["ADMIN", "OWNER"]);
  if (auth.denied) return auth.denied;
  const q = new URL(request.url).searchParams;
  const rows = await listJurnal({
    status: q.get("status") ?? undefined,
    dari: q.get("dari") ?? undefined,
    sampai: q.get("sampai") ?? undefined,
  });
  return apiOk(rows.map(serializeJurnalListRow));
});

export const POST = withApiHandler(async (request: Request) => {
  const auth = await requireApiRole(["ADMIN"]);
  if (auth.denied) return auth.denied;
  try {
    const input = parseJurnalInput(await request.json());
    const jurnal = await createJurnal(input, Number(auth.session!.user.id));
    return apiOk({ id: jurnal.id }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});

export const PUT = withApiHandler(async (request: Request) => {
  const auth = await requireApiRole(["ADMIN"]);
  if (auth.denied) return auth.denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return apiFail("VALIDATION", "id wajib diisi.", 400);
    }
    const olehId = Number(auth.session!.user.id);
    switch (body.aksi) {
      case "AJUKAN":
        return apiOk(await ajukanJurnal(id));
      case "SETUJUI":
        return apiOk(await setujuiJurnal(id, olehId));
      case "TOLAK":
        return apiOk(await tolakJurnal(id, olehId, String(body.alasan ?? "")));
      default:
        return apiFail("VALIDATION", "aksi harus AJUKAN, SETUJUI, atau TOLAK.", 400);
    }
  } catch (error) {
    return handleError(error);
  }
});
