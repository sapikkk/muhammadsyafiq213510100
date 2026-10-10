import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  SiklusError,
  buatSiklusSemai,
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

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const rows = await listSiklusProduksi();
  return apiOk(rows.map(serializeSiklus));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["PEKERJA"]);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const created = await buatSiklusSemai(parseSiklusInput(body), Number(session!.user!.id));
    const rows = await listSiklusProduksi();
    const row = rows.find((r) => r.id === created.id)!;
    return apiOk(serializeSiklus(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
