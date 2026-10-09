import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { rejectLaporanPanen, HarvestError } from "@/lib/laporan-panen";

function handleError(error: unknown) {
  if (error instanceof HarvestError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (role !== "ADMIN" && role !== "OWNER") {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }

  const userId = Number(session.user.id);
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as { alasan: string };
    if (!body.alasan) {
      throw new HarvestError("Alasan wajib diisi.", 400);
    }
    const result = await rejectLaporanPanen(id, userId, body.alasan);
    return NextResponse.json({ status: result.status }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
