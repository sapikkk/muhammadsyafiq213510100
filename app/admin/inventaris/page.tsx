import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisItemFormSheet } from "@/components/inventaris-item-form";
import { Button } from "@/components/ui/button";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Inventaris"
      description="Kelola item bahan baku, stok saat ini, dan jejak pergerakan."
      flowSteps={[
        { label: "Stok", detail: "Klik baris untuk riwayat item dan catat masuk, keluar, atau penyesuaian." },
        { label: "Item baru", detail: "Tombol Tambah di panel samping jika perlu menambah master item." },
        { label: "Paket siap pakai", detail: "Setelah stok tercatat, buat pack di menu Paket siap pakai." },
      ]}
      actions={
        <InventarisItemFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<InventarisDaftar items={items.map(serializeItem)} mode="admin" />}
      listTitle="Stok saat ini"
      listDescription="Perhatikan badge stok rendah. Petani mencatat keluar saat memakai bahan di lapangan."
    />
  );
}
