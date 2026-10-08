import { Prisma } from "@prisma/client";
import { keTanggalIso } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export class HarvestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type HarvestInput = {
  siklusId: number;
  beratLayakGram: Prisma.Decimal;
  beratTidakLayakGram: Prisma.Decimal;
  jumlahLayak: number;
  jumlahTidakLayak: number;
  catatan: string | null;
};

function parsePositiveInt(raw: unknown, label: string): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new HarvestError(`${label} harus bilangan bulat nol atau lebih.`, 400);
  }
  return value;
}

function parseGram(raw: unknown, label: string): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new HarvestError(`${label} harus angka gram valid.`, 400);
  }
  const value = new Prisma.Decimal(text);
  if (value.lt(0)) {
    throw new HarvestError(`${label} tidak boleh negatif.`, 400);
  }
  return value;
}

function parseCatatan(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const text = String(raw).trim();
  if (text.length > 500) {
    throw new HarvestError("Catatan maksimal 500 karakter.", 400);
  }
  return text;
}

function parseSiklusId(raw: unknown): number {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new HarvestError("Siklus tidak valid.", 400);
  }
  return value;
}

export function parseHarvestInput(raw: Record<string, unknown>): HarvestInput {
  const siklusId = parseSiklusId(raw.siklusId);
  const jumlahLayak = parsePositiveInt(raw.jumlahLayak, "Jumlah layak jual");
  const jumlahTidakLayak = parsePositiveInt(raw.jumlahTidakLayak, "Jumlah tidak layak");
  if (jumlahLayak + jumlahTidakLayak <= 0) {
    throw new HarvestError("Isi minimal satu jumlah layak atau tidak layak.", 400);
  }
  return {
    siklusId,
    beratLayakGram: parseGram(raw.beratLayakGram, "Berat layak (gram)"),
    beratTidakLayakGram: parseGram(raw.beratTidakLayakGram, "Berat tidak layak (gram)"),
    jumlahLayak,
    jumlahTidakLayak,
    catatan: parseCatatan(raw.catatan),
  };
}

export async function kirimLaporanPanen(userId: number, input: HarvestInput) {
  return prisma.$transaction(
    async (tx) => {
      const siklus = await tx.siklus_Produksi.findUnique({
        where: { id: input.siklusId },
        include: { laporanPanen: true },
      });
      if (!siklus) throw new HarvestError("Siklus tidak ditemukan.", 404);
      if (siklus.status !== "PANEN") {
        throw new HarvestError("Laporan panen hanya saat fase Panen & sortasi.", 400);
      }
      if (siklus.laporanPanen) {
        throw new HarvestError("Batch ini sudah punya laporan panen.", 409);
      }
      const totalSortasi = input.jumlahLayak + input.jumlahTidakLayak;
      if (totalSortasi > siklus.jumlah_disemai) {
        throw new HarvestError("Total sortasi melebihi jumlah disemai.", 400);
      }

      const susutBaru = siklus.total_susut + input.jumlahTidakLayak;
      const layakJual = input.jumlahLayak;

      const laporan = await tx.laporan_Panen.create({
        data: {
          siklus_id: input.siklusId,
          berat_layak_gram: input.beratLayakGram,
          berat_tidak_layak_gram: input.beratTidakLayakGram,
          jumlah_layak: input.jumlahLayak,
          jumlah_tidak_layak: input.jumlahTidakLayak,
          status: "PENDING",
          catatan: input.catatan,
          userId,
        },
      });

      await tx.siklus_Produksi.update({
        where: { id: input.siklusId },
        data: {
          jumlah_layak_jual: layakJual,
          total_susut: susutBaru,
        },
      });

      return laporan;
    },
    { maxWait: 20_000, timeout: 60_000 },
  );
}

export async function listLaporanPanen(status?: string) {
  return prisma.laporan_Panen.findMany({
    where: status ? { status } : undefined,
    orderBy: { waktu_kirim: "desc" },
    include: {
      siklus: {
        select: {
          kode_batch: true,
          jumlah_disemai: true,
          varietas: { select: { nama: true } },
        },
      },
      user: { select: { nama: true } },
    },
  });
}

export function serializeLaporanPanen(
  row: Awaited<ReturnType<typeof listLaporanPanen>>[number],
) {
  return {
    id: row.id,
    siklus_id: row.siklus_id,
    kode_batch: row.siklus.kode_batch,
    varietas_nama: row.siklus.varietas.nama,
    jumlah_disemai: row.siklus.jumlah_disemai,
    berat_layak_gram: row.berat_layak_gram.toString(),
    berat_tidak_layak_gram: row.berat_tidak_layak_gram.toString(),
    jumlah_layak: row.jumlah_layak,
    jumlah_tidak_layak: row.jumlah_tidak_layak,
    status: row.status,
    catatan: row.catatan,
    petani_nama: row.user.nama,
    waktu_kirim: row.waktu_kirim.toISOString(),
  };
}

export function serializeLaporanRingkas(
  row: NonNullable<Awaited<ReturnType<typeof getLaporanBySiklus>>>,
) {
  return {
    id: row.id,
    status: row.status,
    jumlah_layak: row.jumlah_layak,
    jumlah_tidak_layak: row.jumlah_tidak_layak,
    berat_layak_gram: row.berat_layak_gram.toString(),
    berat_tidak_layak_gram: row.berat_tidak_layak_gram.toString(),
    waktu_kirim: keTanggalIso(row.waktu_kirim),
  };
}

export async function getLaporanBySiklus(siklusId: number) {
  return prisma.laporan_Panen.findUnique({ where: { siklus_id: siklusId } });
}
