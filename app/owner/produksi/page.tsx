import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_PRODUKSI } from "@/lib/owner-section-tabs";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { SiklusDaftar } from "@/components/siklus-daftar";
import { PageSection } from "@/components/page-section";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function OwnerProduksiPage() {
  const [siklusRows, ringkasan] = await Promise.all([
    listSiklusProduksi(),
    loadProduksiRingkasan(),
  ]);

  return (
    <CrudPageLayout
      title="Produksi"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/siklus-daftar" jenisPratinjau="siklus-daftar" />
      }
      list={
        <>
          <OwnerSectionTabsShell tabs={TABS_PRODUKSI} />
          <PageSection title="Ringkasan fase">
            <ProduksiRingkasanPanel data={ringkasan} />
          </PageSection>
          <SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />
        </>
      }
      listTitle="Daftar siklus"
    />
  );
}
