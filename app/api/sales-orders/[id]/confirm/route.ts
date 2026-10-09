import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { SalesOrderError, confirmSalesOrder, serializeSalesOrder, listSalesOrders } from "@/lib/sales-order";

export async function PUT(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }
  try {
    const row = await confirmSalesOrder(id);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === row.id);
    return NextResponse.json(fresh ? serializeSalesOrder(fresh) : { id: row.id, status: row.status });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
