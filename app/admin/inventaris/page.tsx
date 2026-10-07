import Link from "next/link";
import { catatPergerakanAdmin } from "@/app/actions/inventaris";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { InventarisItemForm } from "@/components/inventaris-item-form";
import { InventarisMovementForm } from "@/components/inventaris-movement-form";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { listItemInventaris, listPergerakan } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminInventarisPage() {
  const [items, riwayat] = await Promise.all([
    listItemInventaris(true),
    listPergerakan(undefined, 30),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Inventaris</h1>
        <p className="text-muted-foreground">
          Stok bahan baku dan jejak pergerakan IN, OUT, ADJUST.
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>

      <section aria-labelledby="stok-title" className="space-y-3">
        <h2 id="stok-title" className="text-lg font-semibold">
          Stok saat ini
        </h2>
        <InventarisDaftar items={items} />
      </section>

      <InventarisItemForm />
      <InventarisMovementForm items={items} action={catatPergerakanAdmin} />

      <section aria-labelledby="riwayat-title" className="space-y-3">
        <h2 id="riwayat-title" className="text-lg font-semibold">
          Riwayat pergerakan
        </h2>
        <InventarisRiwayat rows={riwayat} />
      </section>
    </main>
  );
}
