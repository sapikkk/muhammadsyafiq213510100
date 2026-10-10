import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
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
        title="Dashboard petani"
        description="Tugas lapangan, batch aktif, dan histori log produksi."
      />
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
      <PetaniTugasPanel
        tugas={tugas}
        histori={histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }))}
      />
    </div>
  );
}
