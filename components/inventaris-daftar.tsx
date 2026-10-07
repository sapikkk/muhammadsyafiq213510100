import { Badge } from "@/components/ui/badge";
import { formatQty } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ItemInventaris } from "@prisma/client";

export function InventarisDaftar({ items }: { items: ItemInventaris[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada item inventaris.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {items.map((item) => {
        const diBawah = item.stokSaatIni.lt(item.stokMinimum);
        return (
          <li key={item.id} className="space-y-1 p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">
                {item.kode} · {item.nama}
              </p>
              {diBawah ? (
                <Badge variant="outline" className="border-destructive text-destructive">
                  Di bawah minimum
                </Badge>
              ) : null}
            </div>
            <p className="text-muted-foreground">
              Stok:{" "}
              <span className="font-medium text-foreground">
                {formatQty(item.stokSaatIni)}{" "}
                {satuanInventarisLabel[item.satuan]}
              </span>
              {" · "}
              Minimum: {formatQty(item.stokMinimum)}{" "}
              {satuanInventarisLabel[item.satuan]}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
