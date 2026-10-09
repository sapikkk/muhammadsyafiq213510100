import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { recordPackingCost } from "@/lib/sales-order-packing";
import { SalesOrderError, listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const PUT = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied, session } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const userId = session?.user?.id;
  if (!userId) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return apiFail("INVALID_ID", "ID tidak valid.", 400);
  }
  let biayaPacking: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    biayaPacking = body.biayaPacking ?? body.amount;
  } catch {
    biayaPacking = undefined;
  }
  try {
    await recordPackingCost(id, Number(userId), biayaPacking);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === id);
    return apiOk(fresh ? serializeSalesOrder(fresh) : { id });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return apiFail("SALES_ORDER_ERROR", error.message, error.status);
    }
    throw error;
  }
});
