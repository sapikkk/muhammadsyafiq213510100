import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  ActivePackError,
  buatActivePack,
  listActivePack,
  pakaiActivePack,
  parseActivePackInput,
  serializeActivePack,
} from "@/lib/active-pack";

async function requirePackRole() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!role || !userId) {
    return { response: NextResponse.json({ error: "Belum masuk." }, { status: 401 }) };
  }
  if (!isRoleAllowed(role, ["ADMIN", "PEKERJA"])) {
    return {
      response: NextResponse.json(
        { error: "Peran Anda tidak berhak." },
        { status: 403 },
      ),
    };
  }
  return { userId };
}

function handleError(error: unknown) {
  if (error instanceof ActivePackError) {
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
  if (!isRoleAllowed(role, ["ADMIN", "PEKERJA"])) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  const url = new URL(request.url);
  const hanyaAktif = url.searchParams.get("aktif") === "1";
  const rows = await listActivePack(hanyaAktif);
  return NextResponse.json(rows.map(serializeActivePack));
}

export async function POST(request: Request) {
  const auth = await requirePackRole();
  if ("response" in auth) return auth.response;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const pack = await buatActivePack(parseActivePackInput(body, auth.userId));
    return NextResponse.json(serializeActivePack(pack), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const auth = await requirePackRole();
  if ("response" in auth) return auth.response;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    const aksi = String(body.aksi ?? "").trim();
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
    }
    if (aksi !== "PAKAI") {
      return NextResponse.json({ error: "Aksi tidak dikenal." }, { status: 400 });
    }
    const pack = await pakaiActivePack(id, body.jumlah);
    return NextResponse.json(serializeActivePack(pack));
  } catch (error) {
    return handleError(error);
  }
}
