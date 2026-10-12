import { CrudPageLayout } from "@/components/crud-page-layout";
import { SiklusDaftar } from "@/components/siklus-daftar";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function OwnerProduksiPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Monitoring siklus produksi"
      description="Pantau batch dari semai hingga panen. Operasi lapangan oleh Petani; persetujuan panen oleh Admin."
      flowSteps={[
        { label: "Daftar batch", detail: "Semua siklus tercatat di sistem." },
        { label: "Operasi", detail: "Petani menjalankan fase di menu Siklus." },
        { label: "HPP", detail: "Setelah panen disetujui, lihat Biaya dan Evaluasi." },
      ]}
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />}
      listTitle="Batch produksi"
      listDescription="Owner hanya melihat — tanpa aksi fase."
    />
  );
}
