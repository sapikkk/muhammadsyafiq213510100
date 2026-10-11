import { CashFlowMutasiDaftar } from "@/components/cash-flow-mutasi-daftar";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { MonthRangeFilter } from "@/components/month-range-filter";
import { PageSection } from "@/components/page-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildCashFlow } from "@/lib/cash-flow";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string };

function defaultMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

const KATEGORI_LABEL: Record<string, string> = {
  OPERASI: "Operasi",
  INVESTASI: "Investasi",
  PENDANAAN: "Pendanaan",
};

export default async function OwnerArusKasPage({ searchParams }: { searchParams: Search }) {
  const data = await buildCashFlow({
    dari: searchParams.dari ?? defaultMonth(),
    sampai: searchParams.sampai ?? defaultMonth(),
  });

  const exportQ = `dari=${encodeURIComponent(data.dari)}&sampai=${encodeURIComponent(data.sampai)}`;
  const mutasiRows = data.movements.map((row, i) => ({
    id: `${row.jurnalId}-${row.tanggal}-${i}`,
    tanggal: row.tanggal,
    jurnalId: row.jurnalId,
    kategori: KATEGORI_LABEL[row.kategori] ?? row.kategori,
    keterangan: row.keterangan,
    masuk: row.masuk,
    keluar: row.keluar,
  }));

  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Arus kas"
      description="US6.5 — pergerakan Kas/Bank dari jurnal APPROVED, filter periode YYYY-MM."
      flowSteps={[
        { label: "Filter", detail: "Pilih rentang bulan lalu terapkan." },
        { label: "Mutasi", detail: "Tabel bawah — link ke detail jurnal." },
        { label: "PDF", detail: "Unduh arus kas resmi untuk arsip." },
      ]}
      list={
        <div className="space-y-6">
          <MonthRangeFilter
            dari={data.dari}
            sampai={data.sampai}
            exportHref={`/api/export/cash-flow?${exportQ}`}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo awal kas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.saldoAwal)}</p>
                <p className="text-xs text-muted-foreground">Sebelum {data.dari}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Perubahan bersih
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.netChange)}</p>
                <p className="text-xs text-muted-foreground">
                  Periode {data.dari} s/d {data.sampai}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo akhir kas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.saldoAkhir)}</p>
                <p className="text-xs text-muted-foreground">Akhir periode</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {data.sections.map((sec) => (
              <Card key={sec.kategori}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{sec.label}</CardTitle>
                  <CardDescription>Net {formatRupiah(sec.net)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p>Masuk {formatRupiah(sec.masuk)}</p>
                  <p>Keluar {formatRupiah(sec.keluar)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <PageSection
            title="Mutasi kas"
            description="Akun 1100 Kas dan 1110 Bank — terbaru dulu."
            badge="Read"
          >
            <CashFlowMutasiDaftar rows={mutasiRows} />
          </PageSection>
        </div>
      }
      listTitle="Ringkasan & mutasi"
    />
  );
}
