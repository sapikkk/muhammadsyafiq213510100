import Link from "next/link";
import { RegisterPetani } from "@/components/register-petani";
import { ResetRequests } from "@/components/reset-requests";
import { RoleHome } from "@/components/role-home";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminPage() {
  const pending = await prisma.passwordResetRequest.findMany({
    where: { status: "PENDING" },
    orderBy: { requestedAt: "asc" },
    include: { user: { select: { nama: true, email: true } } },
  });

  return (
    <RoleHome role="ADMIN">
      <nav aria-label="Modul Admin" className="flex flex-wrap gap-2">
        <Link
          href="/admin/akun"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Bagan akun
        </Link>
      </nav>
      <RegisterPetani />
      <ResetRequests
        requests={pending.map((request) => ({
          id: request.id,
          nama: request.user.nama,
          email: request.user.email,
          requestedAt: formatter.format(request.requestedAt),
        }))}
      />
    </RoleHome>
  );
}
