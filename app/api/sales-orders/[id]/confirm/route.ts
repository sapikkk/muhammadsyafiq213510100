import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  SalesOrderError,
  confirmSalesOrder,
  listSalesOrders,
  serializeSalesOrder,
} from "@/lib/sales-order";

export const PUT = withApiHandler(async (_request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return apiFail("INVALID_ID", "ID tidak valid.", 400);
  }
  try {
    const row = await confirmSalesOrder(id);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === row.id);
    return apiOk(
      fresh ? serializeSalesOrder(fresh) : { id: row.id, status: row.status },
    );
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return apiFail("SALES_ORDER_ERROR", error.message, error.status);
    }
    throw error;
  }
});
