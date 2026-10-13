import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniVarietasPage() {
  const serialized = (await listVarietas(true)).map(serializeVarietas);

  return (
    <CrudPageLayout
      title="Varietas aktif"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/varietas" jenisPratinjau="varietas" />
      }
      list={<VarietasDaftar rows={serialized} mode="petani" />}
      listTitle="Referensi varietas"
    />
  );
}
