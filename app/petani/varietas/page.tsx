import Link from "next/link";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { listVarietas, serializeVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniVarietasPage() {
  const serialized = (await listVarietas(true)).map(serializeVarietas);

  return (
    <div className="flex flex-col gap-8">
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
    </div>
  );
}
