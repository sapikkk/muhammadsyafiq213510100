import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  HarvestError,
  kirimLaporanPanen,
  listLaporanPanen,
  parseHarvestInput,
  serializeLaporanPanen,
} from "@/lib/laporan-panen";

function handleError(error: unknown) {
  if (error instanceof HarvestError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!isRoleAllowed(role, ["ADMIN", "OWNER"])) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const rows = await listLaporanPanen(status || undefined);
  return NextResponse.json(rows.map(serializeLaporanPanen));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!isRoleAllowed(role, "PEKERJA")) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  const userId = Number(session.user.id);
  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Sesi tidak valid." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const laporan = await kirimLaporanPanen(userId, parseHarvestInput(body));
    return NextResponse.json(
      { id: laporan.id, status: laporan.status },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
