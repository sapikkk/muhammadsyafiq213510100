import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturTambahActions } from "@/components/infrastruktur-form";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";
import { labelLahanUntukLayar } from "@/lib/produksi-ui-labels";

export const dynamic = "force-dynamic";

export default async function AdminInfrastrukturPage() {
  const pohon = await listInfrastrukturPohon();
  const data = serializeInfrastruktur(pohon);

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
      eyebrow="Produksi & stok"
      title="Infrastruktur"
      actions={
        <InfrastrukturTambahActions
          lahanOptions={lahanOptions}
          greenhouseOptions={greenhouseOptions}
        />
      }
      list={<InfrastrukturPohon data={data} mode="admin" />}
      listTitle="Pohon infrastruktur"
    />
  );
}
