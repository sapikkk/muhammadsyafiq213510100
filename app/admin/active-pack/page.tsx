import { simpanActivePackAdmin } from "@/app/actions/active-pack";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackFormSheet } from "@/components/active-pack-form";
import { Button } from "@/components/ui/button";
import {
  listActivePack,
  serializeActivePack,
  type ActivePackListRow,
} from "@/lib/active-pack";
import { listItemInventaris } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminActivePackPage() {
  const [items, packsRaw] = await Promise.all([
    listItemInventaris(true),
    listActivePack(false),
  ]);
  const packs: ActivePackListRow[] = packsRaw.map((p) =>
    serializeActivePack(p),
  ) as ActivePackListRow[];

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Active pack"
      description="Alokasi biaya benih/media per unit — dipakai saat semai & tambal."
      flowSteps={[
        { label: "Buat pack", detail: "Tombol Tambah — pilih item inventaris + harga total pack." },
        { label: "Detail", detail: "Klik baris — pakai unit manual atau lihat sisa." },
        { label: "Habis", detail: "Status habis + jurnal penyesuaian pembulatan (v2)." },
      ]}
      actions={
        <ActivePackFormSheet
          items={items}
          action={simpanActivePackAdmin}
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<ActivePackDaftar rows={packs} mode="admin" />}
      listTitle="Daftar pack"
      listDescription="Pemakaian otomatis saat semai; admin bisa pakai manual dari detail pack aktif."
    />
  );
}
