import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatQty } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ItemInventaris } from "@prisma/client";

type Props = {
  items: ItemInventaris[];
  showRestockHint?: boolean;
};

export function InventarisStokRendah({ items, showRestockHint = false }: Props) {
  if (items.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Semua stok di atas minimum. Tidak ada alert saat ini.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {items.map((item) => {
        const kekurangan = item.stokMinimum.sub(item.stokSaatIni);
        return (
          <li key={item.id} className="space-y-2 p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">
                {item.kode} · {item.nama}
              </p>
              <Badge variant="outline" className="border-destructive text-destructive">
                Stok rendah
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Stok:{" "}
              <span className="font-medium text-destructive">
                {formatQty(item.stokSaatIni)} {satuanInventarisLabel[item.satuan]}
              </span>
              {" · "}
              Minimum: {formatQty(item.stokMinimum)}{" "}
              {satuanInventarisLabel[item.satuan]}
            </p>
            {kekurangan.gt(0) ? (
              <p className="text-muted-foreground">
                Kekurangan:{" "}
                <span className="font-medium text-foreground">
                  {formatQty(kekurangan)} {satuanInventarisLabel[item.satuan]}
                </span>
              </p>
            ) : null}
            {showRestockHint ? (
              <Link
                href="/admin/inventaris"
                className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Catat pembelian di inventaris
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
