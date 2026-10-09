import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { SalesOrderError } from "@/lib/sales-order";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";
import { shipSalesOrder } from "@/lib/sales-order-delivery";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!session?.user?.id || !role || !["ADMIN", "PEKERJA"].includes(role)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }
  let catatan: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    catatan = body.catatan;
  } catch {
    catatan = undefined;
  }
  try {
    await shipSalesOrder(id, Number(session.user.id), catatan);
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === id);
    return NextResponse.json(fresh ? serializeSalesOrder(fresh) : { id, status: "SHIPPED" });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
