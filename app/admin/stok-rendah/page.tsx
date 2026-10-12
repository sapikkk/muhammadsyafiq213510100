import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Alert stok minimum"
      list={
        <InventarisStokRendah items={items.map(serializeAlertStok)} showRestockHint />
      }
      listTitle="Item di bawah minimum"
    />
  );
}
