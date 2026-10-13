import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisItemFormSheet } from "@/components/inventaris-item-form";
import { Button } from "@/components/ui/button";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      title="Inventaris"
      actions={
        <div className="flex flex-wrap gap-2">
          <EksporDaftarTombol unduhPath="/api/export/inventaris" jenisPratinjau="inventaris" />
          <InventarisItemFormSheet
            trigger={
              <Button type="button" className="h-11">
                Tambah
              </Button>
            }
          />
        </div>
      }
      list={<InventarisDaftar items={items.map(serializeItem)} mode="admin" />}
      listTitle="Stok saat ini"
    />
  );
}
