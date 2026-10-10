import { AkunForm } from "@/components/akun-form";
import { AkunTree } from "@/components/akun-tree";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { buildClientTree, listAkun, toAkunEdit } from "@/lib/akun";

export const dynamic = "force-dynamic";

export default async function AkunPage({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  const rows = await listAkun();
  const editId = Number(searchParams.edit);
  const edit = rows.find((row) => row.id === editId);
  const aktif = rows.filter((row) => row.aktif);

  return (
    <CrudPageLayout
      eyebrow="Akuntansi"
      title="Bagan akun"
      description={`${aktif.length} akun aktif dari ${rows.length}. Akun nonaktif tetap tersimpan agar jurnal lama tidak putus.`}
      flowSteps={[
        { label: "Pohon COA", detail: "Struktur hierarki di bawah form." },
        { label: "Tambah akun", detail: "Pilih induk & tipe — kode unik." },
        { label: "Edit", detail: "Buka ?edit=id dari pohon atau daftar internal." },
      ]}
      list={<AkunTree tree={buildClientTree(rows)} />}
      listTitle="Struktur bagan akun"
      create={
        <AkunForm
          parents={aktif.map(({ id, kode, nama, tipe }) => ({ id, kode, nama, tipe }))}
          edit={edit ? toAkunEdit(edit) : undefined}
        />
      }
      createTitle="Form akun"
      createDescription={edit ? "Update — akun dipakai jurnal tidak boleh dihapus." : "Create — akun baru di bawah induk."}
    />
  );
}
