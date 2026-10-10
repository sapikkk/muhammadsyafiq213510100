import { FlowSteps } from "@/components/flow-steps";
import { PenyusutanBulanForm } from "@/components/penyusutan-bulan-form";
import { PeriodLockForm } from "@/components/period-lock-form";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function AdminAkuntansiPage() {
  const lock = await getPeriodeTutup();
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Akuntansi"
        title="Pengaturan akuntansi"
        description="Tutup periode dan catat penyusutan bulanan sebelum tutup buku."
      />
      <FlowSteps
        steps={[
          { label: "Period lock", detail: "Set tanggal tutup — jurnal backdate ditolak." },
          { label: "Penyusutan", detail: "Satu klik per bulan — jurnal AUTO GH & instalasi." },
          { label: "Jurnal", detail: "Kembali ke daftar jurnal lewat sidebar." },
        ]}
      />
      <PageSection title="Period lock" description="Update — tanggal periode tutup buku." badge="Update">
        <PeriodLockForm periodeTutup={periodeTutup} />
      </PageSection>
      <PageSection title="Penyusutan otomatis" description="Create — idempotent per bulan." badge="Create">
        <PenyusutanBulanForm defaultBulan={new Date().toISOString().slice(0, 7)} />
      </PageSection>
    </div>
  );
}
