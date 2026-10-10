import {
  pakaiActivePackAdmin,
  simpanActivePackAdmin,
} from "@/app/actions/active-pack";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackForm } from "@/components/active-pack-form";
import { ActivePackPakaiForm } from "@/components/active-pack-pakai-form";
import { PageSection } from "@/components/page-section";
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
        { label: "Buat pack", detail: "Pilih item inventaris + harga total pack." },
        { label: "Pakai unit", detail: "Kurangi sisa — otomatis saat petani semai." },
        { label: "Habis", detail: "Status HABIS + jurnal penyesuaian pembulatan (v2)." },
      ]}
      list={<ActivePackDaftar rows={packs} />}
      listTitle="Daftar pack"
      create={<ActivePackForm items={items} action={simpanActivePackAdmin} />}
      createTitle="Pack baru"
      extra={
        <PageSection title="Pakai manual (Admin)" description="Update — kurangi sisa pack tanpa siklus.">
          <ActivePackPakaiForm packs={packs} action={pakaiActivePackAdmin} />
        </PageSection>
      }
    />
  );
}
