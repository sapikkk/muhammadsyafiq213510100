import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { keTanggalIso } from "@/lib/format";
import { listAkunPosting } from "@/lib/jurnal";
import { getPeriodeTutup } from "@/lib/period-lock";

export const dynamic = "force-dynamic";

export default async function JurnalBaruPage() {
  const [akun, lock] = await Promise.all([listAkunPosting(), getPeriodeTutup()]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Jurnal baru</h1>
        <p className="text-muted-foreground">
          Smart Jurnal (v2-F.1) atau jurnal manual. Saldo berubah setelah approve.
        </p>
      </header>
      <JurnalBaruPanel
        akun={akun}
        tanggalAwal={keTanggalIso(new Date())}
        periodeTutup={periodeTutup}
      />
    </div>
  );
}
