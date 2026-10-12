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
      description="Hanya melihat stok barang. Pergerakan di Admin atau Petani."
      flowSteps={[
        { label: "Cek stok", detail: "Klik baris untuk riwayat per item." },
        { label: "Tindak lanjut", detail: "Koordinasi Admin untuk pembelian jika ada alert stok rendah." },
      ]}
      list={<InventarisDaftar items={items.map(serializeItem)} mode="owner" />}
      listTitle="Stok bahan baku"
    />
  );
}
