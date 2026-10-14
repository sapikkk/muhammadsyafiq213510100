import { CrudPageLayout } from "@/components/crud-page-layout";
import { PageSection } from "@/components/page-section";
import { PenyusutanBulanForm } from "@/components/penyusutan-bulan-form";
import { PeriodLockForm } from "@/components/period-lock-form";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function AdminAkuntansiPage() {
  const lock = await getPeriodeTutup();
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      title="Pengaturan akuntansi"
      list={
        <div className="space-y-6">
          <PageSection title="Tutup periode" badge="Update">
            <PeriodLockForm periodeTutup={periodeTutup} />
          </PageSection>
          <PageSection title="Penyusutan otomatis" badge="Create">
            <PenyusutanBulanForm defaultBulan={new Date().toISOString().slice(0, 7)} />
          </PageSection>
        </div>
      }
      listTitle="Pengaturan"
    />
  );
}
