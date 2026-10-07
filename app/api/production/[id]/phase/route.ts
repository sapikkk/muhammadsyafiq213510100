import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { SiklusError, lanjutFase, serializeSiklus, getSiklusProduksi, listSiklusProduksi } from "@/lib/siklus-produksi";

function handleError(error: unknown) {
  if (error instanceof SiklusError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!role || !userId) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  if (role !== "PEKERJA") {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id tidak valid." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const hasil = await lanjutFase(id, userId, body);
    const rows = await listSiklusProduksi();
    const row = rows.find((r) => r.id === id);
    return NextResponse.json({
      fase_dari: hasil.fase_dari,
      fase_ke: hasil.fase_ke,
      label_ke: hasil.label_ke,
      siklus: row ? serializeSiklus(row) : null,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER", "PEKERJA"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id tidak valid." }, { status: 400 });
  }
  const siklus = await getSiklusProduksi(id);
  if (!siklus) return NextResponse.json({ error: "Siklus tidak ditemukan." }, { status: 404 });
  const rows = await listSiklusProduksi();
  const row = rows.find((r) => r.id === id)!;
  return NextResponse.json(serializeSiklus(row));
}
