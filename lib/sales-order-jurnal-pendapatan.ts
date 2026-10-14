import { Prisma } from "@prisma/client";

const nol = new Prisma.Decimal(0);
const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

/** Selaraskan kredit pendapatan dengan total SO (pembulatan multi-baris). */
export function selaraskanPendapatanJurnal(
  total: Prisma.Decimal,
  pendapatanCurah: Prisma.Decimal,
  pendapatanPack: Prisma.Decimal,
): { curah: Prisma.Decimal; pack: Prisma.Decimal } {
  let curah = round2(pendapatanCurah);
  let pack = round2(pendapatanPack);
  const t = round2(total);
  const selisih = round2(t.sub(curah.add(pack)));
  if (selisih.eq(0)) return { curah, pack };
  if (pack.gt(nol)) pack = round2(pack.add(selisih));
  else if (curah.gt(nol)) curah = round2(curah.add(selisih));
  else if (t.gt(nol)) curah = t;
  return { curah, pack };
}
