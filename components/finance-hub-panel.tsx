import Link from "next/link";
import { FinanceHubCharts } from "@/components/finance-hub-charts";
import { FinanceModulesTable, type FinanceModuleRow } from "@/components/finance-modules-table";
import { MetricCards } from "@/components/metric-cards";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/format";
import { getFinanceModules } from "@/lib/finance-modules";
import type { FinanceHubStats } from "@/lib/finance-hub-stats";
import type { MonthPoint } from "@/lib/monthly-summary-types";

export function FinanceHubPanel({
  role,
  stats,
  pendapatanBulanIni,
  pengeluaranBulanIni,
  monthTrend,
}: {
  role: "ADMIN" | "OWNER";
  stats: FinanceHubStats;
  pendapatanBulanIni?: number | string;
  pengeluaranBulanIni?: number | string;
  monthTrend?: MonthPoint[];
}) {
  const modules = getFinanceModules(role).filter((m) => m.id !== "ringkasan");

  const badges: Record<string, string | undefined> = {
    transaksi:
      stats.jurnalMenunggu > 0 ? `${stats.jurnalMenunggu} menunggu persetujuan` : undefined,
    penjualan:
      stats.pesananPiutang > 0 ? `${stats.pesananPiutang} pesanan belum lunas` : undefined,
  };

  const moduleRows: FinanceModuleRow[] = modules.map((mod) => ({
    id: mod.id,
    label: mod.label,
    hint: mod.hint,
    href: mod.href,
    badge: badges[mod.id],
  }));

  const cardItems: { label: string; value: string | number }[] = [
    { label: "Catatan bulan ini", value: stats.catatanBulanIni },
    { label: "Menunggu setujui", value: stats.jurnalMenunggu },
    { label: "Pesanan piutang", value: stats.pesananPiutang },
  ];

  if (role === "OWNER" && pendapatanBulanIni != null && pengeluaranBulanIni != null) {
    cardItems.push(
      { label: "Pendapatan bulan ini", value: formatRupiah(pendapatanBulanIni) },
      { label: "Pengeluaran bulan ini", value: formatRupiah(pengeluaranBulanIni) },
    );
  }

  const pintasan =
    role === "ADMIN"
      ? [
          { label: "Catat uang", href: "/admin/jurnal/baru" },
          { label: "Piutang penjualan", href: "/admin/penjualan/piutang" },
          { label: "Semua transaksi", href: "/admin/jurnal" },
        ]
      : [
          { label: "Laba rugi", href: "/owner/laporan?laporan=laba-rugi" },
          { label: "Neraca", href: "/owner/laporan?laporan=neraca" },
          { label: "Arus kas", href: "/owner/arus-kas" },
          { label: "Catatan keuangan", href: "/owner/jurnal" },
        ];

  return (
    <div className="flex flex-col gap-6">
      <PageSection title="Angka singkat" badge="Read">
        <MetricCards items={cardItems} columns={role === "OWNER" ? 3 : 3} />
      </PageSection>

      <FinanceHubCharts
        role={role}
        stats={stats}
        pendapatanBulanIni={pendapatanBulanIni}
        pengeluaranBulanIni={pengeluaranBulanIni}
        monthTrend={monthTrend}
      />

      <PageSection title="Modul keuangan" badge="Read">
        <FinanceModulesTable rows={moduleRows} />
      </PageSection>

      <PageSection title="Pintasan" badge="Read">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tindakan</TableHead>
              <TableHead className="w-[8rem]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pintasan.map((p) => (
              <TableRow key={p.href}>
                <TableCell>{p.label}</TableCell>
                <TableCell>
                  <Link href={p.href} className="text-sm font-medium text-primary hover:underline">
                    Buka
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageSection>
    </div>
  );
}
