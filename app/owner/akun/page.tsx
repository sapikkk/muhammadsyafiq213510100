import { AkunTree } from "@/components/akun-tree";
import { PageHeader } from "@/components/page-header";
import { buildTree, listAkun } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function OwnerAkunPage() {
  const rows = await listAkun();
  const aktif = rows.filter((row) => row.aktif);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bagan akun"
        description="US2.6 — tampilan read-only. Perubahan COA hanya oleh Admin."
      />
      <p className="text-sm text-muted-foreground">
        {aktif.length} akun aktif dari {rows.length} total.
      </p>
      <AkunTree tree={buildTree(rows)} />
    </div>
  );
}
