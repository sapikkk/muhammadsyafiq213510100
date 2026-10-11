import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { PetaniMasterFormSheet } from "@/components/petani-master-form";
import { Button } from "@/components/ui/button";
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
        { label: "Daftar petani", detail: "Master nama & gaji lapangan." },
        { label: "Tambah atau ubah", detail: "Panel samping — lalu buat akun login di beranda Admin." },
      ]}
      actions={
        <PetaniMasterFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<PetaniMasterDaftar rows={rows.map(serializePetani)} />}
      listDescription="Cari nama, lalu Ubah gaji atau nama master."
    />
  );
}
