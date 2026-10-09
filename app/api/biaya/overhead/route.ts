import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { BiayaError, createOverhead, listOverhead, serializeOverhead } from "@/lib/biaya";

function handleError(error: unknown) {
  if (error instanceof BiayaError) {
    return apiFail("BIAYA_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const rows = await listOverhead();
  return apiOk(rows.map(serializeOverhead));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const row = await createOverhead(await request.json());
    return apiOk(serializeOverhead(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
