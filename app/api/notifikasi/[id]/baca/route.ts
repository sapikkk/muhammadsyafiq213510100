import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { tandaiDibaca } from "@/lib/notifikasi";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }

  const id = Number(context.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }

  await tandaiDibaca(id, userId);
  return NextResponse.json({ ok: true });
}
