import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  SalesOrderError,
  createSalesOrderDraft,
  listSalesOrders,
  parseSalesOrderInput,
  serializeSalesOrder,
} from "@/lib/sales-order";

function handleError(error: unknown) {
  if (error instanceof SalesOrderError) {
    return apiFail("SALES_ORDER_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const rows = await listSalesOrders();
  return apiOk(rows.map(serializeSalesOrder));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied, session } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const userId = session?.user?.id;
  if (!userId) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  try {
    const row = await createSalesOrderDraft(
      Number(userId),
      parseSalesOrderInput(await request.json()),
    );
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === row.id);
    return apiOk(
      fresh
        ? serializeSalesOrder(fresh)
        : { id: row.id, nomor_so: row.nomor_so },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
});
