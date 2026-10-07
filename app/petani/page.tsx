import Link from "next/link";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniPage() {
  const stokRendah = await listAlertStokMinimum();

  return (
    <RoleHome role="PEKERJA">
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
      <nav aria-label="Modul Petani" className="flex flex-wrap gap-2">
        <Link
          href="/petani/inventaris"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Inventaris
        </Link>
        <Link
          href="/petani/active-pack"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Active pack
        </Link>
        <Link
          href="/petani/stok-rendah"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Stok rendah
        </Link>
      </nav>
    </RoleHome>
  );
}
