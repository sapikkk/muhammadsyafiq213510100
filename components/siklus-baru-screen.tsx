import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { SiklusAsumsiPanel } from "@/components/siklus-asumsi-panel";
import { SiklusForm } from "@/components/siklus-form";
import { loadSiklusBaruContext } from "@/lib/siklus-baru-context";

export async function SiklusBaruScreen({
  surface = "page",
}: {
  surface?: "page" | "sheet";
}) {
  const { varietas, kolam, packs, tanggalAwal } = await loadSiklusBaruContext();

  return (
    <DetailLayout
      backHref="/petani/siklus"
      surface={surface}
      title="Mulai semai baru"
      description="Hanya kolam yang statusnya menganggur. Lubang kosong di kolam yang sudah ada tanaman diisi lewat tambal susulan di detail batch."
    >
      <SiklusAsumsiPanel varietas={varietas} />
      <PageSection badge="Create">
        <SiklusForm
          varietas={varietas}
          kolam={kolam}
          packs={packs}
          tanggalAwal={tanggalAwal}
        />
      </PageSection>
    </DetailLayout>
  );
}
