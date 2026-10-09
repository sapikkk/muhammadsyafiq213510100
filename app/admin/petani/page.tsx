import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { PetaniMasterForm } from "@/components/petani-master-form";
import { PageHeader } from "@/components/page-header";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function AdminPetaniPage() {
  const rows = await listPetani();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Master petani"
        description="Data Petani di ERD (bukan akun login). Akun HP didaftarkan terpisah di beranda Admin."
      />
      <PetaniMasterDaftar rows={rows.map(serializePetani)} />
      <PetaniMasterForm />
    </div>
  );
}
