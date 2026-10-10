import { CrudPageLayout } from "@/components/crud-page-layout";
import { PriveForm } from "@/components/prive-form";
import { keTanggalIso } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function OwnerPrivePage() {
  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Prive"
      description="US2.6 — pencatatan pengambilan pribadi Owner; jurnal seimbang menunggu approve Admin."
      flowSteps={[
        { label: "Isi form", detail: "Nominal & sumber kas — tanggal default hari ini." },
        { label: "Approve", detail: "Admin setujui jurnal di menu Jurnal." },
      ]}
      list={<PriveForm defaultTanggal={keTanggalIso(new Date())} />}
      listTitle="Form prive"
      listDescription="Create — satu entri per submit."
    />
  );
}
