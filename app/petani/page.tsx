import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { listAlertStokMinimum } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniPage() {
  const stokRendah = await listAlertStokMinimum();

  return (
    <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
  );
}
