import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function OwnerPetaniPage() {
  const rows = await listPetani();

  return (
    <CrudPageLayout
      title="Data petani lapangan"
      coachKey="owner-petani"
      list={<PetaniMasterDaftar rows={rows.map(serializePetani)} mode="owner" />}
      listTitle="Daftar petani lapangan"
    />
  );
}
