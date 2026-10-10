import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  PelangganError,
  createPelanggan,
  listPelanggan,
  parsePelangganInput,
  serializePelanggan,
  updatePelanggan,
} from "@/lib/pelanggan";

function handleError(error: unknown) {
  if (error instanceof PelangganError) {
    return apiFail("PELANGGAN_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const rows = await listPelanggan();
  return apiOk(rows.map(serializePelanggan));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const row = await createPelanggan(parsePelangganInput(await request.json()));
    return apiOk(serializePelanggan(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});

export const PUT = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return apiFail("INVALID_ID", "ID tidak valid.", 400);
    }
    const row = await updatePelanggan(id, parsePelangganInput(body));
    return apiOk(serializePelanggan(row));
  } catch (error) {
    return handleError(error);
  }
});
