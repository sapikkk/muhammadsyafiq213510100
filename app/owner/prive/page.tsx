import { PriveForm } from "@/components/prive-form";
import { PageHeader } from "@/components/page-header";
import { keTanggalIso } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function OwnerPrivePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prive"
        description="US2.6 — pencatatan pengambilan pribadi Owner; jurnal seimbang menunggu approve Admin."
      />
      <PriveForm defaultTanggal={keTanggalIso(new Date())} />
    </div>
  );
}
