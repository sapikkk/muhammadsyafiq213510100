import { AkunFormSheet } from "@/components/akun-form";
import { AkunTree } from "@/components/akun-tree";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { Button } from "@/components/ui/button";
import { buildClientTree, listAkun } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const rows = await listAkun();
  const parents = rows.filter((row) => row.aktif).map(({ id, kode, nama, tipe }) => ({ id, kode, nama, tipe }));

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      eyebrow="Keuangan"
      title="Bagan akun"
      actions={
        <AkunFormSheet
          parents={parents}
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<AkunTree tree={buildClientTree(rows)} mode="admin" parents={parents} />}
      listTitle="Struktur bagan akun"
    />
  );
}
