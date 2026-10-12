import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Stok rendah"
      list={<InventarisStokRendah items={items.map(serializeAlertStok)} />}
      listTitle="Item di bawah minimum"
    />
  );
}
