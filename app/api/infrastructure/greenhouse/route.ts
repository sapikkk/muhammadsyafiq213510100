import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  InfrastrukturError,
  createGreenhouse,
  parseGreenhouseInput,
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
    const gh = await createGreenhouse(parseGreenhouseInput(await request.json()));
    return apiOk(gh, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
