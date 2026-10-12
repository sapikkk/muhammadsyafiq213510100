import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisItemFormSheet } from "@/components/inventaris-item-form";
import { Button } from "@/components/ui/button";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Inventaris"
      actions={
        <InventarisItemFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<InventarisDaftar items={items.map(serializeItem)} mode="admin" />}
      listTitle="Stok saat ini"
    />
  );
}
