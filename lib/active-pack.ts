import "server-only";

import {
  Prisma,
  type ActivePack,
  type StatusActivePack,
} from "@prisma/client";
import type {
  ActivePackListRow,
  SerializedActivePack,
} from "@/lib/active-pack-types";
import { maybeJurnalPenyesuaianPackHabis } from "@/lib/active-pack-habis-jurnal";
import type { SatuanInventaris } from "@/lib/inventaris-satuan";
import { prisma, type PrismaTransaction } from "@/lib/prisma";

export type { ActivePackListRow, SerializedActivePack } from "@/lib/active-pack-types";

export type PakaiActivePackOpts = { userId?: number; tanggal?: Date };

export class ActivePackError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type ActivePackInput = {
  kode: string;
  itemId: number;
  hargaPack: Prisma.Decimal;
  jumlahUnit: Prisma.Decimal;
  keterangan: string | null;
  userId: number;
};

function parseDecimal(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new ActivePackError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,4})?$/.test(text)) {
    throw new ActivePackError(`${label} harus angka positif.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lte(0)) {
    throw new ActivePackError(`${label} harus lebih dari nol.`, 400);
  }
  return value;
}

function parseHarga(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new ActivePackError("Harga pack harus angka positif, maksimal 2 desimal.", 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lte(0)) {
    throw new ActivePackError("Harga pack harus lebih dari nol.", 400);
  }
  return value;
}

export function parseActivePackInput(
  raw: Record<string, unknown>,
  userId: number,
): ActivePackInput {
  const kode = String(raw.kode ?? "").trim().toUpperCase();
  const itemId = Number(raw.itemId);
  if (!kode || !/^[A-Z0-9-]{2,30}$/.test(kode)) {
    throw new ActivePackError("Kode pack 2–30 karakter, huruf, angka, atau strip.", 400);
  }
  if (!Number.isInteger(itemId) || itemId <= 0) {
    throw new ActivePackError("Pilih item inventaris.", 400);
  }
  const hargaPack = parseHarga(raw.hargaPack);
  const jumlahUnit = parseDecimal(raw.jumlahUnit, "Jumlah unit dalam pack");
  const keteranganRaw = raw.keterangan;
  const keterangan =
    keteranganRaw === null || keteranganRaw === undefined || keteranganRaw === ""
      ? null
      : String(keteranganRaw).trim();
  if (keterangan && keterangan.length > 255) {
    throw new ActivePackError("Keterangan maksimal 255 karakter.", 400);
  }
  return { kode, itemId, hargaPack, jumlahUnit, keterangan, userId };
}

function biayaPerUnit(harga: Prisma.Decimal, unit: Prisma.Decimal): Prisma.Decimal {
  return harga.div(unit).toDecimalPlaces(4);
}

function translatePrisma(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new ActivePackError("Kode pack ini sudah dipakai.", 409);
    }
    if (error.code === "P2025") {
      throw new ActivePackError("Active pack tidak ditemukan.", 404);
    }
  }
  throw error;
}

export async function listActivePack(onlyAktif = false) {
  return prisma.activePack.findMany({
    where: onlyAktif ? { status: "AKTIF" } : undefined,
    orderBy: [{ status: "asc" }, { dibuatPada: "desc" }],
    include: {
      item: { select: { kode: true, nama: true, satuan: true } },
      dibuatOleh: { select: { nama: true } },
    },
  });
}

export async function buatActivePack(input: ActivePackInput): Promise<ActivePack> {
  const item = await prisma.itemInventaris.findUnique({ where: { id: input.itemId } });
  if (!item || !item.aktif) {
    throw new ActivePackError("Item tidak ditemukan atau nonaktif.", 404);
  }
  const perUnit = biayaPerUnit(input.hargaPack, input.jumlahUnit);
  try {
    return await prisma.activePack.create({
      data: {
        kode: input.kode,
        itemId: input.itemId,
        hargaPack: input.hargaPack,
        jumlahUnit: input.jumlahUnit,
        sisaUnit: input.jumlahUnit,
        biayaPerUnit: perUnit,
        keterangan: input.keterangan,
        dibuatOlehId: input.userId,
        status: "AKTIF",
      },
    });
  } catch (error) {
    translatePrisma(error);
  }
}

export async function pakaiActivePackDalamTx(
  tx: PrismaTransaction,
  id: number,
  jumlah: Prisma.Decimal,
  opts?: PakaiActivePackOpts,
): Promise<ActivePack> {
  const pack = await tx.activePack.findUnique({
    where: { id },
    include: { item: { select: { satuan: true, kode: true } } },
  });
  if (!pack) throw new ActivePackError("Active pack tidak ditemukan.", 404);
  if (pack.status !== "AKTIF") {
    throw new ActivePackError("Pack sudah habis atau nonaktif.", 400);
  }
  const sisaBaru = pack.sisaUnit.sub(jumlah);
  if (sisaBaru.lt(0)) {
    throw new ActivePackError(
      `Pack ${pack.kode}: sisa ${pack.sisaUnit.toString()} ${pack.item.satuan.toLowerCase()}, butuh ${jumlah.toString()}. Kurangi jumlah atau pilih pack lain.`,
      400,
    );
  }
  const status: StatusActivePack = sisaBaru.eq(0) ? "HABIS" : "AKTIF";
  const row = await tx.activePack.update({
    where: { id },
    data: { sisaUnit: sisaBaru, status },
  });
  if (status === "HABIS" && opts?.userId) {
    await maybeJurnalPenyesuaianPackHabis(
      tx,
      pack,
      pack.item.kode,
      opts.userId,
      opts.tanggal,
    );
  }
  return row;
}

export async function pakaiActivePack(
  id: number,
  jumlahRaw: unknown,
): Promise<ActivePack> {
  const jumlah = parseDecimal(jumlahRaw, "Jumlah pakai");
  return prisma.$transaction(async (tx) => pakaiActivePackDalamTx(tx, id, jumlah));
}

export function serializeActivePack(
  row: ActivePack & {
    item?: { kode: string; nama: string; satuan: string };
    dibuatOleh?: { nama: string };
  },
): SerializedActivePack {
  return {
    ...row,
    hargaPack: row.hargaPack.toString(),
    jumlahUnit: row.jumlahUnit.toString(),
    sisaUnit: row.sisaUnit.toString(),
    biayaPerUnit: row.biayaPerUnit.toString(),
    depleted: row.status === "HABIS",
  };
}

