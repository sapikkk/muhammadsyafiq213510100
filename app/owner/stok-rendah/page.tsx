import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Alert stok minimum"
      description="Monitoring stok kritis — pergerakan stok hanya Admin/Petani."
      flowSteps={[
        { label: "Review", detail: "Daftar item di bawah minimum." },
        { label: "Eskalasi", detail: "Hubungi Admin untuk restock inventaris." },
      ]}
      list={<InventarisStokRendah items={items.map(serializeAlertStok)} />}
      listTitle="Item di bawah minimum"
    />
  );
}
