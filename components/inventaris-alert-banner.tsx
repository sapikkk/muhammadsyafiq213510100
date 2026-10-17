import Link from "next/link";
import { KokonusInlineAlert } from "@/components/kokonus/kokonus-inline-alert";
import type { InventarisAlertBannerItem } from "@/lib/inventaris-types";

export function InventarisAlertBanner({
  items,
  detailHref,
}: {
  items: InventarisAlertBannerItem[];
  detailHref: string;
}) {
  if (items.length === 0) return null;

  const kodeRingkas = items
    .slice(0, 3)
    .map((i) => i.kode)
    .join(", ");
  const sisa = items.length > 3 ? ` +${items.length - 3} lainnya` : "";

  return (
    <KokonusInlineAlert title="Perhatian stok" variant="peringatan">
      <p>
        {items.length} item di bawah stok minimum: {kodeRingkas}
        {sisa}
      </p>
      <Link
        href={detailHref}
        className="mt-2 inline-flex font-medium underline-offset-4 hover:underline"
      >
        Lihat daftar stok rendah
      </Link>
    </KokonusInlineAlert>
  );
}
