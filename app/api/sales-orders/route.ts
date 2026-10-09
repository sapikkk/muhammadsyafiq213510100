import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  SalesOrderError,
  createSalesOrderDraft,
  listSalesOrders,
  parseSalesOrderInput,
  serializeSalesOrder,
} from "@/lib/sales-order";

async function requireRead() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const denied = await requireRead();
  if (denied) return denied;
  const rows = await listSalesOrders();
  return NextResponse.json(rows.map(serializeSalesOrder));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  try {
    const row = await createSalesOrderDraft(
      Number(session.user.id),
      parseSalesOrderInput(await request.json()),
    );
    const listed = await listSalesOrders();
    const fresh = listed.find((r) => r.id === row.id);
    return NextResponse.json(fresh ? serializeSalesOrder(fresh) : { id: row.id, nomor_so: row.nomor_so }, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof SalesOrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
