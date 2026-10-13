import "server-only";

import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/format";
import type { ExportDocument } from "@/lib/export-document-types";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

export async function getPelangganRingkas(id: number) {
  return prisma.pelanggan.findUnique({ where: { id } });
}

export async function listRiwayatBelanjaPelanggan(pelangganId: number) {
  const orders = await prisma.sales_Order.findMany({
    where: {
      pelanggan_id: pelangganId,
      status: { not: "DRAFT" },
    },
    orderBy: { dibuat_pada: "desc" },
    include: {
      baris: {
        include: {
          siklus: {
            select: {
              kode_batch: true,
              varietas: { select: { nama: true } },
              kolam: { select: { nama: true, greenhouse: { select: { nama: true } } } },
            },
          },
        },
      },
    },
  });

  return orders.map((o) => {
    const hppTotal = o.baris.reduce((s, b) => s.add(b.hpp_order), o.total.mul(0));
    const omzet = o.total;
    const margin = omzet.sub(hppTotal);
    return {
      id: o.id,
      nomor_so: o.nomor_so,
      nomor_invoice: o.nomor_invoice,
      status: o.status,
      dibuat_pada: o.dibuat_pada.toISOString(),
      omzet: omzet.toString(),
      hpp_total: hppTotal.toString(),
      margin: margin.toString(),
      baris: o.baris.map((b) => ({
        id: b.id,
        produksi: labelBarisProduksiUtama(partsFromSiklusNested(b.siklus)),
        jumlah: b.jumlah.toString(),
        harga_satuan: b.harga_satuan.toString(),
        subtotal: b.subtotal.toString(),
        hpp_order: b.hpp_order.toString(),
      })),
    };
  });
}

/** Riwayat + HPP untuk tim Kokonus (bukan untuk faktur pelanggan). */
export async function buildPelangganRiwayatDocument(pelangganId: number): Promise<ExportDocument | null> {
  const pelanggan = await getPelangganRingkas(pelangganId);
  if (!pelanggan) return null;
  const riwayat = await listRiwayatBelanjaPelanggan(pelangganId);
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

  const rows: string[][] = [];
  for (const o of riwayat) {
    rows.push([
      o.nomor_so,
      o.nomor_invoice ?? "—",
      labelSalesOrderStatus(o.status),
      fmt.format(new Date(o.dibuat_pada)),
      formatRupiah(o.omzet),
      formatRupiah(o.hpp_total),
      formatRupiah(o.margin),
    ]);
  }

  return {
    title: `Riwayat belanja — ${pelanggan.nama}`,
    subtitleLines: [
      "HPP dan margin hanya untuk internal Kokonus Farm.",
      "Faktur pelanggan tidak menampilkan HPP.",
    ],
    sections: [
      {
        headers: [
          "Pesanan jual",
          "Faktur",
          "Status",
          "Tanggal",
          "Omzet (Rp)",
          "HPP (Rp)",
          "Margin (Rp)",
        ],
        rows,
      },
    ],
  };
}
