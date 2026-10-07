import Link from "next/link";
import { catatPergerakanPetani } from "@/app/actions/inventaris";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisMovementForm } from "@/components/inventaris-movement-form";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { listItemInventaris, listPergerakan } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniInventarisPage() {
  const [items, riwayat] = await Promise.all([
    listItemInventaris(true),
    listPergerakan(undefined, 20),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">Inventaris</h1>
        <p className="text-muted-foreground">
          Lihat stok dan catat keluar/masuk bahan di lapangan.
        </p>
        <Link
          href="/petani"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Petani
        </Link>
      </header>

      <InventarisDaftar items={items} />
      <InventarisMovementForm items={items} action={catatPergerakanPetani} />

      <section aria-labelledby="riwayat-petani" className="space-y-3">
        <h2 id="riwayat-petani" className="text-lg font-semibold">
          Riwayat terbaru
        </h2>
        <InventarisRiwayat rows={riwayat} />
      </section>
    </main>
  );
}
