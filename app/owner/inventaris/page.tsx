import Link from "next/link";
import { InventarisDaftar } from "@/components/inventaris-daftar";
import { listItemInventaris } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerInventarisPage() {
  const items = await listItemInventaris(true);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Owner</p>
        <h1 className="text-3xl font-semibold tracking-tight">Inventaris</h1>
        <p className="text-muted-foreground">
          Hanya baca stok bahan. Pergerakan di Admin atau Petani.
        </p>
        <Link
          href="/owner"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Owner
        </Link>
      </header>

      <InventarisDaftar items={items} />
    </main>
  );
}
