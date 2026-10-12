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
      eyebrow="Produksi & stok"
      title="Varietas & asumsi"
      description="Parameter benih, pertumbuhan, dan harga jual untuk perhitungan HPP dan siklus."
      flowSteps={[
        { label: "Daftar", detail: "Klik baris untuk detail dan HPP rata per lubang." },
        { label: "Tambah", detail: "Panel samping: asumsi benih dan media." },
        { label: "Ubah", detail: "Di halaman detail; nonaktifkan jika tidak dipakai siklus baru." },
        { label: "Siklus", detail: "Petani memilih varietas aktif saat semai batch baru." },
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
      list={<VarietasDaftar rows={serialized} mode="admin" />}
      listTitle="Master varietas"
      listDescription="Cari nama varietas. Status dan ubah asumsi dari halaman detail."
    />
  );
}
