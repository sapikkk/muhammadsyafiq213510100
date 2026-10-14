import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_PRODUKSI } from "@/lib/owner-section-tabs";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      title="Produksi"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/inventaris" jenisPratinjau="inventaris" />
      }
      list={
        <div className="space-y-4">
          <OwnerSectionTabsShell tabs={TABS_PRODUKSI} />
          <InventarisDaftar items={items.map(serializeItem)} mode="owner" />
        </div>
      }
      listTitle="Stok bahan baku"
    />
  );
}
