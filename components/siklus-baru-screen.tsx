import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { PetaniModulIntro } from "@/components/petani-modul-intro";
import { SiklusForm } from "@/components/siklus-form";
import { loadSiklusBaruContext } from "@/lib/siklus-baru-context";

export async function SiklusBaruScreen({
  surface = "page",
}: {
  surface?: "page" | "sheet";
}) {
  const { varietas, kolam, packs, tanggalAwal } = await loadSiklusBaruContext();

  return (
    <div className="flex flex-col gap-4">
      {surface === "page" ? <PetaniModulIntro modul="siklus" /> : null}
      <DetailLayout
        backHref="/petani/siklus"
        surface={surface}
        title="Mulai semai baru"
      >
        <PageSection badge="Create" title="Data semai">
          <SiklusForm
            varietas={varietas}
            kolam={kolam}
            packs={packs}
            tanggalAwal={tanggalAwal}
          />
        </PageSection>
      </DetailLayout>
    </div>
  );
}
