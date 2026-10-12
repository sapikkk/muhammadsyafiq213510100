import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasFormSheet } from "@/components/varietas-form";
import { Button } from "@/components/ui/button";
import { listVarietas, serializeVarietas } from "@/lib/varietas";
import { mapRataHppPerLubangSemuaVarietas } from "@/lib/varietas-hpp-rata";

export const dynamic = "force-dynamic";

export default async function AdminVarietasPage() {
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
        <VarietasFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<VarietasDaftar rows={serialized} mode="admin" />}
      listTitle="Daftar varietas"
    />
  );
}
