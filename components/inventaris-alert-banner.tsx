import Link from "next/link";
import type { ItemInventaris } from "@prisma/client";

export function InventarisAlertBanner({
  items,
  detailHref,
}: {
  items: ItemInventaris[];
  detailHref: string;
}) {
  if (items.length === 0) return null;

  const kodeRingkas = items
    .slice(0, 3)
    .map((i) => i.kode)
    .join(", ");
  const sisa = items.length > 3 ? ` +${items.length - 3} lainnya` : "";

  return (
    <div
      role="alert"
      className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm"
    >
      <p className="font-medium text-destructive">
        {items.length} item di bawah stok minimum
      </p>
      <p className="mt-1 text-muted-foreground">
        {kodeRingkas}
        {sisa}
      </p>
      <Link
        href={detailHref}
        className="mt-2 inline-flex font-medium text-primary underline-offset-4 hover:underline"
      >
        Lihat daftar stok rendah
      </Link>
    </div>
  );
}
