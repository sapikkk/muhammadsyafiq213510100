import "server-only";

import { listMonitorFilterOptions } from "@/lib/monitor-kolam-export";
import { prisma } from "@/lib/prisma";

export async function listMonitorFilterOptionsDashboard() {
  const base = await listMonitorFilterOptions();
  const siklus = await prisma.siklus_Produksi.findMany({
    select: {
      id: true,
      kode_batch: true,
      varietas: { select: { nama: true } },
    },
    orderBy: { id: "desc" },
    take: 80,
  });
  return {
    ...base,
    siklus: siklus.map((s) => ({
      id: s.id,
      label: `${s.varietas.nama} · ${s.kode_batch}`,
    })),
  };
}
