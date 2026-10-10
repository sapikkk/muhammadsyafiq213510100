import "server-only";

import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import {
  KasSumberError,
  parseSumberKasKode,
  resolveKasAkunId,
  type SumberKasKode,
} from "@/lib/kas-sumber";
import { prisma } from "@/lib/prisma";
import { SalesOrderError } from "@/lib/sales-order";

function fromKasError(error: unknown): never {
  if (error instanceof KasSumberError) {
    throw new SalesOrderError(error.message, error.status);
  }
  throw error;
}

function parseKasForSo(raw: unknown): SumberKasKode {
  try {
    return parseSumberKasKode(raw);
  } catch (error) {
    fromKasError(error);
  }
}

async function resolveKasInTx(tx: Db, kode: SumberKasKode): Promise<number> {
  try {
    return await resolveKasAkunId(tx, kode);
  } catch (error) {
    fromKasError(error);
  }
}

export const statusPembayaranSo = [
  "BELUM_BAYAR",
  "DP_DITERIMA",
  "PIUTANG",
  "LUNAS",
] as const;
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

export async function defaultAkunDpId(): Promise<number> {
  const akun = await prisma.akun.findUnique({ where: { kode: AKUN_KODE.UANG_MUKA } });
  if (!akun?.aktif) throw new SalesOrderError("Akun uang muka (2200) tidak siap untuk DP.", 500);
  return akun.id;
}

export function sisaPiutangSo(so: {
  total: Prisma.Decimal;
  jumlah_dp: Prisma.Decimal;
  jumlah_pelunasan: Prisma.Decimal;
}): Prisma.Decimal {
  return Prisma.Decimal.max(
    nol,
    so.total.sub(so.jumlah_dp).sub(so.jumlah_pelunasan),
  );
}

type Db = typeof prisma;

export async function catatDpSalesOrder(
  soId: number,
  userId: number,
  raw: { sumberKas?: unknown } = {},
) {
  const kasKode = parseKasForSo(raw.sumberKas);

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
    const kasId = await resolveKasInTx(tx as Db, kasKode);

    const jurnal = await tx.jurnal.create({
      data: {
        tanggal: new Date(),
        keterangan: `DP ${so.nomor_so}`.slice(0, 255),
        status: "APPROVED",
        sumber: "AUTO",
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

function parsePelunasanNominal(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new SalesOrderError("Nominal pelunasan tidak valid.", 400);
  }
  const v = new Prisma.Decimal(text);
  if (v.lte(0)) throw new SalesOrderError("Nominal pelunasan harus > 0.", 400);
  return v;
}

export async function catatPelunasanSalesOrder(
  soId: number,
  userId: number,
  raw: { nominal: unknown; sumberKas?: unknown },
) {
  const nominal = parsePelunasanNominal(raw.nominal);
  const kasKode = parseKasForSo(raw.sumberKas);

  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({ where: { id: soId } });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status !== "DELIVERED") {
      throw new SalesOrderError("Pelunasan hanya setelah SO DELIVERED.", 400);
    }
    if (so.status_pembayaran === "LUNAS") {
      throw new SalesOrderError("SO sudah lunas.", 400);
    }
    const sisa = sisaPiutangSo(so);
    if (sisa.lte(0)) {
      throw new SalesOrderError("Tidak ada piutang tersisa.", 400);
    }
    if (nominal.gt(sisa)) {
      throw new SalesOrderError(`Pelunasan melebihi sisa piutang (${sisa.toString()}).`, 400);
    }

    const kasId = await resolveKasInTx(tx as Db, kasKode);
    const piutang = await tx.akun.findUnique({
      where: { kode: AKUN_KODE.PIUTANG },
      select: { id: true, aktif: true, _count: { select: { anak: true } } },
    });
    if (!piutang?.aktif || piutang._count.anak > 0) {
      throw new SalesOrderError("Akun piutang (1200) tidak siap.", 500);
    }

    const jurnal = await tx.jurnal.create({
      data: {
        tanggal: new Date(),
        keterangan: `Pelunasan ${so.nomor_so}`.slice(0, 255),
        status: "APPROVED",
        sumber: "AUTO",
        dibuatOlehId: userId,
        diputusOlehId: userId,
        diputusPada: new Date(),
        baris: {
          create: [
            { akunId: kasId, debit: nominal, kredit: 0 },
            { akunId: piutang.id, debit: 0, kredit: nominal },
          ],
        },
      },
    });

    await tx.akun.update({ where: { id: kasId }, data: { saldo: { increment: nominal } } });
    await tx.akun.update({
      where: { id: piutang.id },
      data: { saldo: { decrement: nominal } },
    });

    const jumlah_pelunasan = so.jumlah_pelunasan.add(nominal);
    const lunas = sisaPiutangSo({ ...so, jumlah_pelunasan }).lte(0);

    return tx.sales_Order.update({
      where: { id: soId },
      data: {
        jumlah_pelunasan,
        akun_pelunasan_id: kasId,
        status_pembayaran: lunas ? "LUNAS" : "PIUTANG",
      },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
      },
    });
  });
}
