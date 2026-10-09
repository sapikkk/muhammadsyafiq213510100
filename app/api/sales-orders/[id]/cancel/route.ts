import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { cancelSalesOrder } from "@/lib/sales-order-cancel";
import { SalesOrderError, listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN") || !session?.user?.id) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }
  let alasan: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    alasan = body.alasan;
  } catch {
    alasan = undefined;
  }
  try {
    await cancelSalesOrder(id, Number(session.user.id), alasan);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === id);
    return NextResponse.json(fresh ? serializeSalesOrder(fresh) : { id, status: "CANCELLED" });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
