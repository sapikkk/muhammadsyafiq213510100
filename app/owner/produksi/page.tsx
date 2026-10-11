import { CrudPageLayout } from "@/components/crud-page-layout";
import { SiklusDaftar } from "@/components/siklus-daftar";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function OwnerProduksiPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      eyebrow="2.0 Manajemen Produksi & Siklus"
      title="Monitoring siklus produksi"
      description="Pantau batch dari semai hingga panen — operasi lapangan oleh Petani/Admin."
      flowSteps={[
        { label: "Daftar batch", detail: "Semua siklus tercatat di sistem." },
        { label: "Operasi", detail: "Petani menjalankan fase di /petani/siklus." },
        { label: "HPP", detail: "Setelah panen disetujui — lihat epik 4.0 & 6.0." },
      ]}
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />}
      listTitle="Batch produksi"
      listDescription="Read-only Owner — tanpa aksi fase."
    />
  );
}
