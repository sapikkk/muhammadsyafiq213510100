import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { PetaniMasterForm } from "@/components/petani-master-form";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function AdminPetaniPage() {
  const rows = await listPetani();

  return (
    <CrudPageLayout
      eyebrow="Tim"
      title="Master petani"
      description="Data Petani di ERD (bukan akun login). Akun HP didaftarkan terpisah di beranda Admin."
      flowSteps={[
        { label: "Daftar petani", detail: "Master nama & kontak lapangan." },
        { label: "Tambah", detail: "Form di bawah — lalu buat akun login di beranda Admin." },
      ]}
      list={<PetaniMasterDaftar rows={rows.map(serializePetani)} />}
      create={<PetaniMasterForm />}
      createTitle="Form petani baru"
    />
  );
}
