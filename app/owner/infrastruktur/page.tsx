import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export const dynamic = "force-dynamic";

export default async function OwnerInfrastrukturPage() {
  const data = serializeInfrastruktur(await listInfrastrukturPohon());

  return (
    <CrudPageLayout
      eyebrow="Operasi"
      title="Infrastruktur"
      description="Hanya baca. Perubahan master lewat Admin."
      flowSteps={[
        { label: "Kapasitas", detail: "Per kolam. Bandingkan dengan titik impas di menu Untung dan titik impas." },
      ]}
      list={<InfrastrukturPohon data={data} mode="owner" />}
      listTitle="Pohon lahan · GH · kolam"
    />
  );
}
