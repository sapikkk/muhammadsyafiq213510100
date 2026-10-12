import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { CatatUangFormBlock } from "@/components/catat-uang-form-block";

export const dynamic = "force-dynamic";

export default function JurnalBaruPage() {
  return (
    <DetailLayout
      backHref="/admin/jurnal"
      eyebrow="Akuntansi"
      title="Catat uang masuk / keluar"
      description="Dropdown transaksi tunai. Penjualan dan panen tidak perlu diisi di sini."
    >
      <PageSection title="Form catatan" badge="Create">
        <CatatUangFormBlock />
      </PageSection>
    </DetailLayout>
  );
}
