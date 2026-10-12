import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { keTanggalIso } from "@/lib/format";
import { listAkunPosting } from "@/lib/jurnal";
import { listInfrastrukturPohon } from "@/lib/infrastruktur";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function JurnalBaruPage() {
  const [akun, lock, pohon] = await Promise.all([
    listAkunPosting(),
    getPeriodeTutup(),
    listInfrastrukturPohon(),
  ]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;
  const lahanOptions = pohon.map((l) => ({
    id: l.id,
    label: `Lahan #${l.id}`,
  }));

  return (
    <DetailLayout
      backHref="/admin/jurnal"
      eyebrow="Akuntansi"
      title="Catat uang masuk / keluar"
      description="Dropdown transaksi tunai. Penjualan dan panen tidak perlu diisi di sini."
    >
      <PageSection title="Form catatan" badge="Create">
        <JurnalBaruPanel
          akun={akun}
          tanggalAwal={keTanggalIso(new Date())}
          periodeTutup={periodeTutup}
          lahanOptions={lahanOptions}
        />
      </PageSection>
    </DetailLayout>
  );
}
