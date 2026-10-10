import { catatPergerakanPetani } from "@/app/actions/inventaris";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { InventarisDaftar } from "@/components/inventaris-daftar";
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

export default async function PetaniInventarisPage() {
  const [items, riwayat] = await Promise.all([
    listItemInventaris(true),
    listPergerakan(undefined, 20),
  ]);

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Inventaris"
      description="Lihat stok dan catat keluar/masuk bahan di lapangan."
      flowSteps={[
        { label: "Cek stok", detail: "Pastikan bahan semai cukup sebelum buka Siklus." },
        { label: "Catat OUT", detail: "Saat pakai bahan — stok berkurang langsung." },
        { label: "Active pack", detail: "Buat pack dari stok yang sama di menu Active pack." },
      ]}
      list={<InventarisDaftar items={items.map(serializeItem)} />}
      listTitle="Stok saat ini"
      create={<InventarisMovementForm items={items} action={catatPergerakanPetani} />}
      createTitle="Pergerakan stok"
      createDescription="Create — OUT dipakai saat semai; laporkan stok rendah ke Admin."
      extra={
        <PageSection title="Riwayat terbaru" badge="Read">
          <InventarisRiwayat rows={riwayat.map(serializePergerakan)} />
        </PageSection>
      }
    />
  );
}
