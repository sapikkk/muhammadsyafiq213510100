import { CrudPageLayout } from "@/components/crud-page-layout";
import { RegisterPetani } from "@/components/register-petani";

export const dynamic = "force-dynamic";

export default function AdminDaftarPetaniPage() {
  return (
    <CrudPageLayout
      title="Daftarkan petani"
      list={<RegisterPetani showTitle={false} />}
    />
  );
}
