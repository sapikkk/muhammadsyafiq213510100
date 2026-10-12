import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { CatatUangFormBlock } from "@/components/catat-uang-form-block";

export const dynamic = "force-dynamic";

export default function JurnalBaruPage() {
  return (
    <DetailLayout
      financeNavRole="ADMIN"
      backHref="/admin/jurnal"
      title="Catat uang masuk / keluar"
    >
      <PageSection title="Form catatan" badge="Create">
        <CatatUangFormBlock />
      </PageSection>
    </DetailLayout>
  );
}
