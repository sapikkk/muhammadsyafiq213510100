import { Prisma } from "@prisma/client";
import { pakaiActivePackDalamTx } from "@/lib/active-pack";
import { isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
import { prisma } from "@/lib/prisma";

export class TambalError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const FASE_TAMBAL: FaseProduksi[] = ["SEMAI", "SPROUT_DAUN", "TAMBAL", "PINDAH_KOLAM", "PENDEWASAAN"];

export type TambalInput = {
  siklusId: number;
  activePackId: number;
  jumlahPakai: Prisma.Decimal;
  jumlahBibit: number;
  catatan: string | null;
};

function parseDecimal(raw: unknown, label: string): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(text)) {
    throw new TambalError(`${label} harus angka valid.`, 400);
  }
  return new Prisma.Decimal(text);
}

export function parseTambalInput(raw: Record<string, unknown>): TambalInput {
  const siklusId = Number(raw.siklusId);
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    throw new TambalError("Siklus tidak valid.", 400);
  }
  const activePackId = Number(raw.activePackId);
  if (!Number.isInteger(activePackId) || activePackId <= 0) {
    throw new TambalError("Pilih active pack.", 400);
  }
  const jumlahBibit = Number(raw.jumlahBibit);
  if (!Number.isInteger(jumlahBibit) || jumlahBibit <= 0) {
    throw new TambalError("Jumlah bibit tambal harus bilangan bulat > 0.", 400);
  }
  let catatan: string | null = null;
  if (raw.catatan) {
    catatan = String(raw.catatan).trim().slice(0, 255);
  }
  return {
    siklusId,
    activePackId,
    jumlahPakai: parseDecimal(raw.jumlahPakai, "Jumlah pakai pack"),
    jumlahBibit,
    catatan,
  };
}

export async function catatTambalSusulan(userId: number, input: TambalInput) {
  return prisma.$transaction(async (tx) => {
    const siklus = await tx.siklus_Produksi.findUnique({
      where: { id: input.siklusId },
      include: { biaya_langsung: true },
    });
    if (!siklus) throw new TambalError("Siklus tidak ditemukan.", 404);
    if (!isFaseProduksi(siklus.status) || !FASE_TAMBAL.includes(siklus.status)) {
      throw new TambalError("Tambal susulan hanya sebelum fase panen.", 400);
    }

    const pack = await pakaiActivePackDalamTx(tx, input.activePackId, input.jumlahPakai, {
      userId,
    });
    const biayaTambal = input.jumlahPakai.mul(pack.biayaPerUnit);

    const susutBaru = Math.max(0, siklus.total_susut - input.jumlahBibit);
    const layak = Math.max(0, siklus.jumlah_disemai - susutBaru);

    await tx.siklus_Produksi.update({
      where: { id: input.siklusId },
      data: {
        total_susut: susutBaru,
        jumlah_layak_jual: layak,
      },
    });

    if (siklus.biaya_langsung) {
      const biaya_benih = siklus.biaya_langsung.biaya_benih.add(biayaTambal);
      const subtotal = biaya_benih
        .add(siklus.biaya_langsung.biaya_rockwool)
        .add(siklus.biaya_langsung.biaya_nutrisi)
        .add(siklus.biaya_langsung.biaya_listrik_pompa);
      await tx.biaya_Langsung.update({
        where: { siklus_id: input.siklusId },
        data: { biaya_benih, subtotal },
      });
    }

    const catatanLog = [
      `Tambal: ${input.jumlahBibit} bibit`,
      `pack ${pack.kode}`,
      input.catatan,
    ]
      .filter(Boolean)
      .join(" · ");

    await tx.log_Produksi.create({
      data: {
        siklus_id: input.siklusId,
        fase_dari: siklus.status,
        fase_ke: siklus.status,
        catatan: catatanLog,
        userId,
      },
    });

    return { jumlah_bibit: input.jumlahBibit, biaya_tambal: biayaTambal.toString() };
  });
}
