import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { tandaiDibaca } from "@/lib/notifikasi";

export const dynamic = "force-dynamic";

/** Tandai notifikasi dibaca lalu arahkan ke halaman terkait. */
export default async function BukaNotifikasiPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) redirect("/login");

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) redirect("/pengaturan#notifikasi");

  const row = await prisma.notifikasi.findFirst({
    where: { id, userId },
    select: { href: true },
  });
  if (!row) redirect("/pengaturan#notifikasi");

  await tandaiDibaca(id, userId);

  const raw = row.href?.trim() ?? "";
  const href =
    raw.startsWith("/") && !raw.startsWith("//") ? raw : "/pengaturan#notifikasi";
  redirect(href);
}
