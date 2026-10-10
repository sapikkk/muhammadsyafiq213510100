import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  InventarisError,
  catatPergerakan,
  listPergerakan,
  parseMovementInput,
  serializePergerakan,
  serializePergerakanBare,
} from "@/lib/inventaris";

function handleError(error: unknown) {
  if (error instanceof InventarisError) {
    return apiFail("INVENTARIS_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const itemIdRaw = new URL(request.url).searchParams.get("itemId");
  const itemId = itemIdRaw ? Number(itemIdRaw) : undefined;
  if (itemIdRaw && (!Number.isInteger(itemId) || itemId! <= 0)) {
    return apiFail("INVALID_QUERY", "itemId tidak valid.", 400);
  }
  const rows = await listPergerakan(itemId);
  return apiOk(rows.map(serializePergerakan));
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
    const log = await catatPergerakan(parseMovementInput(body, userId));
    return apiOk(serializePergerakanBare(log), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
