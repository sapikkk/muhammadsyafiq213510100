import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_PRODUKSI } from "@/lib/owner-section-tabs";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      title="Produksi"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/stok-rendah" jenisPratinjau="stok-rendah" />
      }
      list={
        <div className="space-y-4">
          <OwnerSectionTabsShell tabs={TABS_PRODUKSI} />
          <InventarisStokRendah items={items.map(serializeAlertStok)} />
        </div>
      }
      listTitle="Item di bawah minimum"
    />
  );
}
