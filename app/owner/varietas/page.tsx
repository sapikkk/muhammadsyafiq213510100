import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasFormSheet } from "@/components/varietas-form";
import { Button } from "@/components/ui/button";
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

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Varietas & asumsi"
      description="Parameter varietas sesuai PRD modul 1.0 — Owner dan Admin boleh mengubah."
      flowSteps={[
        { label: "Lihat HPP rata", detail: "Kolom rata per lubang dari batch approved." },
        { label: "Detail", detail: "Klik baris — ubah asumsi atau aktif/nonaktif." },
      ]}
      actions={
        <VarietasFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<VarietasDaftar rows={serialized} mode="owner" />}
      listTitle="Master varietas"
    />
  );
}
