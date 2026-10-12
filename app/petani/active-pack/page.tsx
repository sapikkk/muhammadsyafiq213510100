import { simpanActivePackPetani } from "@/app/actions/active-pack";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackFormSheet } from "@/components/active-pack-form";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { Button } from "@/components/ui/button";
import {
  listActivePack,
  serializeActivePack,
  type ActivePackListRow,
} from "@/lib/active-pack";
import { listItemInventaris } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniActivePackPage() {
  const [items, packsRaw] = await Promise.all([
    listItemInventaris(true),
    listActivePack(false),
  ]);
  const packs: ActivePackListRow[] = packsRaw.map((p) =>
    serializeActivePack(p),
  ) as ActivePackListRow[];

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Paket siap pakai"
      description="Rakit pack jual dari stok inventaris — pakai saat fase produksi membutuhkan pack."
      flowSteps={[
        { label: "Lihat pack", detail: "Klik baris — stok siap pakai vs habis." },
        { label: "Buat pack", detail: "Tombol Tambah — kurangi stok bahan otomatis." },
        { label: "Pakai", detail: "Di detail pack aktif — kurangi qty sisa." },
      ]}
      actions={
        <ActivePackFormSheet
          items={items}
          action={simpanActivePackPetani}
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<ActivePackDaftar rows={packs} mode="petani" />}
      listTitle="Daftar pack"
    />
  );
}
