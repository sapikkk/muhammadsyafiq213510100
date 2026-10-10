import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { FlowSteps } from "@/components/flow-steps";
import { PageHeader } from "@/components/page-header";
import { PetaniTugasPanel } from "@/components/petani-tugas-panel";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { daftarTugasPetani, historiAktivitasPetani } from "@/lib/tugas-petani";

export const dynamic = "force-dynamic";

export default async function PetaniPage() {
  const [stokRendah, tugas, histori] = await Promise.all([
    listAlertStokMinimum(),
    daftarTugasPetani(),
    historiAktivitasPetani(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Petani"
        title="Dashboard"
        description="Mulai dari tugas hari ini, lalu buka Siklus untuk batch aktif."
      />
      <FlowSteps
        steps={[
          { label: "Cek stok", detail: "Inventaris & active pack — pastikan bahan cukup." },
          { label: "Semai batch", detail: "Menu Siklus → mulai fase SEMAI." },
          { label: "Pindah fase", detail: "Di detail batch — catat pertumbuhan & panen." },
          { label: "Pengiriman", detail: "Setelah Admin kirim SO — update status pengiriman." },
        ]}
      />
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
      <PetaniTugasPanel
        tugas={tugas}
        histori={histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }))}
      />
    </div>
  );
}
