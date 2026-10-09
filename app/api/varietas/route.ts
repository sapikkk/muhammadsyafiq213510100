import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { isVarietasStatus } from "@/lib/varietas-status";
import {
  VarietasError,
  createVarietas,
  listVarietas,
  parseVarietasInput,
  serializeVarietas,
  setVarietasStatus,
} from "@/lib/varietas";

async function requireRead() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER", "PEKERJA"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

async function requireWrite() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

function handleError(error: unknown) {
  if (error instanceof VarietasError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET(request: Request) {
  const denied = await requireRead();
  if (denied) return denied;
  const url = new URL(request.url);
  const onlyAktif = url.searchParams.get("aktif") === "1";
  const rows = await listVarietas(onlyAktif);
  return NextResponse.json(rows.map(serializeVarietas));
}

export async function POST(request: Request) {
  const denied = await requireWrite();
  if (denied) return denied;
  try {
    const row = await createVarietas(parseVarietasInput(await request.json()));
    return NextResponse.json(serializeVarietas(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const denied = await requireWrite();
  if (denied) return denied;
  try {
    const raw = await request.json();
    const id = Number(raw.id);
    const status = String(raw.status ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new VarietasError("Pilih varietas.", 400);
    }
    if (!isVarietasStatus(status)) {
      throw new VarietasError("Status harus AKTIF atau NONAKTIF.", 400);
    }
    const row = await setVarietasStatus(id, status);
    return NextResponse.json(serializeVarietas(row));
  } catch (error) {
    return handleError(error);
  }
}
