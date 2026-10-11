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
        { label: "Lihat stok", detail: "Klik baris — riwayat per item + catat IN/OUT/ADJUST." },
        { label: "Tambah item", detail: "Panel samping kanan (jarang — kebanyakan dari seed)." },
        { label: "Active pack", detail: "Setelah stok masuk, buat pack di menu Active pack." },
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
      listDescription="Perhatikan badge stok rendah. Pergerakan OUT dipakai petani saat semai."
    />
  );
}
