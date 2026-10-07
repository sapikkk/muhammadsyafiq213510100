import Link from "next/link";
import { RegisterPetani } from "@/components/register-petani";
import { ResetRequests } from "@/components/reset-requests";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminPage() {
  const [pending, stokRendah] = await Promise.all([
    prisma.passwordResetRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "asc" },
      include: { user: { select: { nama: true, email: true } } },
    }),
    listAlertStokMinimum(),
  ]);

  return (
    <RoleHome role="ADMIN">
      <InventarisAlertBanner items={stokRendah} detailHref="/admin/stok-rendah" />
      <nav aria-label="Modul Admin" className="flex flex-wrap gap-2">
        <Link
          href="/admin/akun"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Bagan akun
        </Link>
        <Link
          href="/admin/jurnal"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Jurnal
        </Link>
        <Link
          href="/admin/inventaris"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Inventaris
        </Link>
        <Link
          href="/admin/active-pack"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Active pack
        </Link>
        <Link
          href="/admin/infrastruktur"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Infrastruktur
        </Link>
        <Link
          href="/admin/stok-rendah"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Stok rendah
          {stokRendah.length > 0 ? (
            <span className="ml-2 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
              {stokRendah.length}
            </span>
          ) : null}
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
