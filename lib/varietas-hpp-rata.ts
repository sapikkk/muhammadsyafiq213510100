import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);
const round2 = (d: Prisma.Decimal) => d.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);

const DEFAULT_BATCH_LIMIT = 5;

/**
 * Moving average HPP/lubang dari panen APPROVED terakhir per varietas (bobot = lubang layak jual).
 */
export async function rataHppPerLubangVarietas(
  varietasId: number,
  opts?: { batchLimit?: number },
): Promise<Prisma.Decimal | null> {
  const limit = opts?.batchLimit ?? DEFAULT_BATCH_LIMIT;
  const panen = await prisma.laporan_Panen.findMany({
    where: {
      status: "APPROVED",
      siklus: { varietas_id: varietasId, hpp: { isNot: null } },
    },
    orderBy: { waktu_kirim: "desc" },
    take: limit,
    select: {
      siklus: {
        select: {
          jumlah_layak_jual: true,
          hpp: { select: { hpp_per_lubang: true } },
        },
      },
    },
  });

  let bobot = 0;
  let weighted = nol;
  for (const row of panen) {
    const hppL = row.siklus.hpp?.hpp_per_lubang;
    const lubang = row.siklus.jumlah_layak_jual;
    if (!hppL || hppL.lte(0) || lubang <= 0) continue;
    weighted = weighted.add(hppL.mul(lubang));
    bobot += lubang;
  }
  if (bobot === 0) return null;
  return round2(weighted.div(bobot));
}

export async function mapRataHppPerLubangSemuaVarietas(): Promise<Map<number, string>> {
  const varietas = await prisma.varietas.findMany({ select: { id: true } });
  const out = new Map<number, string>();
  await Promise.all(
    varietas.map(async (v) => {
      const rata = await rataHppPerLubangVarietas(v.id);
      if (rata) out.set(v.id, rata.toFixed(2));
    }),
  );
  return out;
}
