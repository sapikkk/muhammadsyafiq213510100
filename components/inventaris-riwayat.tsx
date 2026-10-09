import { formatQty } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { tipePergerakanLabel } from "@/lib/inventaris-pergerakan";
import type { PergerakanInventaris, ItemInventaris, User } from "@prisma/client";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

type Row = PergerakanInventaris & {
  item: Pick<ItemInventaris, "kode" | "nama" | "satuan">;
  user: Pick<User, "nama" | "role">;
};

export function InventarisRiwayat({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada pergerakan stok.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-1 p-4 text-sm">
          <p className="font-medium">
            {tipePergerakanLabel[row.tipe]} · {row.item.kode} {row.item.nama}
          </p>
          <p className="text-muted-foreground">
            {formatQty(row.jumlah)} {satuanInventarisLabel[row.item.satuan]} ·{" "}
            {formatQty(row.stokSebelum)} → {formatQty(row.stokSesudah)} ·{" "}
            {row.user.nama} · {waktu.format(row.dibuatPada)}
          </p>
          {row.keterangan ? (
            <p className="text-muted-foreground">{row.keterangan}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
