import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { SalesOrderError, listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";
import { catatDpSalesOrder } from "@/lib/sales-order-pembayaran";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = withApiHandler(async (request: Request, context?: unknown) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  const params = (context as { params: { id: string } }).params;
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return apiFail("INVALID_ID", "ID tidak valid.", 400);
  }
  try {
    let sumberKas: unknown;
    try {
      const body = (await request.json()) as Record<string, unknown>;
      sumberKas = body.sumberKas;
    } catch {
      sumberKas = undefined;
    }
    await catatDpSalesOrder(id, Number(session.user.id), { sumberKas });
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
