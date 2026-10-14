import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniModulIntro } from "@/components/petani-modul-intro";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      title="Stok rendah"
      intro={<PetaniModulIntro modul="stok-rendah" />}
      actions={
        <EksporDaftarTombol unduhPath="/api/export/stok-rendah" jenisPratinjau="stok-rendah" />
      }
      list={
        <InventarisStokRendah
          items={items.map(serializeAlertStok)}
          showRestockHint
          restockHref="/petani/inventaris"
          restockLabel="Lihat stok barang"
        />
      }
      listTitle="Item di bawah minimum"
    />
  );
}
