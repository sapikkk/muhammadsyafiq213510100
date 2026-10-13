import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      title="Inventaris"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/inventaris" jenisPratinjau="inventaris" />
      }
      list={<InventarisDaftar items={items.map(serializeItem)} mode="owner" />}
      listTitle="Stok bahan baku"
    />
  );
}
