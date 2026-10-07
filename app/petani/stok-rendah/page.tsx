import Link from "next/link";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">Stok rendah</h1>
        <p className="text-muted-foreground">
          Bahan yang perlu diisi ulang. Laporkan ke Admin jika perlu pembelian.
        </p>
        <Link
          href="/petani"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Petani
        </Link>
      </header>

      <InventarisStokRendah items={items} />
    </main>
  );
}
