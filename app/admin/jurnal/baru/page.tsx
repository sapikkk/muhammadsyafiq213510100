import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { keTanggalIso } from "@/lib/format";
import { listAkunPosting } from "@/lib/jurnal";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function JurnalBaruPage() {
  const [akun, lock] = await Promise.all([listAkunPosting(), getPeriodeTutup()]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <DetailLayout
      backHref="/admin/jurnal"
      eyebrow="Akuntansi"
      title="Jurnal baru"
      description="Jurnal otomatis (17 jenis) atau jurnal manual. Saldo berubah setelah jurnal disetujui."
    >
      <PageSection title="Form jurnal" badge="Create">
        <JurnalBaruPanel
          akun={akun}
          tanggalAwal={keTanggalIso(new Date())}
          periodeTutup={periodeTutup}
        />
      </PageSection>
    </DetailLayout>
  );
}
