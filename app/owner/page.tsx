import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { OwnerKpiCards } from "@/components/owner-kpi-cards";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { PageHeader } from "@/components/page-header";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { monthlySummary } from "@/lib/monthly-summary";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const [petani, stokRendah, summary] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PEKERJA" },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, email: true },
    }),
    listAlertStokMinimum(),
    monthlySummary(6),
  ]);

  return (
    <>
      <PageHeader
        title="Dashboard Owner"
        description="US6.1 — KPI dan grafik pendapatan vs beban (jurnal APPROVED)."
      />
      <InventarisAlertBanner items={stokRendah} detailHref="/owner/stok-rendah" />

      <OwnerKpiCards
        pendapatan={summary.pendapatanBulanIni}
        pengeluaran={summary.pengeluaranBulanIni}
        labaKasar={summary.labaKasarBulanIni}
      />

      <Card>
        <CardHeader>
          <CardTitle>Pendapatan vs beban</CardTitle>
          <CardDescription>6 bulan terakhir · akun pendapatan (4xxx) dan beban (5xxx)</CardDescription>
        </CardHeader>
        <CardContent>
          <OwnerRevenueChart months={summary.months} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Akun petani</CardTitle>
          <CardDescription>
            Daftar petani yang terdaftar di sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {petani.length === 0 ? (
            <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              Belum ada akun petani.
            </p>
          ) : (
            <ul className="divide-y rounded-md border">
              {petani.map((akun) => (
                <li key={akun.id} className="px-4 py-3">
                  <p className="text-sm font-medium">{akun.nama}</p>
                  <p className="text-xs text-muted-foreground">{akun.email}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
