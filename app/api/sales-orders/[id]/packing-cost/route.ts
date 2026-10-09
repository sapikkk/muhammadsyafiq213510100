import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { recordPackingCost } from "@/lib/sales-order-packing";
import { SalesOrderError, listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN" || !session.user.id) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }
  let biayaPacking: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    biayaPacking = body.biayaPacking ?? body.amount;
  } catch {
    biayaPacking = undefined;
  }
  try {
    await recordPackingCost(id, Number(session.user.id), biayaPacking);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === id);
    return NextResponse.json(fresh ? serializeSalesOrder(fresh) : { id });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
