import { Badge } from "@/components/ui/badge";
import { formatQty, formatRupiah } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ActivePack, ItemInventaris, User } from "@prisma/client";

type Row = ActivePack & {
  item: Pick<ItemInventaris, "kode" | "nama" | "satuan">;
  dibuatOleh: Pick<User, "nama">;
};

export function ActivePackDaftar({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada active pack.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-1 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">
              {row.kode} · {row.item.kode} {row.item.nama}
            </p>
            {row.status === "HABIS" ? (
              <Badge variant="outline" className="border-muted-foreground">
                Habis
              </Badge>
            ) : (
              <Badge variant="secondary">Aktif</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Biaya/unit: {formatRupiah(row.biayaPerUnit)} · Harga pack:{" "}
            {formatRupiah(row.hargaPack)} · Sisa: {formatQty(row.sisaUnit)} /{" "}
            {formatQty(row.jumlahUnit)}{" "}
            {satuanInventarisLabel[row.item.satuan]}
          </p>
          <p className="text-xs text-muted-foreground">
            Dibuat {row.dibuatOleh.nama}
          </p>
        </li>
      ))}
    </ul>
  );
}
