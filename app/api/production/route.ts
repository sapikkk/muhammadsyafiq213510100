import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  SiklusError,
  buatSiklusSemai,
  listSiklusProduksi,
  parseSiklusInput,
  serializeSiklus,
} from "@/lib/siklus-produksi";

async function requireRead() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER", "PEKERJA"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

function handleError(error: unknown) {
  if (error instanceof SiklusError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET() {
  const denied = await requireRead();
  if (denied) return denied;
  const rows = await listSiklusProduksi();
  return NextResponse.json(rows.map(serializeSiklus));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (role !== "PEKERJA") {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const created = await buatSiklusSemai(parseSiklusInput(body));
    const rows = await listSiklusProduksi();
    const row = rows.find((r) => r.id === created.id)!;
    return NextResponse.json(serializeSiklus(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
