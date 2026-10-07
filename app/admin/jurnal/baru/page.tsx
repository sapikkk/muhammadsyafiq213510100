import { JurnalForm } from "@/components/jurnal-form";
import { keTanggalIso } from "@/lib/format";
import { listAkunPosting } from "@/lib/jurnal";

export const dynamic = "force-dynamic";

export default async function JurnalBaruPage() {
  const akun = await listAkunPosting();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Jurnal baru</h1>
        <p className="text-muted-foreground">
          Total debit harus sama dengan total kredit. Jurnal baru tidak langsung
          mengubah saldo sampai disetujui.
        </p>
      </header>
      <JurnalForm akun={akun} tanggalAwal={keTanggalIso(new Date())} />
    </main>
  );
}
