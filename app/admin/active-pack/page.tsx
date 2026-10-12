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
import { listItemInventaris, serializeItem } from "@/lib/inventaris";

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
      title="Paket siap pakai"
      actions={
        <ActivePackFormSheet
          items={items.map(serializeItem)}
          action={simpanActivePackAdmin}
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<ActivePackDaftar rows={packs} mode="admin" />}
      listTitle="Paket siap pakai"
    />
  );
}
