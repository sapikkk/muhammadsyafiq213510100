import Link from "next/link";
import { getServerSession } from "next-auth";
import { AccountSettings } from "@/components/account-settings";
import { RoleMatrix } from "@/components/role-matrix";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { roleLabel, type Role } from "@/types/role";

export const dynamic = "force-dynamic";

export default async function PengaturanPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user?.role ?? "PEKERJA") as Role;

  // Baca nama dari DB, bukan token. Token baru segar setelah update sesi.
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { nama: true },
      })
    : null;
  const nama = user?.nama ?? session?.user?.name ?? "";

  const pendingReset =
    role === "ADMIN"
      ? await prisma.passwordResetRequest.count({ where: { status: "PENDING" } })
      : 0;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">
          {`${nama} · ${roleLabel[role]}`}
        </p>
      </header>

      <section aria-labelledby="notif-title" className="space-y-3">
        <h2 id="notif-title" className="text-lg font-semibold">
          Notifikasi
        </h2>
        {role === "ADMIN" && pendingReset > 0 ? (
          <Link
            href="/admin"
            className="block rounded-md border bg-secondary p-4 text-sm underline-offset-4 hover:underline"
          >
            {`${pendingReset} permintaan reset sandi menunggu Anda.`}
          </Link>
        ) : (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Belum ada notifikasi.
          </p>
        )}
      </section>

      <AccountSettings nama={nama} />
      <RoleMatrix />
    </div>
  );
}
