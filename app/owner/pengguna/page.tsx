import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerUserPanel } from "@/components/owner-user-panel";
import { listUsersForOwner } from "@/lib/owner-users";

export const dynamic = "force-dynamic";

export default async function OwnerPenggunaPage() {
  const users = await listUsersForOwner();

  return (
    <CrudPageLayout
      eyebrow="Kelola"
      title="Kelola user"
      description="US1.9 — Owner menambah Admin/Petani dan mereset sandi (bukan akun Owner)."
      flowSteps={[
        { label: "Daftar user", detail: "Peran Admin & Petani — sortir kolom email jika perlu." },
        { label: "Tambah / reset", detail: "Form di panel — sandi sementara dikirim ke email." },
      ]}
      list={<OwnerUserPanel users={users} />}
      listTitle="Akun aplikasi"
    />
  );
}
