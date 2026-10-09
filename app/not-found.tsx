import Link from "next/link";
import { SessionShell } from "@/components/session-shell";
import { StateScreen } from "@/components/state-screen";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default async function NotFound() {
  const session = await getServerSession(authOptions);
  const href = session?.user?.role
    ? roleHome[session.user.role as Role]
    : "/";

  return (
    <SessionShell>
      <StateScreen
        title="Halaman tidak ada"
        description="Alamat yang Anda buka tidak ditemukan."
      >
        <Link
          href={href}
          className="inline-flex h-11 w-full items-center justify-center border border-foreground bg-foreground px-4 text-sm font-medium text-background"
        >
          {session?.user?.role ? "Kembali ke dashboard" : "Kembali ke beranda"}
        </Link>
      </StateScreen>
    </SessionShell>
  );
}
