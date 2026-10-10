import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesOrderError } from "@/lib/sales-order";

export const statusPembayaranSo = ["BELUM_BAYAR", "DP_DITERIMA", "LUNAS"] as const;
export type StatusPembayaranSo = (typeof statusPembayaranSo)[number];

const nol = new Prisma.Decimal(0);

export function parseJumlahDp(raw: unknown): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") return nol;
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new SalesOrderError("Jumlah DP harus angka valid.", 400);
  }
  const v = new Prisma.Decimal(text);
  if (v.lt(0)) throw new SalesOrderError("Jumlah DP tidak boleh negatif.", 400);
  return v;
}

export async function resolveAkunDpId(akunDpIdRaw: unknown): Promise<number | null> {
  if (akunDpIdRaw === null || akunDpIdRaw === undefined || akunDpIdRaw === "") {
    return null;
  }
  const id = Number(akunDpIdRaw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new SalesOrderError("Akun DP tidak valid.", 400);
  }
  const akun = await prisma.akun.findUnique({ where: { id } });
  if (!akun?.aktif) throw new SalesOrderError("Akun DP tidak ditemukan atau nonaktif.", 400);
  if (akun.tipe !== "KEWAJIBAN") {
    throw new SalesOrderError("Akun DP harus tipe KEWAJIBAN (uang muka pelanggan).", 400);
  }
  return id;
}

/** Default v1: kode 2200 (label seed masih pinjaman; dipakai sebagai akun kewajiban DP sementara). */
export async function defaultAkunDpId(): Promise<number> {
  const akun = await prisma.akun.findUnique({ where: { kode: "2200" } });
  if (!akun?.aktif) throw new SalesOrderError("Akun 2200 tidak siap untuk DP.", 500);
  return akun.id;
}

type Db = typeof prisma;

async function requireKasPosting(tx: Db, kode = "1100") {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new SalesOrderError(`Akun kas ${kode} tidak siap posting.`, 500);
  }
  return akun.id;
}

export async function catatDpSalesOrder(soId: number, userId: number) {
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({
      where: { id: soId },
      include: { akun_dp: true },
    });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status === "DRAFT" || so.status === "CANCELLED") {
      throw new SalesOrderError("Konfirmasi SO dulu sebelum catat DP.", 400);
    }
    if (so.status_pembayaran !== "BELUM_BAYAR") {
      throw new SalesOrderError("DP sudah dicatat atau SO sudah lunas.", 400);
    }
    if (so.jumlah_dp.lte(0)) {
      throw new SalesOrderError("SO ini tidak punya jumlah DP.", 400);
    }
    if (so.jumlah_dp.gt(so.total)) {
      throw new SalesOrderError("Jumlah DP melebihi total SO.", 400);
    }
    const akunDpId = so.akun_dp_id ?? (await defaultAkunDpId());
    const kasId = await requireKasPosting(tx as Db);

    const jurnal = await tx.jurnal.create({
      data: {
        tanggal: new Date(),
        keterangan: `DP ${so.nomor_so}`.slice(0, 255),
        status: "APPROVED",
        dibuatOlehId: userId,
        diputusOlehId: userId,
        diputusPada: new Date(),
        baris: {
          create: [
            { akunId: kasId, debit: so.jumlah_dp, kredit: 0 },
            { akunId: akunDpId, debit: 0, kredit: so.jumlah_dp },
          ],
        },
      },
    });

    await tx.akun.update({ where: { id: kasId }, data: { saldo: { increment: so.jumlah_dp } } });
    await tx.akun.update({
      where: { id: akunDpId },
      data: { saldo: { increment: so.jumlah_dp } },
    });

    return tx.sales_Order.update({
      where: { id: soId },
      data: {
        status_pembayaran: "DP_DITERIMA",
        jurnal_dp_id: jurnal.id,
        akun_dp_id: akunDpId,
      },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
      },
    });
  });
}
