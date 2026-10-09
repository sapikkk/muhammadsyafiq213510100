import { catatPergerakanPetani } from "@/app/actions/inventaris";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisMovementForm } from "@/components/inventaris-movement-form";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { PageHeader } from "@/components/page-header";
import { listItemInventaris, listPergerakan, serializeItem } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniInventarisPage() {
  const [items, riwayat] = await Promise.all([
    listItemInventaris(true),
    listPergerakan(undefined, 20),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Inventaris"
        description="Lihat stok dan catat keluar/masuk bahan di lapangan."
      />

      <InventarisDaftar items={items.map(serializeItem)} />
      <InventarisMovementForm items={items} action={catatPergerakanPetani} />

      <section aria-labelledby="riwayat-petani" className="space-y-3">
        <h2 id="riwayat-petani" className="text-lg font-semibold">
          Riwayat terbaru
        </h2>
        <InventarisRiwayat rows={riwayat} />
      </section>
    </div>
  );
}
