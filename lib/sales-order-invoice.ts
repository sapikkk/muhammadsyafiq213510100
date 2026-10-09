import { prisma } from "@/lib/prisma";
import { SalesOrderError } from "@/lib/sales-order";

type Db = typeof prisma;

async function generateNomorInvoice(tx: Db): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  const last = await tx.sales_Order.findFirst({
    where: { nomor_invoice: { startsWith: prefix } },
    orderBy: { nomor_invoice: "desc" },
    select: { nomor_invoice: true },
  });
  let seq = 1;
  if (last?.nomor_invoice) {
    seq = (Number.parseInt(last.nomor_invoice.slice(prefix.length), 10) || 0) + 1;
  }
  return `${prefix}${String(seq).padStart(3, "0")}`;
}

const INVOICE_STATUSES = new Set(["CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]);

export async function getSalesOrderInvoice(id: number) {
  const row = await prisma.sales_Order.findUnique({
    where: { id },
    include: {
      pelanggan: true,
      baris: { include: { siklus: { select: { kode_batch: true } } } },
    },
  });
  if (!row) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
  if (!INVOICE_STATUSES.has(row.status)) {
    throw new SalesOrderError("Invoice hanya untuk SO yang sudah dikonfirmasi atau selesai.", 400);
  }
  if (!row.nomor_invoice) {
    const nomor = await prisma.$transaction(async (tx) => {
      const fresh = await tx.sales_Order.findUnique({ where: { id } });
      if (fresh?.nomor_invoice) return fresh.nomor_invoice;
      const generated = await generateNomorInvoice(tx as Db);
      await tx.sales_Order.update({ where: { id }, data: { nomor_invoice: generated } });
      return generated;
    });
    row.nomor_invoice = nomor;
  }
  return row;
}
