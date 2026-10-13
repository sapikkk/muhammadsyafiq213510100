import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
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
      title="Varietas & asumsi"
      actions={
        <div className="flex flex-wrap gap-2">
          <EksporDaftarTombol unduhPath="/api/export/varietas" jenisPratinjau="varietas" />
          <VarietasFormSheet
            trigger={
              <Button type="button" className="h-11">
                Tambah
              </Button>
            }
          />
        </div>
      }
      list={<VarietasDaftar rows={serialized} mode="owner" />}
      listTitle="Daftar varietas"
    />
  );
}
