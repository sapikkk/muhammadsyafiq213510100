import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesOrderError } from "@/lib/sales-order";

type SalesOrderTx = Pick<typeof prisma, "akun" | "jurnal" | "sales_Order">;

const nol = new Prisma.Decimal(0);

function parsePackingAmount(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new SalesOrderError("Biaya packing harus angka valid (maks. 2 desimal).", 400);
  }
  const v = new Prisma.Decimal(text);
  if (v.lt(0)) throw new SalesOrderError("Biaya packing tidak boleh negatif.", 400);
  return v.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}

async function requireAkunPosting(tx: SalesOrderTx, kode: string) {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new SalesOrderError(`Akun ${kode} tidak siap untuk jurnal.`, 500);
  }
  return akun.id;
}

const PACKING_OK = new Set(["CONFIRMED", "SHIPPED", "DELIVERED"]);

export async function recordPackingCost(id: number, userId: number, rawAmount: unknown) {
  const amount = parsePackingAmount(rawAmount);
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({ where: { id } });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status === "CANCELLED" || so.status === "DRAFT") {
      throw new SalesOrderError("Biaya packing hanya untuk SO aktif (bukan DRAFT/CANCELLED).", 400);
    }
    if (!PACKING_OK.has(so.status)) {
      throw new SalesOrderError("Status SO tidak mendukung biaya packing.", 400);
    }
    if (so.jurnal_packing_id && amount.gt(nol) && !so.biaya_packing.eq(amount)) {
      throw new SalesOrderError("Jurnal packing sudah dibuat — hubungi admin jurnal untuk koreksi.", 409);
    }

    let jurnalPackingId = so.jurnal_packing_id;
    if (amount.gt(nol) && !jurnalPackingId) {
      const [bebanId, kasId] = await Promise.all([
        requireAkunPosting(tx, "5400"),
        requireAkunPosting(tx, "1100"),
      ]);
      const tanggal = new Date();
      tanggal.setHours(0, 0, 0, 0);
      const jurnal = await tx.jurnal.create({
        data: {
          tanggal,
          keterangan: `Biaya packing ${so.nomor_so}`.slice(0, 255),
          status: "PENDING",
          dibuatOlehId: userId,
          baris: {
            create: [
              { akunId: bebanId, debit: amount, kredit: nol },
              { akunId: kasId, debit: nol, kredit: amount },
            ],
          },
        },
      });
      jurnalPackingId = jurnal.id;
    }

    return tx.sales_Order.update({
      where: { id },
      data: {
        biaya_packing: amount,
        ...(jurnalPackingId && !so.jurnal_packing_id ? { jurnal_packing_id: jurnalPackingId } : {}),
      },
      include: {
        pelanggan: { select: { nama: true } },
        jurnal_packing: { select: { id: true, status: true } },
      },
    });
  });
}
