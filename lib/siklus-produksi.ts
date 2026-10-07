import { Prisma } from "@prisma/client";
import { ActivePackError, pakaiActivePackDalamTx } from "@/lib/active-pack";
import { keTanggalIso } from "@/lib/format";
import { prisma, type PrismaTransaction } from "@/lib/prisma";
import {
  faseBerikutnya,
  faseLabel,
  isFaseProduksi,
  type FaseProduksi,
} from "@/lib/siklus-fase";

export class SiklusError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const FASE_SEMAI = "SEMAI";

export type SiklusInput = {
  varietasId: number;
  kolamId: number;
  tanggalSemai: Date;
  jumlahDisemai: number;
  activePackBenihId: number;
  jumlahBenihPakai: Prisma.Decimal;
  activePackMediaId: number | null;
  jumlahMediaPakai: Prisma.Decimal | null;
};

function parsePositiveInt(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new SiklusError(`${label} harus bilangan bulat lebih dari nol.`, 400);
  }
  return value;
}

function parsePackJumlah(raw: unknown, label: string): Prisma.Decimal {
  if (raw === null || raw === undefined || raw === "") {
    throw new SiklusError(`Isi ${label}.`, 400);
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new SiklusError(`${label} harus angka positif.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lte(0)) {
    throw new SiklusError(`${label} harus lebih dari nol.`, 400);
  }
  return value;
}

function parseTanggal(raw: unknown): Date {
  const text = String(raw ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new SiklusError("Tanggal semai wajib format YYYY-MM-DD.", 400);
  }
  return new Date(`${text}T12:00:00.000Z`);
}

export function parseSiklusInput(raw: Record<string, unknown>): SiklusInput {
  const varietasId = parsePositiveInt(raw.varietasId, "Varietas");
  const kolamId = parsePositiveInt(raw.kolamId, "Kolam");
  const tanggalSemai = parseTanggal(raw.tanggalSemai);
  const jumlahDisemai = parsePositiveInt(raw.jumlahDisemai, "Jumlah disemai");
  const activePackBenihId = parsePositiveInt(raw.activePackBenihId, "Active pack benih");
  const jumlahBenihPakai = parsePackJumlah(raw.jumlahBenihPakai, "Jumlah benih dari pack");

  const mediaIdRaw = raw.activePackMediaId;
  const activePackMediaId =
    mediaIdRaw === null || mediaIdRaw === undefined || mediaIdRaw === ""
      ? null
      : parsePositiveInt(mediaIdRaw, "Active pack media");

  let jumlahMediaPakai: Prisma.Decimal | null = null;
  if (activePackMediaId !== null) {
    jumlahMediaPakai = parsePackJumlah(raw.jumlahMediaPakai, "Jumlah media dari pack");
  }

  return {
    varietasId,
    kolamId,
    tanggalSemai,
    jumlahDisemai,
    activePackBenihId,
    jumlahBenihPakai,
    activePackMediaId,
    jumlahMediaPakai,
  };
}

async function slugKolam(nama: string, id: number) {
  const match = nama.match(/A\d+/i);
  if (match) return match[0].toUpperCase();
  return `K${id}`;
}

async function generateKodeBatch(kolamId: number, tanggal: Date, tx: PrismaTransaction) {
  const kolam = await tx.kolam.findUnique({
    where: { id: kolamId },
    include: { greenhouse: true },
  });
  if (!kolam) throw new SiklusError("Kolam tidak ditemukan.", 404);

  const ghSlug = kolam.greenhouse.nama.replace(/Greenhouse\s*/i, "GH").replace(/\s+/g, "");
  const kolamSlug = await slugKolam(kolam.nama, kolam.id);
  const yymmdd = keTanggalIso(tanggal).replace(/-/g, "").slice(2);
  const prefix = `${ghSlug}-${kolamSlug}-${yymmdd}-`;

  const count = await tx.siklus_Produksi.count({
    where: { kode_batch: { startsWith: prefix } },
  });
  const seq = String(count + 1).padStart(3, "0");
  return `${prefix}${seq}`;
}

function translateError(error: unknown): never {
  if (error instanceof ActivePackError) {
    throw new SiklusError(error.message, error.status);
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new SiklusError("Kode batch bentrok, coba lagi.", 409);
    }
  }
  throw error;
}

export async function listSiklusProduksi() {
  return prisma.siklus_Produksi.findMany({
    orderBy: { id: "desc" },
    include: {
      varietas: { select: { nama: true, status: true } },
      kolam: {
        select: {
          nama: true,
          greenhouse: { select: { nama: true } },
        },
      },
    },
  });
}

export async function buatSiklusSemai(input: SiklusInput) {
  try {
    return await prisma.$transaction(
      async (tx) => {
      const varietas = await tx.varietas.findUnique({ where: { id: input.varietasId } });
      if (!varietas || varietas.status !== "AKTIF") {
        throw new SiklusError("Varietas harus aktif.", 400);
      }

      const kolam = await tx.kolam.findUnique({ where: { id: input.kolamId } });
      if (!kolam) throw new SiklusError("Kolam tidak ditemukan.", 404);
      if (input.jumlahDisemai > kolam.kapasitas_lubang) {
        throw new SiklusError("Jumlah disemai melebihi kapasitas lubang kolam.", 400);
      }

      await pakaiActivePackDalamTx(tx, input.activePackBenihId, input.jumlahBenihPakai);
      if (input.activePackMediaId !== null && input.jumlahMediaPakai !== null) {
        await pakaiActivePackDalamTx(tx, input.activePackMediaId, input.jumlahMediaPakai);
      }

      const kode_batch = await generateKodeBatch(input.kolamId, input.tanggalSemai, tx);

      const siklus = await tx.siklus_Produksi.create({
        data: {
          kode_batch,
          varietas_id: input.varietasId,
          kolam_id: input.kolamId,
          tanggal_semai: input.tanggalSemai,
          jumlah_disemai: input.jumlahDisemai,
          status: FASE_SEMAI,
        },
        include: {
          varietas: { select: { nama: true } },
          kolam: { select: { nama: true } },
        },
      });

      if (kolam.status === "MENGANGGUR") {
        await tx.kolam.update({
          where: { id: kolam.id },
          data: { status: "BERPRODUKSI" },
        });
      }

      return siklus;
    },
    { maxWait: 20_000, timeout: 60_000 },
    );
  } catch (error) {
    translateError(error);
  }
}

export async function getSiklusProduksi(id: number) {
  return prisma.siklus_Produksi.findUnique({
    where: { id },
    include: {
      varietas: { select: { nama: true } },
      kolam: {
        select: { nama: true, greenhouse: { select: { nama: true } } },
      },
    },
  });
}

export async function listLogProduksi(siklusId: number) {
  return prisma.log_Produksi.findMany({
    where: { siklus_id: siklusId },
    orderBy: { waktu: "asc" },
    include: { user: { select: { nama: true } } },
  });
}

function parseCatatan(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const text = String(raw).trim();
  if (text.length > 255) {
    throw new SiklusError("Catatan maksimal 255 karakter.", 400);
  }
  return text;
}

export async function lanjutFase(
  siklusId: number,
  userId: number,
  raw: Record<string, unknown>,
) {
  if (raw.konfirmasi !== true && raw.konfirmasi !== "true" && raw.konfirmasi !== "on") {
    throw new SiklusError("Centang konfirmasi sebelum lanjut fase.", 400);
  }
  const catatan = parseCatatan(raw.catatan);

  return prisma.$transaction(
    async (tx) => {
      const siklus = await tx.siklus_Produksi.findUnique({ where: { id: siklusId } });
      if (!siklus) throw new SiklusError("Siklus tidak ditemukan.", 404);
      if (!isFaseProduksi(siklus.status)) {
        throw new SiklusError("Fase siklus tidak dikenali.", 400);
      }
      const berikut = faseBerikutnya(siklus.status);
      if (!berikut) {
        throw new SiklusError("Siklus sudah di fase akhir.", 400);
      }

      const data: {
        status: FaseProduksi;
        tanggal_pindah_kolam?: Date;
        tanggal_panen?: Date;
      } = { status: berikut };

      const hariIni = new Date(`${keTanggalIso(new Date())}T12:00:00.000Z`);
      if (berikut === "PINDAH_KOLAM") {
        data.tanggal_pindah_kolam = hariIni;
      }
      if (berikut === "PANEN" || berikut === "SELESAI") {
        data.tanggal_panen = hariIni;
      }

      const updated = await tx.siklus_Produksi.update({
        where: { id: siklusId },
        data,
      });

      await tx.log_Produksi.create({
        data: {
          siklus_id: siklusId,
          fase_dari: siklus.status,
          fase_ke: berikut,
          catatan,
          userId,
        },
      });

      return {
        siklus: updated,
        fase_dari: siklus.status as FaseProduksi,
        fase_ke: berikut,
        label_ke: faseLabel[berikut],
      };
    },
    { maxWait: 20_000, timeout: 60_000 },
  );
}

export function serializeSiklus(
  row: Awaited<ReturnType<typeof listSiklusProduksi>>[number],
) {
  return {
    id: row.id,
    kode_batch: row.kode_batch,
    varietas_id: row.varietas_id,
    varietas_nama: row.varietas.nama,
    kolam_id: row.kolam_id,
    kolam_nama: row.kolam.nama,
    greenhouse_nama: row.kolam.greenhouse.nama,
    tanggal_semai: keTanggalIso(row.tanggal_semai),
    tanggal_pindah_kolam: row.tanggal_pindah_kolam
      ? keTanggalIso(row.tanggal_pindah_kolam)
      : null,
    tanggal_panen: row.tanggal_panen ? keTanggalIso(row.tanggal_panen) : null,
    jumlah_disemai: row.jumlah_disemai,
    jumlah_layak_jual: row.jumlah_layak_jual,
    total_susut: row.total_susut,
    status: row.status,
    fase_label: isFaseProduksi(row.status) ? faseLabel[row.status] : row.status,
    fase_berikutnya: faseBerikutnya(row.status),
    fase_berikutnya_label: faseBerikutnya(row.status)
      ? faseLabel[faseBerikutnya(row.status)!]
      : null,
  };
}
