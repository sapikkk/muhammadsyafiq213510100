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
        { label: "Review alert", detail: "Tabel di bawah — urutkan kolom stok jika perlu." },
        { label: "Catat IN", detail: "Inventaris → pergerakan masuk atau pembelian." },
        { label: "Active pack", detail: "Setelah stok cukup, buat/isi pack di menu Active pack." },
      ]}
      list={
        <InventarisStokRendah items={items.map(serializeAlertStok)} showRestockHint />
      }
      listTitle="Item di bawah minimum"
      listDescription="Read — badge di sidebar menunjukkan jumlah yang sama (satu query per halaman)."
    />
  );
}
