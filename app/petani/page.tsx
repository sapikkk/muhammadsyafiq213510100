import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniPage() {
  const stokRendah = await listAlertStokMinimum();

  return (
    <RoleHome role="PEKERJA" stokRendahCount={stokRendah.length}>
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
    </RoleHome>
  );
}
