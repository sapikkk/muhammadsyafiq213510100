import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/print-button";
import { formatRupiah } from "@/lib/format";
import { SalesOrderError } from "@/lib/sales-order";
import { getSalesOrderInvoice } from "@/lib/sales-order-invoice";

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
    <div className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <PageHeader
          title="Invoice penjualan"
          description={`US5.5 — ${invoice.nomor_invoice ?? ""} untuk ${invoice.nomor_so}`}
        />
        <div className="flex gap-2">
          <Link
            href="/admin/penjualan"
            className="inline-flex h-9 items-center rounded-md border px-3 text-sm"
          >
            Kembali
          </Link>
          <PrintButton />
        </div>
      </div>

      <article className="rounded-md border bg-card p-6 text-sm shadow-sm print:border-0 print:shadow-none">
        <header className="mb-6 border-b pb-4">
          <p className="text-lg font-semibold">Kokonus Farm</p>
          <p className="text-muted-foreground">Invoice {invoice.nomor_invoice}</p>
          <p className="text-muted-foreground">Sales order {invoice.nomor_so}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Status: {invoice.status} · {invoice.dibuat_pada.toLocaleDateString("id-ID")}
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
              <th className="py-2 pr-2">Batch</th>
              <th className="py-2 pr-2">Jenis</th>
              <th className="py-2 pr-2 text-right">Qty</th>
              <th className="py-2 pr-2 text-right">Harga</th>
              <th className="py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.baris.map((b) => (
              <tr key={b.id} className="border-b border-dashed">
                <td className="py-2 pr-2">{b.siklus.kode_batch}</td>
                <td className="py-2 pr-2">{b.jenis}</td>
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
          <p className="mt-6 text-xs text-muted-foreground">Catatan SO: {invoice.catatan}</p>
        ) : null}
      </article>
    </div>
  );
}
