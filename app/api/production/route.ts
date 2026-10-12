import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  LIST_SIKLUS_DEFAULT_LIMIT,
  LIST_SIKLUS_MAX_LIMIT,
  SiklusError,
  buatSiklusSemai,
  getSiklusProduksiListRow,
  listSiklusProduksi,
  parseSiklusInput,
  serializeSiklus,
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

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const url = new URL(request.url);
  const limitRaw = Number(url.searchParams.get("limit") ?? LIST_SIKLUS_DEFAULT_LIMIT);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(LIST_SIKLUS_MAX_LIMIT, Math.max(1, limitRaw))
    : LIST_SIKLUS_DEFAULT_LIMIT;
  const q = url.searchParams.get("q") ?? undefined;
  const rows = await listSiklusProduksi({ limit, q });
  return apiOk(rows.map(serializeSiklus));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["PEKERJA"]);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const created = await buatSiklusSemai(parseSiklusInput(body), Number(session!.user!.id));
    const row = await getSiklusProduksiListRow(created.id);
    if (!row) {
      return apiFail("NOT_FOUND", "Siklus baru tidak ditemukan.", 500);
    }
    return apiOk(serializeSiklus(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
