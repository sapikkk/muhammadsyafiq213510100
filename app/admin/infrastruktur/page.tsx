import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturTambahActions } from "@/components/infrastruktur-form";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { PageSection } from "@/components/page-section";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";
import { kolamIsiToRecord } from "@/lib/kolam-isi-serialize";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import { labelLahanUntukLayar } from "@/lib/produksi-ui-labels";

export const dynamic = "force-dynamic";

export default async function AdminInfrastrukturPage() {
  const [pohon, ringkasan] = await Promise.all([
    listInfrastrukturPohon(),
    loadProduksiRingkasan(),
  ]);
  const data = serializeInfrastruktur(pohon);
  const kolamIsi = kolamIsiToRecord(ringkasan.kolamIsi);

  const lahanOptions = data.lahan.map((l) => {
    const gh = l.greenhouse.map((g) => g.nama).join(", ");
    return {
      id: l.id,
      label: `${labelLahanUntukLayar(l.id, gh || null)} · sewa ${l.nilaiSewa}`,
    };
  });

  const greenhouseOptions = data.lahan.flatMap((l) => {
    const lahanLabel = labelLahanUntukLayar(
      l.id,
      l.greenhouse.map((g) => g.nama).join(", ") || null,
    );
    return l.greenhouse.map((gh) => ({
      id: gh.id,
      label: `${gh.nama} · ${lahanLabel}`,
    }));
  });

  return (
    <CrudPageLayout
      title="Infrastruktur"
      actions={
        <InfrastrukturTambahActions
          lahanOptions={lahanOptions}
          greenhouseOptions={greenhouseOptions}
        />
      }
      list={
        <>
          <PageSection title="Kapasitas kolam">
            <ProduksiRingkasanPanel data={ringkasan} />
          </PageSection>
          <InfrastrukturPohon data={data} mode="admin" kolamIsi={kolamIsi} />
        </>
      }
      listTitle="Lahan dan kolam"
    />
  );
}
