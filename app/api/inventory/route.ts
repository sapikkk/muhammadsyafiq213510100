import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  InventarisError,
  createItem,
  listItemInventaris,
  parseItemInput,
  serializeItem,
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

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const items = await listItemInventaris(true);
  return apiOk(items.map(serializeItem));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const item = await createItem(parseItemInput(await request.json()));
    return apiOk(serializeItem(item), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});
