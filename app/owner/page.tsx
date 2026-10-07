import Link from "next/link";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const [petani, stokRendah] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PEKERJA" },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, email: true },
    }),
    listAlertStokMinimum(),
  ]);

  return (
    <RoleHome role="OWNER">
      <InventarisAlertBanner items={stokRendah} detailHref="/owner/stok-rendah" />
      <nav aria-label="Modul Owner" className="flex flex-wrap gap-2">
        <Link
          href="/owner/inventaris"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Inventaris (baca)
        </Link>
        <Link
          href="/owner/stok-rendah"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Stok rendah
        </Link>
      </nav>
      <section aria-labelledby="petani-title" className="space-y-3">
        <h2 id="petani-title" className="text-lg font-semibold">
          Akun petani
        </h2>
        {petani.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Belum ada akun petani.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {petani.map((akun) => (
              <li key={akun.id} className="p-4 text-sm">
                <p className="font-medium">{akun.nama}</p>
                <p className="text-muted-foreground">{akun.email}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </RoleHome>
  );
}
