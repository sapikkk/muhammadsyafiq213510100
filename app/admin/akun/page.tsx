import { AkunFormSheet } from "@/components/akun-form";
import { AkunTree } from "@/components/akun-tree";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { Button } from "@/components/ui/button";
import { buildClientTree, listAkun } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const rows = await listAkun();
  const aktif = rows.filter((row) => row.aktif);
  const parents = aktif.map(({ id, kode, nama, tipe }) => ({ id, kode, nama, tipe }));

  return (
    <CrudPageLayout
      eyebrow="Akuntansi"
      title="Bagan akun"
      description={`${aktif.length} akun aktif dari ${rows.length}. Akun nonaktif tetap tersimpan agar jurnal lama tidak putus.`}
      flowSteps={[
        { label: "Pohon COA", detail: "Cari kode/nama — expand hierarki di pohon." },
        { label: "Tambah", detail: "Tombol di kanan atas — pilih induk & tipe." },
        { label: "Ubah / status", detail: "Per baris di pohon — akun sistem tanpa aksi." },
      ]}
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
