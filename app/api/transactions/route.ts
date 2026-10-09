import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  JurnalError,
  ajukanJurnal,
  createJurnal,
  listJurnal,
  parseJurnalInput,
  setujuiJurnal,
  tolakJurnal,
} from "@/lib/jurnal";

async function requireRole(allowed: string[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) {
    return { denied: NextResponse.json({ error: "Belum masuk." }, { status: 401 }) };
  }
  if (!allowed.includes(role)) {
    return {
      denied: NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 }),
    };
  }
  return { userId: Number(session.user.id) };
}

function handleError(error: unknown) {
  if (error instanceof JurnalError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET(request: Request) {
  const auth = await requireRole(["ADMIN", "OWNER"]);
  if (auth.denied) return auth.denied;
  const q = new URL(request.url).searchParams;
  const rows = await listJurnal({
    status: q.get("status") ?? undefined,
    dari: q.get("dari") ?? undefined,
    sampai: q.get("sampai") ?? undefined,
  });
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const auth = await requireRole(["ADMIN"]);
  if (auth.denied) return auth.denied;
  try {
    const input = parseJurnalInput(await request.json());
    const jurnal = await createJurnal(input, auth.userId!);
    return NextResponse.json(jurnal, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT mengubah status: { id, aksi: "AJUKAN" | "SETUJUI" | "TOLAK", alasan? }
export async function PUT(request: Request) {
  const auth = await requireRole(["ADMIN"]);
  if (auth.denied) return auth.denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
    }
    const olehId = auth.userId!;
    switch (body.aksi) {
      case "AJUKAN":
        return NextResponse.json(await ajukanJurnal(id));
      case "SETUJUI":
        return NextResponse.json(await setujuiJurnal(id, olehId));
      case "TOLAK":
        return NextResponse.json(
          await tolakJurnal(id, olehId, String(body.alasan ?? "")),
        );
      default:
        return NextResponse.json(
          { error: "aksi harus AJUKAN, SETUJUI, atau TOLAK." },
          { status: 400 },
        );
    }
  } catch (error) {
    return handleError(error);
  }
}
