import { OwnerUserPanel } from "@/components/owner-user-panel";
import { PageHeader } from "@/components/page-header";
import { listUsersForOwner } from "@/lib/owner-users";

export const dynamic = "force-dynamic";

export default async function OwnerPenggunaPage() {
  const users = await listUsersForOwner();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola user"
        description="US1.9 — Owner menambah Admin/Petani dan mereset sandi (bukan akun Owner)."
      />
      <OwnerUserPanel users={users} />
    </div>
  );
}
