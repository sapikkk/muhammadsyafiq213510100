import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hitungHppOrderBaris } from "@/lib/sales-order-hpp";
import {
  defaultAkunDpId,
  parseJumlahDp,
  resolveAkunDpId,
} from "@/lib/sales-order-pembayaran";

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
  lubangTerpakai: number;
  hargaSatuan: Prisma.Decimal;
};

export type SalesOrderInput = {
  pelangganId: number;
  catatan: string | null;
  jumlahDp: Prisma.Decimal;
  akunDpId: number | null;
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

function parseLubang(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new SalesOrderError(`${label} harus bilangan bulat lebih dari nol.`, 400);
  }
  return value;
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
      lubangTerpakai: parseLubang(r.lubangTerpakai, `Baris ${i + 1} lubang terpakai`),
      hargaSatuan: parseMoney(r.hargaSatuan, `Baris ${i + 1} harga`),
    };
  });

  const jumlahDp = parseJumlahDp(raw.jumlahDp);
  let akunDpId: number | null = null;
  if (raw.akunDpId !== undefined && raw.akunDpId !== null && raw.akunDpId !== "") {
    const id = Number(raw.akunDpId);
    if (!Number.isInteger(id) || id <= 0) {
      throw new SalesOrderError("Akun DP tidak valid.", 400);
    }
    akunDpId = id;
  }

  return { pelangganId, catatan, jumlahDp, akunDpId, baris };
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

export async function lubangSudahDipesan(siklusId: number, tx: Db = prisma) {
  const rows = await tx.sales_Order_Baris.findMany({
    where: {
      siklus_id: siklusId,
      sales_order: { status: { in: [...STATUS_AKTIF_STOK] } },
    },
    select: { lubang_terpakai: true },
  });
  return rows.reduce((acc, r) => acc + r.lubang_terpakai, 0);
}

export async function stokLubangTersedia(siklusId: number, tx: Db = prisma) {
  const siklus = await tx.siklus_Produksi.findUnique({
    where: { id: siklusId },
    include: { laporanPanen: true },
  });
  if (!siklus?.laporanPanen || siklus.status !== "SELESAI") return 0;
  const layak = siklus.laporanPanen.jumlah_layak;
  const terpakai = await lubangSudahDipesan(siklusId, tx);
  return Math.max(0, layak - terpakai);
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
      jurnal_pendapatan: { select: { id: true, status: true, keterangan: true } },
      jurnal_packing: { select: { id: true, status: true } },
      jurnal_dp: { select: { id: true, status: true } },
      akun_dp: { select: { id: true, kode: true, nama: true } },
      baris: {
        include: {
          siklus: { select: { kode_batch: true } },
        },
      },
    },
  });
}

type SoSerializeRow = {
  id: number;
  nomor_so: string;
  pelanggan_id: number;
  pelanggan: { nama: string };
  status: string;
  total: Prisma.Decimal;
  catatan: string | null;
  dibuat_pada: Date;
  dikirim_pada?: Date | null;
  terkirim_pada?: Date | null;
  catatan_pengiriman?: string | null;
  nomor_invoice?: string | null;
  biaya_packing?: Prisma.Decimal;
  alasan_batal?: string | null;
  jurnal_pendapatan?: { id: number; status: string; keterangan: string } | null;
  jurnal_packing?: { id: number; status: string } | null;
  jumlah_dp?: Prisma.Decimal;
  jumlah_pelunasan?: Prisma.Decimal;
  akun_dp_id?: number | null;
  akun_dp?: { id: number; kode: string; nama: string } | null;
  status_pembayaran?: string;
  jurnal_dp?: { id: number; status: string } | null;
  baris: {
    id: number;
    siklus_id: number;
    jenis: string;
    jumlah: Prisma.Decimal;
    lubang_terpakai: number;
    hpp_order: Prisma.Decimal;
    harga_satuan: Prisma.Decimal;
    subtotal: Prisma.Decimal;
    siklus: { kode_batch: string };
  }[];
};

export function serializeSalesOrder(row: SoSerializeRow) {
  return {
    id: row.id,
    nomor_so: row.nomor_so,
    pelanggan_id: row.pelanggan_id,
    pelanggan_nama: row.pelanggan.nama,
    status: row.status,
    total: row.total.toString(),
    catatan: row.catatan,
    dibuat_pada: row.dibuat_pada.toISOString(),
    dikirim_pada: row.dikirim_pada?.toISOString() ?? null,
    terkirim_pada: row.terkirim_pada?.toISOString() ?? null,
    catatan_pengiriman: row.catatan_pengiriman ?? null,
    jurnal_pendapatan_id: row.jurnal_pendapatan?.id ?? null,
    jurnal_pendapatan_status: row.jurnal_pendapatan?.status ?? null,
    nomor_invoice: row.nomor_invoice ?? null,
    biaya_packing: row.biaya_packing?.toString() ?? "0",
    alasan_batal: row.alasan_batal ?? null,
    jurnal_packing_id: row.jurnal_packing?.id ?? null,
    jurnal_packing_status: row.jurnal_packing?.status ?? null,
    jumlah_dp: row.jumlah_dp?.toString() ?? "0",
    jumlah_pelunasan: row.jumlah_pelunasan?.toString() ?? "0",
    akun_dp_id: row.akun_dp_id ?? null,
    akun_dp_kode: row.akun_dp?.kode ?? null,
    status_pembayaran: row.status_pembayaran ?? "BELUM_BAYAR",
    jurnal_dp_id: row.jurnal_dp?.id ?? null,
    jurnal_dp_status: row.jurnal_dp?.status ?? null,
    baris: row.baris.map((b) => ({
      id: b.id,
      siklus_id: b.siklus_id,
      kode_batch: b.siklus.kode_batch,
      jenis: b.jenis,
      jumlah: b.jumlah.toString(),
      lubang_terpakai: b.lubang_terpakai,
      hpp_order: b.hpp_order.toString(),
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
        include: { laporanPanen: true, hpp: true },
      });
      if (!siklus || siklus.status !== "SELESAI" || siklus.laporanPanen?.status !== "APPROVED") {
        throw new SalesOrderError(`Batch #${line.siklusId} belum siap jual.`, 400);
      }
      if (!siklus.hpp) {
        throw new SalesOrderError(`Batch #${line.siklusId} belum punya HPP (approve panen).`, 400);
      }
      const lubangTersedia = await stokLubangTersedia(line.siklusId, tx as Db);
      if (line.lubangTerpakai > lubangTersedia) {
        throw new SalesOrderError(
          `Lubang batch tidak cukup (tersedia ${lubangTersedia}, minta ${line.lubangTerpakai}).`,
          400,
        );
      }
      const hppOrder = hitungHppOrderBaris(
        siklus.hpp.hpp_per_lubang,
        line.jenis,
        line.lubangTerpakai,
        line.jumlah,
      );
      const subtotal = line.jumlah.mul(line.hargaSatuan);
      total = total.add(subtotal);
      barisData.push({
        siklus_id: line.siklusId,
        jenis: line.jenis,
        jumlah: line.jumlah,
        lubang_terpakai: line.lubangTerpakai,
        hpp_order: hppOrder,
        harga_satuan: line.hargaSatuan,
        subtotal,
      });
    }

    if (input.jumlahDp.gt(total)) {
      throw new SalesOrderError("Jumlah DP tidak boleh melebihi total SO.", 400);
    }
    let akun_dp_id: number | null = null;
    if (input.jumlahDp.gt(0)) {
      if (input.akunDpId) {
        akun_dp_id = await resolveAkunDpId(input.akunDpId);
      } else {
        akun_dp_id = await defaultAkunDpId();
      }
    }

    const nomor_so = await generateNomorSo(tx as Db);
    return tx.sales_Order.create({
      data: {
        nomor_so,
        pelanggan_id: input.pelangganId,
        status: "DRAFT",
        total,
        catatan: input.catatan,
        jumlah_dp: input.jumlahDp,
        akun_dp_id,
        status_pembayaran: "BELUM_BAYAR",
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
      const lubangTersedia = await stokLubangTersedia(line.siklus_id, tx as Db);
      if (line.lubang_terpakai > lubangTersedia) {
        throw new SalesOrderError(
          `Lubang batch tidak cukup (tersedia ${lubangTersedia}, minta ${line.lubang_terpakai}).`,
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
