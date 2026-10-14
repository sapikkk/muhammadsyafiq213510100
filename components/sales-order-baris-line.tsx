import { DetailKodeStrip } from "@/components/detail-kode-strip";
import { formatRupiah } from "@/lib/format";
import {
  labelBarisProduksiUtama,
  labelJenisBaris,
  type SiklusLabelParts,
} from "@/lib/produksi-ui-labels";

export type SalesOrderBarisTampilan = SiklusLabelParts & {
  jenis: string;
  jumlah: string;
  lubang_terpakai?: number;
  hpp_order?: string;
  subtotal: string;
};

/** Satu baris item di detail pesanan — kode batch kecil & abu-abu. */
export function SalesOrderBarisLine({
  baris,
  compact = false,
}: {
  baris: SalesOrderBarisTampilan;
  compact?: boolean;
}) {
  const utama = labelBarisProduksiUtama(baris);
  const jenis = labelJenisBaris(baris.jenis);

  return (
    <li className={compact ? "px-3 py-2.5" : "space-y-0.5 border-b border-border/60 py-2 last:border-0"}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-medium text-foreground">{utama}</p>
        <p className="shrink-0 text-sm font-medium tabular-nums">{formatRupiah(baris.subtotal)}</p>
      </div>
      {compact && baris.kodeBatch ? (
        <p className="text-xs text-muted-foreground">Batch {baris.kodeBatch}</p>
      ) : null}
      {!compact && baris.kodeBatch ? (
        <div className="pt-2">
          <DetailKodeStrip label="Kode batch" kode={baris.kodeBatch} />
        </div>
      ) : null}
      <p className="text-xs text-muted-foreground">
        {jenis} {baris.jumlah}
        {baris.lubang_terpakai ? ` · ${baris.lubang_terpakai} lubang` : ""}
        {!compact && baris.hpp_order && baris.hpp_order !== "0"
          ? ` · HPP ${formatRupiah(baris.hpp_order)}`
          : null}
        {compact && baris.hpp_order && baris.hpp_order !== "0"
          ? ` · HPP ${formatRupiah(baris.hpp_order)}`
          : null}
      </p>
    </li>
  );
}
