import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { BiayaError, createOverhead, listOverhead, serializeOverhead } from "@/lib/biaya";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const rows = await listOverhead();
  return NextResponse.json(rows.map(serializeOverhead));
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const row = await createOverhead(await request.json());
    return NextResponse.json(serializeOverhead(row), { status: 201 });
  } catch (error) {
    if (error instanceof BiayaError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
    }
    throw error;
  }
}
