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
      eyebrow="Akuntansi"
      title="Pengaturan akuntansi"
      description="Tutup periode dan catat penyusutan bulanan sebelum tutup buku."
      flowSteps={[
        { label: "Period lock", detail: "Set tanggal tutup — jurnal backdate ditolak." },
        { label: "Penyusutan", detail: "Satu klik per bulan — jurnal AUTO GH & instalasi." },
        { label: "Jurnal", detail: "Kembali ke daftar jurnal lewat sidebar." },
      ]}
      list={
        <div className="space-y-6">
          <PageSection title="Period lock" description="Update — tanggal periode tutup buku." badge="Update">
            <PeriodLockForm periodeTutup={periodeTutup} />
          </PageSection>
          <PageSection
            title="Penyusutan otomatis"
            description="Create — idempotent per bulan."
            badge="Create"
          >
            <PenyusutanBulanForm defaultBulan={new Date().toISOString().slice(0, 7)} />
          </PageSection>
        </div>
      }
      listTitle="Pengaturan"
    />
  );
}
