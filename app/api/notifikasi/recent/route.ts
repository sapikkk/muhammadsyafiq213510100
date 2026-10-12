import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { countNotifikasiBelumDibaca } from "@/lib/notifikasi";
import { resolveNotifikasiHref } from "@/lib/notifikasi-href";
import { isDbUnavailable, prisma } from "@/lib/prisma";
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
  const afterId = Number(url.searchParams.get("afterId") ?? 0);
  const baseline = url.searchParams.get("baseline") === "1";

  try {
    if (baseline) {
      const [agg, unreadCount] = await Promise.all([
        prisma.notifikasi.aggregate({
          where: { userId },
          _max: { id: true },
        }),
        countNotifikasiBelumDibaca(userId),
      ]);
      return NextResponse.json({
        maxId: agg._max.id ?? 0,
        unreadCount,
      });
    }

    if (!Number.isInteger(afterId) || afterId < 0) {
      return NextResponse.json({ error: "afterId tidak valid." }, { status: 400 });
    }

    const [rows, unreadCount] = await Promise.all([
      prisma.notifikasi.findMany({
        where: { userId, id: { gt: afterId } },
        orderBy: { id: "asc" },
        take: 8,
        select: {
          id: true,
          judul: true,
          pesan: true,
          href: true,
          createdAt: true,
        },
      }),
      countNotifikasiBelumDibaca(userId),
    ]);

    return NextResponse.json({
      items: rows.map((row) => ({
        ...row,
        bukaHref: `/notifikasi/buka/${row.id}`,
        targetHref: resolveNotifikasiHref(row.href, role),
      })),
      unreadCount,
      maxId: rows.length ? rows[rows.length - 1]!.id : afterId,
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
