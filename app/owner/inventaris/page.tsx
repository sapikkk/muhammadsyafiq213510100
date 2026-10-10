import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Inventaris"
      description="Hanya baca stok bahan. Pergerakan di Admin atau Petani."
      flowSteps={[
        { label: "Cek stok", detail: "Sortir kolom stok — bandingkan dengan alert stok rendah." },
        { label: "Tindak lanjut", detail: "Koordinasi Admin untuk pembelian jika ada alert." },
      ]}
      list={<InventarisDaftar items={items.map(serializeItem)} />}
      listTitle="Stok bahan baku"
    />
  );
}
