import { CrudPageLayout } from "@/components/crud-page-layout";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasForm } from "@/components/varietas-form";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function AdminVarietasPage() {
  const rows = await listVarietas(false);
  const serialized = rows.map(serializeVarietas);
  const options = serialized.map((r) => ({ id: r.id, label: `${r.nama} (${r.status})` }));

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Varietas & asumsi"
      description="Parameter benih, pertumbuhan, dan harga jual untuk perhitungan HPP dan siklus."
      flowSteps={[
        { label: "Lihat daftar", detail: "Semua varietas — aktif/nonaktif." },
        { label: "Tambah / ubah", detail: "Form di bawah — asumsi benih & media mengikuti PRD." },
        { label: "Pakai di siklus", detail: "Petani pilih varietas aktif saat semai batch baru." },
      ]}
      list={<VarietasDaftar rows={serialized} />}
      listTitle="Master varietas"
      create={<VarietasForm varietasOptions={options} />}
      createTitle="Form varietas"
      createDescription="Create/Update — nonaktifkan varietas lama alih-alih hapus jika sudah dipakai siklus."
    />
  );
}
