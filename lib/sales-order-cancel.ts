import { Prisma, type StatusJurnal } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesOrderError } from "@/lib/sales-order";

type SalesOrderTx = Pick<typeof prisma, "jurnal" | "sales_Order">;

function parseAlasan(raw: unknown): string {
  const t = String(raw ?? "").trim().slice(0, 500);
  if (!t) throw new SalesOrderError("Isi alasan pembatalan.", 400);
  return t;
}

async function createReversalJurnal(
  tx: SalesOrderTx,
  jurnalId: number,
  userId: number,
  keterangan: string,
) {
  const src = await tx.jurnal.findUnique({
    where: { id: jurnalId },
    include: { baris: true },
  });
  if (!src) throw new SalesOrderError("Jurnal asal tidak ditemukan.", 404);
  if (src.status !== "APPROVED") {
    throw new SalesOrderError(`Jurnal #${jurnalId} berstatus ${src.status}, reversal hanya untuk APPROVED.`, 400);
  }
  const tanggal = new Date();
  tanggal.setHours(0, 0, 0, 0);
  return tx.jurnal.create({
    data: {
      tanggal,
      keterangan: keterangan.slice(0, 255),
      status: "PENDING",
      dibuatOlehId: userId,
      baris: {
        create: src.baris.map((b) => ({
          akunId: b.akunId,
          debit: b.kredit,
          kredit: b.debit,
        })),
      },
    },
  });
}

async function voidPendingJurnal(tx: SalesOrderTx, jurnalId: number, olehId: number, alasan: string) {
  const j = await tx.jurnal.findUnique({ where: { id: jurnalId } });
  if (!j) return;
  if (j.status === "PENDING") {
    await tx.jurnal.update({
      where: { id: jurnalId },
      data: {
        status: "REJECTED" as StatusJurnal,
        alasanTolak: alasan.slice(0, 500),
        diputusOlehId: olehId,
        diputusPada: new Date(),
      },
    });
  }
}

export async function cancelSalesOrder(id: number, userId: number, alasanRaw: unknown) {
  const alasan = parseAlasan(alasanRaw);
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({ where: { id } });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status === "CANCELLED") {
      throw new SalesOrderError("SO sudah dibatalkan.", 409);
    }

    let reversalId = so.jurnal_reversal_id;

    if (so.status === "DELIVERED") {
      if (so.jurnal_pendapatan_id) {
        const j = await tx.jurnal.findUnique({ where: { id: so.jurnal_pendapatan_id } });
        if (j?.status === "PENDING") {
          await voidPendingJurnal(tx, j.id, userId, alasan);
        } else if (j?.status === "APPROVED" && !reversalId) {
          const rev = await createReversalJurnal(
            tx,
            j.id,
            userId,
            `Pembatalan ${so.nomor_so} (reversal pendapatan)`,
          );
          reversalId = rev.id;
        }
      }
      if (so.jurnal_packing_id) {
        const j = await tx.jurnal.findUnique({ where: { id: so.jurnal_packing_id } });
        if (j?.status === "PENDING") {
          await voidPendingJurnal(tx, j.id, userId, alasan);
        } else if (j?.status === "APPROVED") {
          await createReversalJurnal(tx, j.id, userId, `Pembatalan ${so.nomor_so} (reversal packing)`);
        }
      }
    }

    return tx.sales_Order.update({
      where: { id },
      data: {
        status: "CANCELLED",
        alasan_batal: alasan,
        dibatalkan_pada: new Date(),
        dibatalkan_oleh_id: userId,
        ...(reversalId && !so.jurnal_reversal_id ? { jurnal_reversal_id: reversalId } : {}),
      },
      include: {
        pelanggan: { select: { nama: true } },
        jurnal_reversal: { select: { id: true, status: true } },
      },
    });
  });
}
