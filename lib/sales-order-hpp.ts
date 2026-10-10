import { Prisma } from "@prisma/client";
import { BIAYA_PLASTIK_PER_PACK } from "@/lib/hpp-override";
import type { JenisSo } from "@/lib/sales-order";

const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

/** Batch HPP prioritas; fallback rata varietas jika batch nol (v2-D moving avg). */
export function resolveHppPerLubangUntukOrder(
  batchHppPerLubang: Prisma.Decimal,
  rataVarietas: Prisma.Decimal | null,
): Prisma.Decimal {
  if (batchHppPerLubang.gt(0)) return batchHppPerLubang;
  return rataVarietas ?? batchHppPerLubang;
}

/**
 * HPP order (v2-D): lubang × HPP/lubang + plastik per pack.
 */
export function hitungHppOrderBaris(
  hppPerLubang: Prisma.Decimal,
  jenis: JenisSo,
  lubangTerpakai: number,
  jumlahPackAtauKg: Prisma.Decimal,
): Prisma.Decimal {
  if (lubangTerpakai <= 0) return new Prisma.Decimal(0);
  let total = new Prisma.Decimal(lubangTerpakai).mul(hppPerLubang);
  if (jenis === "PACK") {
    total = total.add(jumlahPackAtauKg.mul(BIAYA_PLASTIK_PER_PACK));
  }
  return round2(total);
}
