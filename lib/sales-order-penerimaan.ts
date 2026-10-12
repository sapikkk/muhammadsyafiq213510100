import { Prisma } from "@prisma/client";

export class PenerimaanPenjualanError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const nol = new Prisma.Decimal(0);
const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

/** Kosong = anggap lunas di kas (total − DP). */
export function parseUangDiterimaDeliver(
  raw: unknown,
  total: Prisma.Decimal,
  dp: Prisma.Decimal,
): Prisma.Decimal {
  const sisaTagihan = round2(Prisma.Decimal.max(nol, total.sub(dp)));
  if (raw === null || raw === undefined || String(raw).trim() === "") {
    return sisaTagihan;
  }
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new PenerimaanPenjualanError("Uang diterima harus angka valid.", 400);
  }
  const v = round2(new Prisma.Decimal(text));
  if (v.lt(0)) throw new PenerimaanPenjualanError("Uang diterima tidak boleh negatif.", 400);
  if (v.gt(sisaTagihan)) {
    throw new PenerimaanPenjualanError(
      `Uang diterima tidak boleh lebih dari sisa tagihan (${sisaTagihan.toString()}).`,
      400,
    );
  }
  return v;
}

export function splitPenerimaanPenjualan(
  total: Prisma.Decimal,
  dp: Prisma.Decimal,
  uangDiterima: Prisma.Decimal,
): { kas: Prisma.Decimal; piutang: Prisma.Decimal } {
  const sisa = round2(total.sub(dp));
  const kas = round2(Prisma.Decimal.min(uangDiterima, sisa));
  const piutang = round2(sisa.sub(kas));
  return { kas, piutang };
}
