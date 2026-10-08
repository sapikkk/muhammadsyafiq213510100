import Link from "next/link";
import { HarvestAdminDaftar } from "@/components/harvest-admin-daftar";
import { listLaporanPanen, serializeLaporanPanen } from "@/lib/laporan-panen";

export const dynamic = "force-dynamic";

export default async function AdminHarvestPage() {
  const rows = await listLaporanPanen();
  const pending = rows.filter((r) => r.status === "PENDING").length;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Laporan panen</h1>
        <p className="text-muted-foreground">
          {pending > 0
            ? `${pending} laporan menunggu review (approval penuh di US berikutnya).`
            : "Daftar laporan panen dari petani."}
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>
      <HarvestAdminDaftar rows={rows.map(serializeLaporanPanen)} />
    </main>
  );
}
