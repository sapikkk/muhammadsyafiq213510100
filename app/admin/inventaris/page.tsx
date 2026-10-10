import { catatPergerakanAdmin } from "@/app/actions/inventaris";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisItemForm } from "@/components/inventaris-item-form";
import { InventarisMovementForm } from "@/components/inventaris-movement-form";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { PageSection } from "@/components/page-section";
import {
  listItemInventaris,
  listPergerakan,
  serializeItem,
  serializePergerakan,
} from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminInventarisPage() {
  const [items, riwayat] = await Promise.all([
    listItemInventaris(true),
    listPergerakan(undefined, 30),
  ]);

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Inventaris"
      description="Kelola item bahan baku, stok saat ini, dan jejak pergerakan."
      flowSteps={[
        { label: "Lihat stok", detail: "Tabel di bawah — perhatikan badge stok rendah." },
        { label: "Tambah item", detail: "Form item baru (jarang — kebanyakan dari seed)." },
        { label: "Catat pergerakan", detail: "IN / OUT / ADJUST — stok berubah langsung." },
        { label: "Active pack", detail: "Setelah stok masuk, buat pack di menu Active pack." },
      ]}
      list={<InventarisDaftar items={items.map(serializeItem)} />}
      listTitle="Stok saat ini"
      create={
        <>
          <InventarisItemForm />
          <div className="mt-8 border-t pt-8">
            <InventarisMovementForm items={items} action={catatPergerakanAdmin} />
          </div>
        </>
      }
      createTitle="Item & pergerakan stok"
      createDescription="Create/Update — pergerakan OUT dipakai petani saat semai."
      extra={
        <PageSection title="Riwayat pergerakan" description="Read — 30 entri terakhir." badge="Read">
          <InventarisRiwayat rows={riwayat.map(serializePergerakan)} />
        </PageSection>
      }
    />
  );
}
