import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import {
  AkunError,
  createAkun,
  listAkun,
  parseAkunInput,
  setAkunAktif,
  updateAkun,
} from "@/lib/akun";

function handleError(error: unknown) {
  if (error instanceof AkunError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET() {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  return NextResponse.json(await listAkun());
}

export async function POST(request: Request) {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const akun = await createAkun(parseAkunInput(await request.json()));
    return NextResponse.json(akun, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
    }
    if (typeof body.aktif === "boolean" && body.kode === undefined) {
      return NextResponse.json(await setAkunAktif(id, body.aktif));
    }
    return NextResponse.json(await updateAkun(id, parseAkunInput(body)));
  } catch (error) {
    return handleError(error);
  }
}
