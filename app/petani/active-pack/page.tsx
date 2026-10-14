import { simpanActivePackPetani } from "@/app/actions/active-pack";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackFormSheet } from "@/components/active-pack-form";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniModulIntro } from "@/components/petani-modul-intro";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { Button } from "@/components/ui/button";
import {
  listActivePack,
  serializeActivePack,
  type ActivePackListRow,
} from "@/lib/active-pack";
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

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
      title="Paket siap pakai"
      hidePermissionBadges
      intro={<PetaniModulIntro modul="active-pack" />}
      actions={
        <div className="flex flex-wrap gap-2">
          <EksporDaftarTombol unduhPath="/api/export/active-pack" jenisPratinjau="active-pack" />
          <ActivePackFormSheet
            items={items.map(serializeItem)}
            action={simpanActivePackPetani}
            trigger={
              <Button type="button" className="h-11">
                Tambah
              </Button>
            }
          />
        </div>
      }
      list={<ActivePackDaftar rows={packs} mode="petani" />}
      listTitle="Daftar paket"
    />
  );
}
