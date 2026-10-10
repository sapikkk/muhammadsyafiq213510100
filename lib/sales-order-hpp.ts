import { Prisma } from "@prisma/client";
import { BIAYA_PLASTIK_PER_PACK } from "@/lib/hpp-override";
import type { JenisSo } from "@/lib/sales-order";

const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

/**
 * HPP order MVP (v2-D.1): lubang × HPP/lubang batch + plastik per pack.
 * Moving average varietas = story berikutnya; pakai HPP batch saat DELIVERED.
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
