import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { tandaiDibaca } from "@/lib/notifikasi";
import { resolveNotifikasiHref } from "@/lib/notifikasi-href";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export const dynamic = "force-dynamic";

/** Tandai notifikasi dibaca lalu arahkan ke halaman terkait. */
export default async function BukaNotifikasiPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId || !session?.user) redirect("/login");

  const role = session.user.role as Role;
  const home = roleHome[role];

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) redirect(home);

  const row = await prisma.notifikasi.findFirst({
    where: { id, userId },
    select: { href: true },
  });
  if (!row) redirect(home);

  await tandaiDibaca(id, userId);
  const href = resolveNotifikasiHref(row.href, role);
  redirect(href);
}
