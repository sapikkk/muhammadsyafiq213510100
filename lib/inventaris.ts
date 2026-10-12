import "server-only";

import {
  Prisma,
  type ItemInventaris,
  type PergerakanInventaris,
} from "@prisma/client";
import type {
  InventarisAlertBannerItem,
  SerializedAlertStok,
  SerializedItemInventaris,
  SerializedPergerakan,
} from "@/lib/inventaris-types";
import { satuanInventarisList, type SatuanInventaris } from "@/lib/inventaris-satuan";
import { tipePergerakanList, type TipePergerakan } from "@/lib/inventaris-pergerakan";
import { emitStokRendah } from "@/lib/notifikasi-emit";
import { jurnalStokKeluarInventaris } from "@/lib/inventaris-jurnal";
import { prisma } from "@/lib/prisma";

export type {
  SerializedAlertStok,
  SerializedItemInventaris,
  SerializedPergerakan,
} from "@/lib/inventaris-types";

export class InventarisError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type ItemInput = {
  kode: string;
  nama: string;
  satuan: SatuanInventaris;
  stokMinimum: Prisma.Decimal;
};

export type MovementInput = {
  itemId: number;
  tipe: TipePergerakan;
  jumlah: Prisma.Decimal;
  keterangan: string | null;
  userId: number;
  /** Opsional: nilai persediaan untuk jurnal AUTO saat stok keluar (Admin). */
  nilaiPersediaan: Prisma.Decimal | null;
};

const nol = new Prisma.Decimal(0);

function parseDecimal(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new InventarisError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new InventarisError(`${label} harus angka positif, maksimal 3 desimal.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lte(0)) {
    throw new InventarisError(`${label} harus lebih dari nol.`, 400);
  }
  return value;
}

function parseStokMinimum(raw: unknown): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") return nol;
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new InventarisError("Stok minimum harus angka nol atau lebih, maksimal 3 desimal.", 400);
  }
  return new Prisma.Decimal(text);
}

function isSatuan(value: string): value is SatuanInventaris {
  return (satuanInventarisList as readonly string[]).includes(value);
}

function isTipe(value: string): value is TipePergerakan {
  return (tipePergerakanList as readonly string[]).includes(value);
}

export function parseItemInput(raw: Record<string, unknown>): ItemInput {
  const kode = String(raw.kode ?? "").trim();
  const nama = String(raw.nama ?? "").trim();
  const satuan = String(raw.satuan ?? "").trim();

  if (!kode || !nama || !satuan) {
    throw new InventarisError("Isi kode, nama, dan satuan item.", 400);
  }
  if (!/^[A-Z0-9-]{2,30}$/i.test(kode)) {
    throw new InventarisError("Kode item 2–30 karakter, huruf, angka, atau strip.", 400);
  }
  if (nama.length > 100) {
    throw new InventarisError("Nama item maksimal 100 karakter.", 400);
  }
  if (!isSatuan(satuan)) {
    throw new InventarisError("Satuan tidak dikenal.", 400);
  }
  return {
    kode: kode.toUpperCase(),
    nama,
    satuan,
    stokMinimum: parseStokMinimum(raw.stokMinimum),
  };
}

export function parseMovementInput(
  raw: Record<string, unknown>,
  userId: number,
): MovementInput {
  const itemId = Number(raw.itemId);
  const tipe = String(raw.tipe ?? "").trim();
  if (!Number.isInteger(itemId) || itemId <= 0) {
    throw new InventarisError("Pilih item inventaris.", 400);
  }
  if (!isTipe(tipe)) {
    throw new InventarisError("Tipe pergerakan tidak dikenal.", 400);
  }
  const jumlah = parseDecimal(raw.jumlah, "Jumlah");
  const keteranganRaw = raw.keterangan;
  const keterangan =
    keteranganRaw === null || keteranganRaw === undefined || keteranganRaw === ""
      ? null
      : String(keteranganRaw).trim();
  if (keterangan && keterangan.length > 255) {
    throw new InventarisError("Keterangan maksimal 255 karakter.", 400);
  }
  if (tipe === "ADJUST" && !keterangan) {
    throw new InventarisError("Penyesuaian wajib punya keterangan.", 400);
  }
  let nilaiPersediaan: Prisma.Decimal | null = null;
  const nilaiRaw = raw.nilaiPersediaan;
  if (nilaiRaw !== null && nilaiRaw !== undefined && String(nilaiRaw).trim() !== "") {
    const text = String(nilaiRaw).trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(text)) {
      throw new InventarisError("Nilai persediaan harus angka valid (maks. 2 desimal).", 400);
    }
    nilaiPersediaan = new Prisma.Decimal(text);
    if (nilaiPersediaan.lte(0)) {
      throw new InventarisError("Nilai persediaan harus lebih dari nol.", 400);
    }
  }
  return { itemId, tipe, jumlah, keterangan, userId, nilaiPersediaan };
}

function translatePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new InventarisError("Kode item ini sudah dipakai.", 409);
    }
    if (error.code === "P2025") {
      throw new InventarisError("Item tidak ditemukan.", 404);
    }
  }
  throw error;
}

export async function listItemInventaris(onlyAktif = true) {
  return prisma.itemInventaris.findMany({
    where: onlyAktif ? { aktif: true } : undefined,
    orderBy: { kode: "asc" },
  });
}

export async function getItemInventaris(id: number) {
  return prisma.itemInventaris.findUnique({ where: { id } });
}

export async function createItem(input: ItemInput): Promise<ItemInventaris> {
  try {
    return await prisma.itemInventaris.create({
      data: {
        kode: input.kode,
        nama: input.nama,
        satuan: input.satuan,
        stokMinimum: input.stokMinimum,
      },
    });
  } catch (error) {
    translatePrismaError(error);
  }
}

export type ItemUpdateInput = {
  id: number;
  nama: string;
  stokMinimum: Prisma.Decimal;
};

export function parseItemUpdateInput(raw: Record<string, unknown>): ItemUpdateInput {
  const id = Number(raw.itemId);
  const nama = String(raw.nama ?? "").trim();
  if (!Number.isInteger(id) || id <= 0) {
    throw new InventarisError("Item tidak valid.", 400);
  }
  if (!nama) {
    throw new InventarisError("Isi nama item.", 400);
  }
  if (nama.length > 100) {
    throw new InventarisError("Nama item maksimal 100 karakter.", 400);
  }
  return {
    id,
    nama,
    stokMinimum: parseStokMinimum(raw.stokMinimum),
  };
}

export async function updateItem(input: ItemUpdateInput): Promise<ItemInventaris> {
  try {
    return await prisma.itemInventaris.update({
      where: { id: input.id },
      data: {
        nama: input.nama,
        stokMinimum: input.stokMinimum,
      },
    });
  } catch (error) {
    translatePrismaError(error);
  }
}

export async function setItemAktif(id: number, aktif: boolean): Promise<ItemInventaris> {
  const item = await prisma.itemInventaris.findUnique({ where: { id } });
  if (!item) {
    throw new InventarisError("Item tidak ditemukan.", 404);
  }
  if (!aktif && item.aktif) {
    const packAktif = await prisma.activePack.count({
      where: { itemId: id, status: "AKTIF", sisaUnit: { gt: 0 } },
    });
    if (packAktif > 0) {
      throw new InventarisError(
        "Nonaktifkan active pack yang masih berisi stok dulu.",
        400,
      );
    }
  }
  try {
    return await prisma.itemInventaris.update({
      where: { id },
      data: { aktif },
    });
  } catch (error) {
    translatePrismaError(error);
  }
}

export async function listPergerakan(itemId?: number, limit = 50) {
  return prisma.pergerakanInventaris.findMany({
    where: itemId ? { itemId } : undefined,
    orderBy: { dibuatPada: "desc" },
    take: limit,
    include: {
      item: { select: { kode: true, nama: true, satuan: true } },
      user: { select: { nama: true, role: true } },
    },
  });
}

export function serializePergerakan(
  row: Awaited<ReturnType<typeof listPergerakan>>[number],
): SerializedPergerakan {
  return {
    id: row.id,
    tipe: row.tipe,
    jumlah: row.jumlah.toString(),
    stokSebelum: row.stokSebelum.toString(),
    stokSesudah: row.stokSesudah.toString(),
    keterangan: row.keterangan,
    dibuatPada: row.dibuatPada.toISOString(),
    item: row.item,
    user: row.user,
  };
}

export function serializePergerakanBare(row: PergerakanInventaris) {
  return {
    id: row.id,
    itemId: row.itemId,
    tipe: row.tipe,
    jumlah: row.jumlah.toString(),
    stokSebelum: row.stokSebelum.toString(),
    stokSesudah: row.stokSesudah.toString(),
    keterangan: row.keterangan,
    userId: row.userId,
    dibuatPada: row.dibuatPada.toISOString(),
  };
}

function hitungStokBaru(
  saatIni: Prisma.Decimal,
  tipe: TipePergerakan,
  jumlah: Prisma.Decimal,
): Prisma.Decimal {
  if (tipe === "IN") return saatIni.add(jumlah);
  if (tipe === "OUT") return saatIni.sub(jumlah);
  return jumlah;
}

export async function catatPergerakan(input: MovementInput) {
  const movement = await prisma.$transaction(async (tx) => {
    const item = await tx.itemInventaris.findUnique({ where: { id: input.itemId } });
    if (!item || !item.aktif) {
      throw new InventarisError("Item tidak ditemukan atau nonaktif.", 404);
    }

    const stokSesudah = hitungStokBaru(item.stokSaatIni, input.tipe, input.jumlah);
    if (stokSesudah.lt(0)) {
      throw new InventarisError("Stok tidak cukup untuk keluar.", 400);
    }

    await tx.itemInventaris.update({
      where: { id: item.id },
      data: { stokSaatIni: stokSesudah },
    });

    const movement = await tx.pergerakanInventaris.create({
      data: {
        itemId: item.id,
        tipe: input.tipe,
        jumlah: input.jumlah,
        stokSebelum: item.stokSaatIni,
        stokSesudah,
        keterangan: input.keterangan,
        userId: input.userId,
      },
      include: {
        item: { select: { kode: true, nama: true, satuan: true } },
        user: { select: { nama: true, role: true } },
      },
    });

    if (
      input.tipe === "OUT" &&
      input.nilaiPersediaan &&
      input.nilaiPersediaan.gt(0)
    ) {
      const ket =
        input.keterangan?.trim() ||
        `Stok keluar ${item.kode} (${input.jumlah.toString()} ${item.satuan})`;
      await jurnalStokKeluarInventaris(tx, {
        itemKode: item.kode,
        nominal: input.nilaiPersediaan,
        keterangan: ket,
        userId: input.userId,
      });
    }

    return movement;
  });
  const item = await prisma.itemInventaris.findUnique({ where: { id: input.itemId } });
  if (item?.aktif && item.stokSaatIni.lt(item.stokMinimum)) {
    void emitStokRendah(item.id, item.kode, item.nama);
  }
  return movement;
}

export function serializeItem(item: ItemInventaris): SerializedItemInventaris {
  return {
    ...item,
    stokSaatIni: item.stokSaatIni.toString(),
    stokMinimum: item.stokMinimum.toString(),
    diBawahMinimum: item.stokSaatIni.lt(item.stokMinimum),
  };
}

/** Item aktif dengan stok saat ini di bawah stok minimum (US4.3). */
export async function listAlertStokMinimum() {
  const { listAlertStokMinimumCached } = await import("@/lib/cached-queries");
  return listAlertStokMinimumCached();
}

export function alertBannerItems(
  items: ItemInventaris[],
): InventarisAlertBannerItem[] {
  return items.map((i) => ({ kode: i.kode }));
}

export function serializeAlertStok(item: ItemInventaris): SerializedAlertStok {
  const base = serializeItem(item);
  const kekurangan = item.stokMinimum.sub(item.stokSaatIni);
  return {
    ...base,
    kekurangan: kekurangan.gt(0) ? kekurangan.toString() : "0",
  };
}

