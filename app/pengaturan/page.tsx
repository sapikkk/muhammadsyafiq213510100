import { getServerSession } from "next-auth";
import { AccountSettings } from "@/components/account-settings";
import { NotifikasiSection } from "@/components/notifikasi-section";
import { PageHeaderRow } from "@/components/page-header-row";
import { RoleMatrix } from "@/components/role-matrix";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function PengaturanPage() {
  const session = await getServerSession(authOptions);
  // Baca nama dari DB, bukan token. Token baru segar setelah update sesi.
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { nama: true },
      })
    : null;
  const nama = user?.nama ?? session?.user?.name ?? "";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <PageHeaderRow title="Pengaturan" />

      {userId ? <NotifikasiSection userId={userId} /> : null}

      <AccountSettings nama={nama} />
      <RoleMatrix />
    </div>
  );
}
