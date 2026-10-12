import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { listPetani, serializePetani } from "@/lib/petani";

export const dynamic = "force-dynamic";

export default async function OwnerPetaniPage() {
  const rows = await listPetani();

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Data petani lapangan"
      description="Hanya baca. Perubahan lewat Admin."
      coachKey="owner-petani"
      flowSteps={[
        { label: "Daftar master", detail: "Nama dan gaji lapangan — bukan akun login." },
        { label: "Perubahan", detail: "Admin mengubah data; Owner hanya memantau." },
      ]}
      list={<PetaniMasterDaftar rows={rows.map(serializePetani)} mode="owner" />}
      listTitle="Daftar petani lapangan"
    />
  );
}
