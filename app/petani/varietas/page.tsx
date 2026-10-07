import Link from "next/link";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniVarietasPage() {
  const serialized = (await listVarietas(true)).map(serializeVarietas);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">Varietas aktif</h1>
        <p className="text-muted-foreground">Hanya baca. Hanya varietas aktif ditampilkan.</p>
        <Link
          href="/petani"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Petani
        </Link>
      </header>

      <VarietasDaftar rows={serialized} />
    </main>
  );
}
