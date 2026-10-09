import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  PetaniError,
  createPetani,
  listPetani,
  parsePetaniInput,
  serializePetani,
  updatePetani,
} from "@/lib/petani";

async function requireRead() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!["ADMIN", "OWNER"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  return null;
}

async function requireWrite() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Hanya Admin yang boleh mengubah master petani." }, { status: 403 });
  }
  return null;
}

function handleError(error: unknown) {
  if (error instanceof PetaniError) {
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
  const rows = await listPetani();
  return NextResponse.json(rows.map(serializePetani));
}

export async function POST(request: Request) {
  const denied = await requireWrite();
  if (denied) return denied;
  try {
    const row = await createPetani(parsePetaniInput(await request.json()));
    return NextResponse.json(serializePetani(row), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const denied = await requireWrite();
  if (denied) return denied;
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "ID petani tidak valid." }, { status: 400 });
    }
    const row = await updatePetani(id, parsePetaniInput(body));
    return NextResponse.json(serializePetani(row));
  } catch (error) {
    return handleError(error);
  }
}
