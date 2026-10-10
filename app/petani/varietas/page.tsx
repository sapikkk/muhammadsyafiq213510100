import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniVarietasPage() {
  const serialized = (await listVarietas(true)).map(serializeVarietas);

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Varietas aktif"
      description="Hanya baca. Hanya varietas aktif ditampilkan — dipilih saat semai di Siklus."
      flowSteps={[
        { label: "Pilih varietas", detail: "Buka Siklus → batch baru → dropdown varietas." },
      ]}
      list={<VarietasDaftar rows={serialized} />}
      listTitle="Referensi varietas"
    />
  );
}
