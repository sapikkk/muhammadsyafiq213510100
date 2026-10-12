import Link from "next/link";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { Button } from "@/components/ui/button";
import { keTanggalIso } from "@/lib/format";
import { listAkunPosting } from "@/lib/jurnal";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function OwnerJurnalKoreksiPage() {
  const [akun, lock] = await Promise.all([listAkunPosting(), getPeriodeTutup()]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <DetailLayout
      backHref="/owner/jurnal"
      title="Koreksi catatan manual"
      actions={
        <Button asChild variant="outline" className="h-11">
          <Link href="/owner/jurnal">Kembali ke daftar</Link>
        </Button>
      }
    >
      <PageSection title="Form koreksi" badge="Create">
        <JurnalBaruPanel
          akun={akun}
          tanggalAwal={keTanggalIso(new Date())}
          periodeTutup={periodeTutup}
          mode="owner-koreksi"
        />
      </PageSection>
    </DetailLayout>
  );
}
