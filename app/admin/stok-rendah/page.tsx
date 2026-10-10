import Link from "next/link";
import { InventarisStokRendah } from "@/components/inventaris-stok-rendah";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminStokRendahPage() {
  const items = await listAlertStokMinimum();

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Alert stok minimum</h1>
        <p className="text-muted-foreground">
          Item aktif yang stoknya di bawah batas minimum. Perbarui lewat pergerakan IN di
          inventaris.
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>

      <InventarisStokRendah items={items.map(serializeAlertStok)} showRestockHint />
    </div>
  );
}
