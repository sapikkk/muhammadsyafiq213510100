import "server-only";

import { Prisma, type StatusJurnal, type SumberJurnal } from "@prisma/client";
import type { SerializedJurnalListRow } from "@/lib/jurnal-types";
import { statusJurnalList } from "@/lib/jurnal-status";
import { assertJurnalTanggalAllowed, PeriodLockError } from "@/lib/period-lock";
import { prisma } from "@/lib/prisma";

export type { SerializedJurnalListRow } from "@/lib/jurnal-types";

export class JurnalError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type BarisInput = {
  akunId: number;
  debit: Prisma.Decimal;
  kredit: Prisma.Decimal;
};

export type JurnalInput = {
  tanggal: Date;
  keterangan: string;
  status: Extract<StatusJurnal, "DRAFT" | "PENDING">;
  sumber?: SumberJurnal;
  baris: BarisInput[];
};

export type CreateJurnalOpts = { adminOverridePeriod?: boolean };

const nol = new Prisma.Decimal(0);

function parseDecimal(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (text === "") return nol;
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new JurnalError(
      "Nominal harus angka tanpa pemisah ribuan, maksimal 2 desimal.",
      400,
    );
  }
  return new Prisma.Decimal(text);
}

function parseBaris(raw: unknown): BarisInput {
  const row = (raw ?? {}) as Record<string, unknown>;
  const akunId = Number(row.akunId);
  if (!Number.isInteger(akunId) || akunId <= 0) {
    throw new JurnalError("Setiap baris harus memilih akun.", 400);
  }
  const debit = parseDecimal(row.debit);
  const kredit = parseDecimal(row.kredit);
  if (debit.gt(nol) === kredit.gt(nol)) {
    throw new JurnalError(
      "Setiap baris diisi debit saja atau kredit saja, lebih dari nol.",
      400,
    );
  }
  return { akunId, debit, kredit };
}

export function parseJurnalInput(raw: Record<string, unknown>): JurnalInput {
  const tanggalText = String(raw.tanggal ?? "").trim();
  const keterangan = String(raw.keterangan ?? "").trim();
  const status = String(raw.status ?? "DRAFT");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalText)) {
    throw new JurnalError("Isi tanggal jurnal.", 400);
  }
  if (!keterangan) throw new JurnalError("Isi keterangan jurnal.", 400);
  if (keterangan.length > 255) {
    throw new JurnalError("Keterangan maksimal 255 karakter.", 400);
  }
  if (status !== "DRAFT" && status !== "PENDING") {
    throw new JurnalError("Status awal hanya DRAFT atau PENDING.", 400);
  }
  if (!Array.isArray(raw.baris) || raw.baris.length < 2) {
    throw new JurnalError("Jurnal minimal dua baris.", 400);
  }

  const baris = raw.baris.map(parseBaris);
  const totalDebit = baris.reduce((sum, b) => sum.add(b.debit), nol);
  const totalKredit = baris.reduce((sum, b) => sum.add(b.kredit), nol);
  if (!totalDebit.eq(totalKredit)) {
    throw new JurnalError(
      `Debit dan kredit harus sama. Selisih ${totalDebit.sub(totalKredit).abs().toFixed(2)}.`,
      400,
    );
  }

  const tanggal = new Date(tanggalText);
  return { tanggal, keterangan, status, baris };
}

// Hanya akun aktif tanpa anak yang boleh dipakai di jurnal.
async function assertAkunPosting(akunIds: number[]) {
  const unik = Array.from(new Set(akunIds));
  const akun = await prisma.akun.findMany({
    where: { id: { in: unik } },
    select: { id: true, kode: true, nama: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (akun.length !== unik.length) {
    throw new JurnalError("Ada akun yang tidak ditemukan.", 400);
  }
  const salah = akun.find((a) => !a.aktif || a._count.anak > 0);
  if (salah) {
    throw new JurnalError(
      `Akun ${salah.kode} ${salah.nama} tidak bisa dipakai: ${salah.aktif ? "akun induk" : "nonaktif"}.`,
      400,
    );
  }
}

export async function createJurnal(
  input: JurnalInput,
  dibuatOlehId: number,
  opts?: CreateJurnalOpts,
) {
  try {
    await assertJurnalTanggalAllowed(input.tanggal, {
      adminOverride: opts?.adminOverridePeriod,
    });
  } catch (error) {
    if (error instanceof PeriodLockError) {
      throw new JurnalError(error.message, error.status);
    }
    throw error;
  }
  await assertAkunPosting(input.baris.map((b) => b.akunId));
  return prisma.jurnal.create({
    data: {
      tanggal: input.tanggal,
      keterangan: input.keterangan,
      status: input.status,
      sumber: input.sumber ?? "MANUAL",
      dibuatOlehId,
      baris: { create: input.baris },
    },
    include: { baris: true },
  });
}

export type FilterJurnal = { status?: string; dari?: string; sampai?: string };

export function parseFilter(raw: FilterJurnal) {
  const where: Prisma.JurnalWhereInput = {};
  if (raw.status && (statusJurnalList as string[]).includes(raw.status)) {
    where.status = raw.status as StatusJurnal;
  }
  const tanggal: Prisma.DateTimeFilter = {};
  if (raw.dari && /^\d{4}-\d{2}-\d{2}$/.test(raw.dari)) tanggal.gte = new Date(raw.dari);
  if (raw.sampai && /^\d{4}-\d{2}-\d{2}$/.test(raw.sampai)) tanggal.lte = new Date(raw.sampai);
  if (tanggal.gte || tanggal.lte) where.tanggal = tanggal;
  return where;
}

export function listJurnal(filter: FilterJurnal) {
  return prisma.jurnal.findMany({
    where: parseFilter(filter),
    orderBy: [{ tanggal: "desc" }, { id: "desc" }],
    include: {
      baris: { select: { debit: true } },
      dibuatOleh: { select: { nama: true } },
    },
  });
}

export type JurnalListRow = Awaited<ReturnType<typeof listJurnal>>[number];

export function serializeJurnalListRow(j: JurnalListRow): SerializedJurnalListRow {
  const total = j.baris.reduce((sum, b) => sum.add(b.debit), nol);
  return {
    id: j.id,
    tanggalIso: j.tanggal.toISOString(),
    keterangan: j.keterangan,
    status: j.status,
    sumber: j.sumber,
    dibuatOlehNama: j.dibuatOleh.nama,
    barisCount: j.baris.length,
    totalDebit: total.toString(),
  };
}

export function getJurnal(id: number) {
  return prisma.jurnal.findUnique({
    where: { id },
    include: {
      baris: { include: { akun: { select: { kode: true, nama: true } } } },
      dibuatOleh: { select: { nama: true } },
      diputusOleh: { select: { nama: true } },
    },
  });
}

async function requireStatus(id: number, allowed: StatusJurnal[]) {
  const jurnal = await prisma.jurnal.findUnique({
    where: { id },
    include: { baris: { include: { akun: { select: { tipe: true } } } } },
  });
  if (!jurnal) throw new JurnalError("Jurnal tidak ditemukan.", 404);
  if (!allowed.includes(jurnal.status)) {
    throw new JurnalError(
      `Jurnal berstatus ${jurnal.status}, aksi ini hanya untuk ${allowed.join(" atau ")}.`,
      409,
    );
  }
  return jurnal;
}

export async function ajukanJurnal(id: number) {
  await requireStatus(id, ["DRAFT"]);
  return prisma.jurnal.update({ where: { id }, data: { status: "PENDING" } });
}

// Saldo akun hanya berubah di sini, dalam satu transaksi dengan perubahan status.
export async function setujuiJurnal(id: number, olehId: number) {
  const jurnal = await requireStatus(id, ["PENDING"]);
  const debitNormal = new Set(["ASET", "BEBAN"]);
  return prisma.$transaction([
    ...jurnal.baris.map((b) => {
      const arah = debitNormal.has(b.akun.tipe) ? 1 : -1;
      const delta = b.debit.sub(b.kredit).mul(arah);
      return prisma.akun.update({
        where: { id: b.akunId },
        data: { saldo: { increment: delta } },
      });
    }),
    prisma.jurnal.update({
      where: { id },
      data: { status: "APPROVED", diputusOlehId: olehId, diputusPada: new Date() },
    }),
  ]).then((hasil) => hasil[hasil.length - 1]);
}

export async function tolakJurnal(id: number, olehId: number, alasan: string) {
  const teks = alasan.trim();
  if (!teks) throw new JurnalError("Isi alasan penolakan.", 400);
  await requireStatus(id, ["PENDING"]);
  return prisma.jurnal.update({
    where: { id },
    data: {
      status: "REJECTED",
      alasanTolak: teks,
      diputusOlehId: olehId,
      diputusPada: new Date(),
    },
  });
}

export function listAkunPosting() {
  return prisma.akun.findMany({
    where: { aktif: true, anak: { none: {} } },
    orderBy: { kode: "asc" },
    select: { id: true, kode: true, nama: true },
  });
}
