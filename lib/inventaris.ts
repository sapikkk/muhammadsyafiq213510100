import { Prisma, type ItemInventaris, type SatuanInventaris, type TipePergerakan } from "@prisma/client";
import { satuanInventarisList } from "@/lib/inventaris-satuan";
import { tipePergerakanList } from "@/lib/inventaris-pergerakan";
import { prisma } from "@/lib/prisma";

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
  return (satuanInventarisList as string[]).includes(value);
}

function isTipe(value: string): value is TipePergerakan {
  return (tipePergerakanList as string[]).includes(value);
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
  return { itemId, tipe, jumlah, keterangan, userId };
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
  return prisma.$transaction(async (tx) => {
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

    return tx.pergerakanInventaris.create({
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
  });
}

export function serializeItem(item: ItemInventaris) {
  return {
    ...item,
    stokSaatIni: item.stokSaatIni.toString(),
    stokMinimum: item.stokMinimum.toString(),
    diBawahMinimum: item.stokSaatIni.lt(item.stokMinimum),
  };
}

export type SerializedItemInventaris = ReturnType<typeof serializeItem>;

/** Item aktif dengan stok saat ini di bawah stok minimum (US4.3). */
export async function listAlertStokMinimum() {
  const items = await listItemInventaris(true);
  return items.filter((item) => item.stokSaatIni.lt(item.stokMinimum));
}

export function serializeAlertStok(item: ItemInventaris) {
  const base = serializeItem(item);
  const kekurangan = item.stokMinimum.sub(item.stokSaatIni);
  return {
    ...base,
    kekurangan: kekurangan.gt(0) ? kekurangan.toString() : "0",
  };
}
