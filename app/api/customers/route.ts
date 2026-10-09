import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  PelangganError,
  createPelanggan,
  listPelanggan,
  parsePelangganInput,
  serializePelanggan,
  updatePelanggan,
} from "@/lib/pelanggan";

async function requireRead() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!isRoleAllowed(role, ["ADMIN", "OWNER"])) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const denied = await requireRead();
  if (denied) return denied;
  const rows = await listPelanggan();
  return NextResponse.json(rows.map(serializePelanggan));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  try {
    const row = await createPelanggan(parsePelangganInput(await request.json()));
    return NextResponse.json(serializePelanggan(row), { status: 201 });
  } catch (error) {
    if (error instanceof PelangganError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }
    const row = await updatePelanggan(id, parsePelangganInput(body));
    return NextResponse.json(serializePelanggan(row));
  } catch (error) {
    if (error instanceof PelangganError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
