import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { SiklusAsumsiPanel } from "@/components/siklus-asumsi-panel";
import { SiklusForm } from "@/components/siklus-form";
import { loadSiklusBaruContext } from "@/lib/siklus-baru-context";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusBaruPage() {
  const { varietas, kolam, packs, tanggalAwal } = await loadSiklusBaruContext();

  return (
    <DetailLayout
      backHref="/petani/siklus"
      eyebrow="Produksi"
      title="Mulai semai baru"
      description="Pilih varietas, kolam, dan pack benih/media — stok pack berkurang otomatis."
    >
      <PageSection title="Asumsi bibit" badge="Read">
        <SiklusAsumsiPanel varietas={varietas} />
      </PageSection>
      <PageSection title="Batch semai" badge="Create">
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
