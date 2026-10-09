import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  BiayaError,
  listBiayaLangsungBySiklus,
  serializeBiayaLangsung,
  updateBiayaLangsung,
} from "@/lib/biaya";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  return null;
}

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const siklusId = Number(new URL(request.url).searchParams.get("siklusId"));
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    return NextResponse.json({ error: "siklusId wajib." }, { status: 400 });
  }
  const row = await listBiayaLangsungBySiklus(siklusId);
  if (!row) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  return NextResponse.json(serializeBiayaLangsung(row));
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    const siklusId = Number(body.siklusId);
    if (!Number.isInteger(siklusId) || siklusId <= 0) {
      return NextResponse.json({ error: "siklusId wajib." }, { status: 400 });
    }
    const row = await updateBiayaLangsung(siklusId, body);
    const full = await listBiayaLangsungBySiklus(row.siklus_id);
    if (!full) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
    return NextResponse.json(serializeBiayaLangsung(full));
  } catch (error) {
    if (error instanceof BiayaError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
