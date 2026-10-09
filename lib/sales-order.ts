import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Db = typeof prisma;

export class SalesOrderError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const jenisSoOptions = ["CURAH", "PACK"] as const;
export type JenisSo = (typeof jenisSoOptions)[number];

export type SoBarisInput = {
  siklusId: number;
  jenis: JenisSo;
  jumlah: Prisma.Decimal;
  hargaSatuan: Prisma.Decimal;
};

export type SalesOrderInput = {
  pelangganId: number;
  catatan: string | null;
  baris: SoBarisInput[];
};

const STATUS_AKTIF_STOK = ["CONFIRMED", "SHIPPED", "DELIVERED"] as const;

function parseJenis(raw: unknown): JenisSo {
  const j = String(raw ?? "").trim().toUpperCase();
  if (!jenisSoOptions.includes(j as JenisSo)) {
    throw new SalesOrderError("Jenis baris harus CURAH atau PACK.", 400);
  }
  return j as JenisSo;
}

function parseMoney(raw: unknown, label: string): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new SalesOrderError(`${label} harus angka valid.`, 400);
  }
  const v = new Prisma.Decimal(text);
  if (v.lte(0)) throw new SalesOrderError(`${label} harus > 0.`, 400);
  return v;
}

function parseQty(raw: unknown, label: string): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new SalesOrderError(`${label} harus angka valid.`, 400);
  }
  const v = new Prisma.Decimal(text);
  if (v.lte(0)) throw new SalesOrderError(`${label} harus > 0.`, 400);
  return v;
}

export function parseSalesOrderInput(raw: Record<string, unknown>): SalesOrderInput {
  const pelangganId = Number(raw.pelangganId);
  if (!Number.isInteger(pelangganId) || pelangganId <= 0) {
    throw new SalesOrderError("Pilih pelanggan.", 400);
  }
  let catatan: string | null = null;
  if (raw.catatan) catatan = String(raw.catatan).trim().slice(0, 500);

  const barisRaw = raw.baris;
  if (!Array.isArray(barisRaw) || barisRaw.length === 0) {
    throw new SalesOrderError("Minimal satu baris pesanan.", 400);
  }

  const baris: SoBarisInput[] = barisRaw.map((row, i) => {
    const r = row as Record<string, unknown>;
    const siklusId = Number(r.siklusId);
    if (!Number.isInteger(siklusId) || siklusId <= 0) {
      throw new SalesOrderError(`Baris ${i + 1}: siklus tidak valid.`, 400);
    }
    return {
      siklusId,
      jenis: parseJenis(r.jenis),
      jumlah: parseQty(r.jumlah, `Baris ${i + 1} jumlah`),
      hargaSatuan: parseMoney(r.hargaSatuan, `Baris ${i + 1} harga`),
    };
  });

  return { pelangganId, catatan, baris };
}

async function generateNomorSo(tx: Db): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `SO-${year}-`;
  const last = await tx.sales_Order.findFirst({
    where: { nomor_so: { startsWith: prefix } },
    orderBy: { nomor_so: "desc" },
    select: { nomor_so: true },
  });
  let seq = 1;
  if (last?.nomor_so) {
    const part = last.nomor_so.slice(prefix.length);
    seq = (Number.parseInt(part, 10) || 0) + 1;
  }
  return `${prefix}${String(seq).padStart(3, "0")}`;
}

export async function listSiklusSiapJual() {
  return prisma.siklus_Produksi.findMany({
    where: {
      status: "SELESAI",
      laporanPanen: { status: "APPROVED" },
    },
    orderBy: { id: "desc" },
    include: {
      varietas: { select: { nama: true, harga_jual_curah: true, harga_jual_pack: true, berat_per_pack: true } },
      laporanPanen: { select: { jumlah_layak: true, berat_layak_gram: true } },
    },
  });
}

export async function jumlahSudahDipesan(siklusId: number, jenis: JenisSo, tx: typeof prisma = prisma) {
  const rows = await tx.sales_Order_Baris.findMany({
    where: {
      siklus_id: siklusId,
      jenis,
      sales_order: { status: { in: [...STATUS_AKTIF_STOK] } },
    },
  });
  return rows.reduce((acc, r) => acc.add(r.jumlah), new Prisma.Decimal(0));
}

export async function stokTersediaSiklus(siklusId: number, jenis: JenisSo, tx: Db = prisma) {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: {
      laporanPanen: true,
      varietas: { select: { berat_per_pack: true } },
    },
  });
  if (!siklus?.laporanPanen || siklus.status !== "SELESAI") {
    return new Prisma.Decimal(0);
  }
  const terpakai = await jumlahSudahDipesan(siklusId, jenis, tx);

  if (jenis === "CURAH") {
    const kg = siklus.laporanPanen.berat_layak_gram.div(1000);
    return Prisma.Decimal.max(0, kg.sub(terpakai));
  }
  const beratPack = siklus.varietas.berat_per_pack;
  if (beratPack.lte(0)) return new Prisma.Decimal(0);
  const packs = siklus.laporanPanen.berat_layak_gram.div(beratPack);
  return Prisma.Decimal.max(0, packs.sub(terpakai));
}

export async function listSalesOrders() {
  return prisma.sales_Order.findMany({
    orderBy: { id: "desc" },
    include: {
      pelanggan: { select: { nama: true } },
      baris: {
        include: {
          siklus: { select: { kode_batch: true } },
        },
      },
    },
  });
}

export function serializeSalesOrder(row: Awaited<ReturnType<typeof listSalesOrders>>[number]) {
  return {
    id: row.id,
    nomor_so: row.nomor_so,
    pelanggan_id: row.pelanggan_id,
    pelanggan_nama: row.pelanggan.nama,
    status: row.status,
    total: row.total.toString(),
    catatan: row.catatan,
    dibuat_pada: row.dibuat_pada.toISOString(),
    baris: row.baris.map((b) => ({
      id: b.id,
      siklus_id: b.siklus_id,
      kode_batch: b.siklus.kode_batch,
      jenis: b.jenis,
      jumlah: b.jumlah.toString(),
      harga_satuan: b.harga_satuan.toString(),
      subtotal: b.subtotal.toString(),
    })),
  };
}

export async function createSalesOrderDraft(userId: number, input: SalesOrderInput) {
  return prisma.$transaction(async (tx) => {
    const pelanggan = await tx.pelanggan.findUnique({ where: { id: input.pelangganId } });
    if (!pelanggan) throw new SalesOrderError("Pelanggan tidak ditemukan.", 404);

    let total = new Prisma.Decimal(0);
    const barisData = [];

    for (const line of input.baris) {
      const siklus = await tx.siklus_Produksi.findUnique({
        where: { id: line.siklusId },
        include: { laporanPanen: true },
      });
      if (!siklus || siklus.status !== "SELESAI" || siklus.laporanPanen?.status !== "APPROVED") {
        throw new SalesOrderError(`Batch #${line.siklusId} belum siap jual.`, 400);
      }
      const subtotal = line.jumlah.mul(line.hargaSatuan);
      total = total.add(subtotal);
      barisData.push({
        siklus_id: line.siklusId,
        jenis: line.jenis,
        jumlah: line.jumlah,
        harga_satuan: line.hargaSatuan,
        subtotal,
      });
    }

    const nomor_so = await generateNomorSo(tx as Db);
    return tx.sales_Order.create({
      data: {
        nomor_so,
        pelanggan_id: input.pelangganId,
        status: "DRAFT",
        total,
        catatan: input.catatan,
        dibuat_oleh_id: userId,
        baris: { create: barisData },
      },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
      },
    });
  });
}

export async function confirmSalesOrder(id: number) {
  return prisma.$transaction(async (tx) => {
    const so = await tx.sales_Order.findUnique({
      where: { id },
      include: { baris: true },
    });
    if (!so) throw new SalesOrderError("Sales order tidak ditemukan.", 404);
    if (so.status !== "DRAFT") {
      throw new SalesOrderError("Hanya SO DRAFT yang bisa dikonfirmasi.", 400);
    }

    for (const line of so.baris) {
      const tersedia = await stokTersediaSiklus(line.siklus_id, line.jenis as JenisSo, tx as Db);
      if (line.jumlah.gt(tersedia)) {
        throw new SalesOrderError(
          `Stok ${line.jenis} batch tidak cukup (tersedia ${tersedia.toString()}, minta ${line.jumlah.toString()}).`,
          400,
        );
      }
    }

    return tx.sales_Order.update({
      where: { id },
      data: { status: "CONFIRMED" },
      include: {
        pelanggan: { select: { nama: true } },
        baris: { include: { siklus: { select: { kode_batch: true } } } },
      },
    });
  });
}
