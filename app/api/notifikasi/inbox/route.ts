import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  countNotifikasiBelumDibaca,
  listNotifikasi,
} from "@/lib/notifikasi";
import { isDbUnavailable } from "@/lib/prisma";
import { resolveNotifikasiHref } from "@/lib/notifikasi-href";
import type { Role } from "@/types/role";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const role = session?.user?.role as Role | undefined;
  if (!userId || !role) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }

  const url = new URL(request.url);
  const limitRaw = Number(url.searchParams.get("limit") ?? 30);
  const limit = Number.isInteger(limitRaw)
    ? Math.min(Math.max(limitRaw, 5), 50)
    : 30;

  try {
    const [rows, unreadCount] = await Promise.all([
      listNotifikasi(userId, limit),
      countNotifikasiBelumDibaca(userId),
    ]);

    return NextResponse.json({
      unreadCount,
      items: rows.map((row) => ({
        id: row.id,
        judul: row.judul,
        pesan: row.pesan,
        dibaca: row.dibacaPada != null,
        createdAt: row.createdAt.toISOString(),
        targetHref: resolveNotifikasiHref(row.href, role),
      })),
    });
  } catch (error) {
    if (isDbUnavailable(error)) {
      return NextResponse.json(
        { error: "Database sementara tidak terjangkau." },
        { status: 503 },
      );
    }
    throw error;
  }
}
