import "server-only";

import { formatRupiah } from "@/lib/format";
import type { ExportDocument } from "@/lib/export-document-types";
import { getSalesOrderInvoice } from "@/lib/sales-order-invoice";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import {
  labelBarisProduksiUtama,
  labelJenisBaris,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

/** Faktur untuk pelanggan: tanpa HPP dan tanpa kode batch. */
export async function buildInvoicePelangganDocument(soId: number): Promise<ExportDocument> {
  const invoice = await getSalesOrderInvoice(soId);
  const packing = invoice.biaya_packing;
  const grand = invoice.total.add(packing);

  return {
    title: "Faktur penjualan — Kokonus Farm",
    subtitleLines: [
      `No. faktur: ${invoice.nomor_invoice ?? "—"}`,
      `Status: ${labelSalesOrderStatus(invoice.status)}`,
      `Tanggal: ${invoice.dibuat_pada.toLocaleDateString("id-ID")}`,
      "",
      `Pelanggan: ${invoice.pelanggan.nama}`,
      invoice.pelanggan.alamat,
      `${invoice.pelanggan.no_telepon} · ${invoice.pelanggan.email}`,
    ],
    sections: [
      {
        headers: ["Produksi", "Jenis", "Qty", "Harga satuan (Rp)", "Subtotal (Rp)"],
        rows: invoice.baris.map((b) => [
          labelBarisProduksiUtama(partsFromSiklusNested(b.siklus)),
          labelJenisBaris(b.jenis),
          b.jumlah.toString(),
          formatRupiah(b.harga_satuan.toString()),
          formatRupiah(b.subtotal.toString()),
        ]),
      },
      {
        title: "Total",
        headers: ["Pos", "Nominal (Rp)"],
        rows: [
          ["Subtotal barang", formatRupiah(invoice.total.toString())],
          ["Biaya packing", formatRupiah(packing.toString())],
          ["Total tagihan", formatRupiah(grand.toString())],
        ],
      },
    ],
  };
}
