import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { isKolamStatus } from "@/lib/infrastruktur-kolam-status";
import {
  InfrastrukturError,
  createKolam,
  parseKolamInput,
  updateKolamStatus,
} from "@/lib/infrastruktur";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

function handleError(error: unknown) {
  if (error instanceof InfrastrukturError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const kolam = await createKolam(parseKolamInput(await request.json()));
    return NextResponse.json(kolam, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const raw = await request.json();
    const id = Number(raw.id);
    const status = String(raw.status ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new InfrastrukturError("Pilih kolam.", 400);
    }
    if (!isKolamStatus(status)) {
      throw new InfrastrukturError("Status kolam harus MENGANGGUR atau TERPAKAI.", 400);
    }
    const kolam = await updateKolamStatus(id, status);
    return NextResponse.json(kolam);
  } catch (error) {
    return handleError(error);
  }
}
