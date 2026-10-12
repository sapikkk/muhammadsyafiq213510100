import { prisma } from "@/lib/prisma";

export type FinanceHubStats = {
  jurnalMenunggu: number;
  pesananPiutang: number;
  catatanBulanIni: number;
};

export async function getAdminFinanceHubStats(): Promise<FinanceHubStats> {
  const now = new Date();
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1);
  const akhirBulan = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [jurnalMenunggu, pesananPiutang, catatanBulanIni] = await Promise.all([
    prisma.jurnal.count({ where: { status: "PENDING" } }),
    prisma.sales_Order.count({ where: { status_pembayaran: "PIUTANG" } }),
    prisma.jurnal.count({
      where: {
        tanggal: { gte: awalBulan, lte: akhirBulan },
        status: { in: ["APPROVED", "PENDING"] },
      },
    }),
  ]);

  return { jurnalMenunggu, pesananPiutang, catatanBulanIni };
}
