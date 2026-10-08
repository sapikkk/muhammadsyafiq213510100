import Link from "next/link";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function OwnerStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Owner</p>
        <h1 className="text-3xl font-semibold tracking-tight">Alert stok minimum</h1>
        <p className="text-muted-foreground">Hanya baca. Pembelian dicatat Admin.</p>
        <Link
          href="/owner"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Owner
        </Link>
      </header>

      <InventarisStokRendah items={items} />
    </div>
  );
}
