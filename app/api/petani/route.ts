import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  PetaniError,
  createPetani,
  listPetani,
  parsePetaniInput,
  serializePetani,
  updatePetani,
} from "@/lib/petani";

function handleError(error: unknown) {
  if (error instanceof PetaniError) {
    return apiFail("PETANI_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const rows = await listPetani();
  return apiOk(rows.map(serializePetani));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const row = await createPetani(parsePetaniInput(await request.json()));
    return apiOk(serializePetani(row), { status: 201 });
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
      return apiFail("INVALID_ID", "ID petani tidak valid.", 400);
    }
    const row = await updatePetani(id, parsePetaniInput(body));
    return apiOk(serializePetani(row));
  } catch (error) {
    return handleError(error);
  }
});
