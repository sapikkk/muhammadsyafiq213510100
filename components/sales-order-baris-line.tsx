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
export function SalesOrderBarisLine({ baris }: { baris: SalesOrderBarisTampilan }) {
  const utama = labelBarisProduksiUtama(baris);
  const jenis = labelJenisBaris(baris.jenis);

  return (
    <li className="space-y-0.5 border-b border-border/60 py-2 last:border-0">
      <p className="font-medium text-foreground">{utama}</p>
      {baris.kodeBatch ? (
        <div className="pt-2">
          <DetailKodeStrip label="Kode batch" kode={baris.kodeBatch} />
        </div>
      ) : null}
      <p className="text-xs text-muted-foreground">
        {jenis} {baris.jumlah}
        {baris.lubang_terpakai ? ` · ${baris.lubang_terpakai} lubang` : ""}
        {baris.hpp_order && baris.hpp_order !== "0" ? ` · HPP ${formatRupiah(baris.hpp_order)}` : ""}
        {" · "}
        {formatRupiah(baris.subtotal)}
      </p>
    </li>
  );
}
