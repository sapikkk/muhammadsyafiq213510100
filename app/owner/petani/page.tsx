import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { PageHeader } from "@/components/page-header";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function OwnerPetaniPage() {
  const rows = await listPetani();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Master petani"
        description="Hanya baca. Perubahan lewat Admin."
      />
      <PetaniMasterDaftar rows={rows.map(serializePetani)} />
    </div>
  );
}
