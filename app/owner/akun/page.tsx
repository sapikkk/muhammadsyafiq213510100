import { AkunTree } from "@/components/akun-tree";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { buildClientTree, listAkun } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function OwnerAkunPage() {
  const rows = await listAkun();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Bagan akun"
      list={<AkunTree tree={buildClientTree(rows)} mode="owner" />}
      listTitle="Struktur bagan akun"
    />
  );
}
