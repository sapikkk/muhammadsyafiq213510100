import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Inventaris"
      description="Lihat stok dan catat keluar/masuk bahan di lapangan."
      flowSteps={[
        { label: "Cek stok", detail: "Pastikan bahan semai cukup sebelum buka Siklus." },
        { label: "Catat pergerakan", detail: "Di detail item — OUT saat pakai bahan." },
        { label: "Active pack", detail: "Buat pack dari stok yang sama di menu Active pack." },
      ]}
      list={<InventarisDaftar items={items.map(serializeItem)} mode="petani" />}
      listTitle="Stok saat ini"
    />
  );
}
