import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  InfrastrukturError,
  createKolam,
  parseKolamInput,
} from "@/lib/infrastruktur";

function handleError(error: unknown) {
  if (error instanceof InfrastrukturError) {
    return apiFail("INFRA_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const kolam = await createKolam(parseKolamInput(await request.json()));
    return apiOk(kolam, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
