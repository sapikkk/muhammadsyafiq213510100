import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  InventarisError,
  catatPergerakan,
  listPergerakan,
  parseMovementInput,
} from "@/lib/inventaris";

async function requireMovementRole() {
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
  if (error instanceof InventarisError) {
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
  if (!isRoleAllowed(role, ["ADMIN", "OWNER", "PEKERJA"])) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }

  const url = new URL(request.url);
  const itemIdRaw = url.searchParams.get("itemId");
  const itemId = itemIdRaw ? Number(itemIdRaw) : undefined;
  if (itemIdRaw && (!Number.isInteger(itemId) || itemId! <= 0)) {
    return NextResponse.json({ error: "itemId tidak valid." }, { status: 400 });
  }

  const rows = await listPergerakan(itemId);
  return NextResponse.json(
    rows.map((row) => ({
      ...row,
      jumlah: row.jumlah.toString(),
      stokSebelum: row.stokSebelum.toString(),
      stokSesudah: row.stokSesudah.toString(),
    })),
  );
}

export async function POST(request: Request) {
  const auth = await requireMovementRole();
  if ("response" in auth) return auth.response;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const log = await catatPergerakan(parseMovementInput(body, auth.userId));
    return NextResponse.json(
      {
        ...log,
        jumlah: log.jumlah.toString(),
        stokSebelum: log.stokSebelum.toString(),
        stokSesudah: log.stokSesudah.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
