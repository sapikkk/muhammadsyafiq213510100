import Link from "next/link";
import { AkunForm } from "@/components/akun-form";
import { AkunTree } from "@/components/akun-tree";
import { buildTree, listAkun } from "@/lib/akun";

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
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Bagan akun</h1>
        <p className="text-muted-foreground">
          {`${aktif.length} akun aktif dari ${rows.length}. Akun nonaktif tetap tersimpan agar jurnal lama tidak putus.`}
        </p>
      </header>
      <AkunForm
        parents={aktif.map(({ id, kode, nama, tipe }) => ({ id, kode, nama, tipe }))}
        edit={edit}
      />
      <AkunTree tree={buildTree(rows)} />
      <Link href="/admin" className="text-sm underline underline-offset-4">
        Kembali ke beranda Admin
      </Link>
    </div>
  );
}
