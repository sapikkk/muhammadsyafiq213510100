import Link from "next/link";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasForm } from "@/components/varietas-form";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function AdminVarietasPage() {
  const rows = await listVarietas(false);
  const serialized = rows.map(serializeVarietas);
  const options = serialized.map((r) => ({ id: r.id, label: `${r.nama} (${r.status})` }));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Varietas & asumsi</h1>
        <p className="text-muted-foreground">
          Parameter benih, pertumbuhan, dan harga jual untuk perhitungan HPP dan siklus.
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>

      <VarietasDaftar rows={serialized} />
      <VarietasForm varietasOptions={options} />
    </main>
  );
}
