import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail-layout";
import { PrintButton } from "@/components/print-button";
import { formatRupiah } from "@/lib/format";
import { SalesOrderError } from "@/lib/sales-order";
import { getSalesOrderInvoice } from "@/lib/sales-order-invoice";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import { DetailKodeStrip } from "@/components/detail-kode-strip";
import {
  labelBarisProduksiUtama,
  labelJenisBaris,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

export const dynamic = "force-dynamic";

export default async function SalesOrderInvoicePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  let invoice;
  try {
    invoice = await getSalesOrderInvoice(id);
  } catch (e) {
    if (e instanceof SalesOrderError && e.status === 404) notFound();
    throw e;
  }

  const subtotal = invoice.total;
  const packing = invoice.biaya_packing;
  const grand = subtotal.add(packing);

  return (
    <div className="print:block">
      <div className="print:hidden">
        <DetailLayout
          backHref={`/admin/penjualan/${id}`}
          backLabel="Kembali ke pesanan jual"
          title="Faktur penjualan"
          description={`${invoice.nomor_invoice ?? "—"} · ${invoice.nomor_so}`}
          actions={<PrintButton />}
        >
          <p className="text-sm text-muted-foreground">
            Pratinjau di bawah. Gunakan Cetak untuk PDF atau kertas.
          </p>
        </DetailLayout>
      </div>

      <article className="mx-auto max-w-3xl rounded-md border bg-card p-6 text-sm print:max-w-none print:border-0 print:p-0">
        <header className="mb-6 border-b pb-4">
          <p className="text-lg font-semibold">Kokonus Farm</p>
          <p className="text-muted-foreground">Faktur {invoice.nomor_invoice}</p>
          <p className="text-muted-foreground">Pesanan jual {invoice.nomor_so}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Status: {labelSalesOrderStatus(invoice.status)} ·{" "}
            {invoice.dibuat_pada.toLocaleDateString("id-ID")}
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium">Pelanggan</p>
            <p>{invoice.pelanggan.nama}</p>
            <p className="text-muted-foreground">{invoice.pelanggan.alamat}</p>
            <p className="text-muted-foreground">
              {invoice.pelanggan.no_telepon} · {invoice.pelanggan.email}
            </p>
          </div>
        </section>

        <table className="mb-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-2">Produksi</th>
              <th className="py-2 pr-2">Jenis</th>
              <th className="py-2 pr-2 text-right">Qty</th>
              <th className="py-2 pr-2 text-right">Harga</th>
              <th className="py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.baris.map((b) => (
              <tr key={b.id} className="border-b border-dashed">
                <td className="py-2 pr-2">
                  <p>{labelBarisProduksiUtama(partsFromSiklusNested(b.siklus))}</p>
                  <div className="mt-2 print:hidden">
                    <DetailKodeStrip label="Kode batch" kode={b.siklus.kode_batch} />
                  </div>
                </td>
                <td className="py-2 pr-2">{labelJenisBaris(b.jenis)}</td>
                <td className="py-2 pr-2 text-right">{b.jumlah.toString()}</td>
                <td className="py-2 pr-2 text-right">{formatRupiah(b.harga_satuan.toString())}</td>
                <td className="py-2 text-right">{formatRupiah(b.subtotal.toString())}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal barang</dt>
            <dd>{formatRupiah(subtotal.toString())}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Biaya packing (operasional)</dt>
            <dd>{formatRupiah(packing.toString())}</dd>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <dt>Total tagihan referensi</dt>
            <dd>{formatRupiah(grand.toString())}</dd>
          </div>
        </dl>

        {invoice.catatan ? (
          <p className="mt-6 text-xs text-muted-foreground">Catatan pesanan: {invoice.catatan}</p>
        ) : null}
      </article>
    </div>
  );
}
