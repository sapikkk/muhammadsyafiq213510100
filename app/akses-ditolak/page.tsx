import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { roleHome } from "@/lib/role-home";
import { StateScreen } from "@/components/state-screen";
import type { Role } from "@/types/role";

export default async function AksesDitolakPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as Role | undefined;
  const home = role ? roleHome[role] : "/login";

  return (
    <StateScreen
      title="Akses ditolak"
      description="Halaman ini bukan untuk peran akun Anda."
    >
      <Link
        href={home}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Kembali ke halaman Anda
      </Link>
    </StateScreen>
  );
}
