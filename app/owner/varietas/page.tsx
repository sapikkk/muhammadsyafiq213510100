import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasForm } from "@/components/varietas-form";
import { listVarietas, serializeVarietas } from "@/lib/varietas";
import { mapRataHppPerLubangSemuaVarietas } from "@/lib/varietas-hpp-rata";

export const dynamic = "force-dynamic";

export default async function OwnerVarietasPage() {
  const [rows, rataHppMap] = await Promise.all([
    listVarietas(false),
    mapRataHppPerLubangSemuaVarietas(),
  ]);
  const serialized = rows.map((r) => {
    const base = serializeVarietas(r);
    const rata = rataHppMap.get(r.id);
    return { ...base, rataHppPerLubang: rata ?? null };
  });
  const options = serialized.map((r) => ({ id: r.id, label: `${r.nama} (${r.status})` }));

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Varietas & asumsi"
      description="Parameter varietas sesuai PRD modul 1.0 — Owner dan Admin boleh mengubah."
      flowSteps={[
        { label: "Lihat HPP rata", detail: "Kolom rata per lubang dari batch approved." },
        { label: "Ubah asumsi", detail: "Form di bawah — dampak batch baru." },
      ]}
      list={<VarietasDaftar rows={serialized} />}
      listTitle="Master varietas"
      create={<VarietasForm varietasOptions={options} />}
      createTitle="Form varietas"
    />
  );
}
