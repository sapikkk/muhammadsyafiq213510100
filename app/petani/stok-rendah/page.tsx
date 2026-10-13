import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      title="Stok rendah"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/stok-rendah" jenisPratinjau="stok-rendah" />
      }
      list={<InventarisStokRendah items={items.map(serializeAlertStok)} />}
      listTitle="Item di bawah minimum"
    />
  );
}
