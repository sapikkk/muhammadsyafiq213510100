import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Alert stok minimum"
      description="Item aktif yang stoknya di bawah batas minimum. Perbarui lewat pergerakan IN di inventaris."
      flowSteps={[
        { label: "Review", detail: "Periksa tabel; urutkan kolom stok jika perlu." },
        { label: "Restock", detail: "Catat masuk di inventaris." },
        { label: "Active pack", detail: "Setelah stok cukup, buat atau isi pack di menu Active pack." },
      ]}
      list={
        <InventarisStokRendah items={items.map(serializeAlertStok)} showRestockHint />
      }
      listTitle="Item di bawah minimum"
      listDescription="Jumlah item sama dengan badge peringatan di sidebar."
    />
  );
}
