import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function OwnerPetaniPage() {
  const rows = await listPetani();

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Master petani"
      description="Hanya baca. Perubahan lewat Admin."
      list={<PetaniMasterDaftar rows={rows.map(serializePetani)} />}
      listTitle="Daftar petani lapangan"
    />
  );
}
