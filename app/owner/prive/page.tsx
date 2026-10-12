import { CrudPageLayout } from "@/components/crud-page-layout";
import { PriveForm } from "@/components/prive-form";
import { keTanggalIso } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function OwnerPrivePage() {
  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Ambil pribadi"
      description="Catat uang yang Owner ambil untuk keperluan pribadi. Admin yang menyetujui di menu Catatan keuangan."
      flowSteps={[
        { label: "Isi form", detail: "Nominal dan sumber kas. Tanggal default hari ini." },
        { label: "Setujui", detail: "Admin setujui catatan di menu Catatan keuangan." },
      ]}
      list={<PriveForm defaultTanggal={keTanggalIso(new Date())} />}
      listTitle="Form ambil pribadi"
      listDescription="Satu kali isi per simpan."
    />
  );
}
