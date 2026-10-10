import { AkunTree } from "@/components/akun-tree";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { buildClientTree, listAkun } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function OwnerAkunPage() {
  const rows = await listAkun();
  const aktif = rows.filter((row) => row.aktif);

  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Bagan akun"
      description={`US2.6 — tampilan read-only. ${aktif.length} akun aktif dari ${rows.length} total.`}
      flowSteps={[
        { label: "Navigasi pohon", detail: "Expand induk untuk melihat sub-akun." },
        { label: "Perubahan COA", detail: "Hanya Admin — Owner lihat saldo via jurnal/laporan." },
      ]}
      list={<AkunTree tree={buildClientTree(rows)} />}
      listTitle="Struktur COA"
    />
  );
}
