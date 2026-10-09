import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import {
  InventarisError,
  createItem,
  listItemInventaris,
  parseItemInput,
  serializeItem,
} from "@/lib/inventaris";

function handleError(error: unknown) {
  if (error instanceof InventarisError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }
  throw error;
}

export async function GET() {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const items = await listItemInventaris(true);
  return NextResponse.json(items.map(serializeItem));
}

export async function POST(request: Request) {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const item = await createItem(parseItemInput(await request.json()));
    return NextResponse.json(serializeItem(item), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
