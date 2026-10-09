import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  InfrastrukturError,
  createGreenhouse,
  parseGreenhouseInput,
} from "@/lib/infrastruktur";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  if (!isRoleAllowed(role, "ADMIN")) {
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
    const gh = await createGreenhouse(parseGreenhouseInput(await request.json()));
    return NextResponse.json(gh, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
