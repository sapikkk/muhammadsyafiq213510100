import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);

export async function kpiHidroponikMvp() {
  const panen = await prisma.laporan_Panen.findMany({
    where: { status: "APPROVED" },
    select: {
      jumlah_layak: true,
      jumlah_tidak_layak: true,
      siklus: {
        select: {
          jumlah_disemai: true,
          hpp: { select: { hpp_per_lubang: true, total_biaya: true } },
        },
      },
    },
  });

  let sumHppLubang = nol;
  let countHpp = 0;
  let sumYield = nol;
  let countYield = 0;

  for (const row of panen) {
    const hppL = row.siklus.hpp?.hpp_per_lubang;
    if (hppL && hppL.gt(0)) {
      sumHppLubang = sumHppLubang.add(hppL);
      countHpp += 1;
    }
    const disemai = row.siklus.jumlah_disemai;
    if (disemai > 0 && row.jumlah_layak >= 0) {
      const yieldPct = new Prisma.Decimal(row.jumlah_layak).div(disemai).mul(100);
      sumYield = sumYield.add(yieldPct);
      countYield += 1;
    }
  }

  const avgHppPerLubang =
    countHpp > 0 ? sumHppLubang.div(countHpp) : nol;
  const avgYieldPct = countYield > 0 ? sumYield.div(countYield) : nol;

  return {
    batchPanenApproved: panen.length,
    avgHppPerLubang: avgHppPerLubang.toFixed(2),
    avgYieldPct: avgYieldPct.toFixed(1),
  };
}
