import Link from "next/link";
import { PenyusutanBulanForm } from "@/components/penyusutan-bulan-form";
import { PeriodLockForm } from "@/components/period-lock-form";
import { PageHeader } from "@/components/page-header";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function AdminAkuntansiPage() {
  const lock = await getPeriodeTutup();
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Pengaturan akuntansi"
        description="v2-H.1 — period lock: tolak jurnal backdate sebelum tanggal tutup (override Admin di form jurnal)."
      />
      <PeriodLockForm periodeTutup={periodeTutup} />
      <PenyusutanBulanForm defaultBulan={new Date().toISOString().slice(0, 7)} />
      <Link href="/admin/jurnal" className="text-sm underline underline-offset-4">
        Kembali ke jurnal
      </Link>
    </div>
  );
}
