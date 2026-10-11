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
        { label: "Lihat daftar", detail: "Klik baris untuk detail — HPP rata per lubang." },
        { label: "Tambah", detail: "Panel samping kanan — asumsi benih & media." },
        { label: "Ubah / status", detail: "Di halaman detail — nonaktifkan jika sudah dipakai siklus." },
        { label: "Pakai di siklus", detail: "Petani pilih varietas aktif saat semai batch baru." },
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
