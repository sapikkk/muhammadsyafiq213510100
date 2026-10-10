import {
  pakaiActivePackPetani,
  simpanActivePackPetani,
} from "@/app/actions/active-pack";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackForm } from "@/components/active-pack-form";
import { ActivePackPakaiForm } from "@/components/active-pack-pakai-form";
import { CrudPageLayout } from "@/components/crud-page-layout";
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
      title="Active pack"
      description="Rakit pack jual dari stok inventaris — pakai saat fase produksi membutuhkan pack."
      flowSteps={[
        { label: "Lihat pack", detail: "Stok pack siap pakai vs habis." },
        { label: "Buat pack", detail: "Form komposisi — kurangi stok bahan otomatis." },
        { label: "Pakai", detail: "Form pakai — kurangi qty pack aktif." },
      ]}
      list={<ActivePackDaftar rows={packs} />}
      listTitle="Daftar pack"
      create={
        <>
          <ActivePackForm items={items} action={simpanActivePackPetani} />
          <div className="mt-8 border-t pt-8">
            <ActivePackPakaiForm packs={packs} action={pakaiActivePackPetani} />
          </div>
        </>
      }
      createTitle="Buat & pakai pack"
    />
  );
}
