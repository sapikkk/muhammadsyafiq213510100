import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniVarietasPage() {
  const serialized = (await listVarietas(true)).map(serializeVarietas);

  return (
    <CrudPageLayout
      title="Varietas aktif"
      list={<VarietasDaftar rows={serialized} mode="petani" />}
      listTitle="Referensi varietas"
    />
  );
}
