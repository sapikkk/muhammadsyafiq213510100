import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { PageSection } from "@/components/page-section";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";
import { kolamIsiToRecord } from "@/lib/kolam-isi-serialize";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";

export const dynamic = "force-dynamic";

export default async function OwnerInfrastrukturPage() {
  const [pohon, ringkasan] = await Promise.all([
    listInfrastrukturPohon(),
    loadProduksiRingkasan(),
  ]);
  const data = serializeInfrastruktur(pohon);
  const kolamIsi = kolamIsiToRecord(ringkasan.kolamIsi);

  return (
    <CrudPageLayout
      title="Infrastruktur"
      list={
        <>
          <PageSection title="Kapasitas kolam">
            <ProduksiRingkasanPanel data={ringkasan} />
          </PageSection>
          <InfrastrukturPohon data={data} mode="owner" kolamIsi={kolamIsi} />
        </>
      }
      listTitle="Lahan dan kolam"
    />
  );
}
