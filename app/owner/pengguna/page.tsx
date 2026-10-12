import { Suspense } from "react";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerUserCreateSheet, OwnerUserDaftar } from "@/components/owner-user-panel";
import { Button } from "@/components/ui/button";
import { listUsersForOwner } from "@/lib/owner-users";

export const dynamic = "force-dynamic";

export default async function OwnerPenggunaPage() {
  const users = await listUsersForOwner();

  return (
    <CrudPageLayout
      eyebrow="Kelola"
      title="Kelola user"
      description="Owner menambah Admin atau Petani dan mereset sandi (tidak untuk akun Owner)."
      flowSteps={[
        { label: "Daftar user", detail: "Cari nama atau email di tabel." },
        { label: "Tambah / reset", detail: "Tambah lewat panel kanan; reset sandi lewat dialog konfirmasi." },
      ]}
      actions={
        <OwnerUserCreateSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={
        <Suspense fallback={<p className="text-sm text-muted-foreground">Memuat daftar…</p>}>
          <OwnerUserDaftar users={users} />
        </Suspense>
      }
      listTitle="Akun aplikasi"
    />
  );
}
