import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  InfrastrukturError,
  createLahan,
  parseLahanInput,
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
    const lahan = await createLahan(parseLahanInput(await request.json()));
    return apiOk(lahan, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
