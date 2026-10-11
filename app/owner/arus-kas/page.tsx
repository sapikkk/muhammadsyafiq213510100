import { CashFlowMutasiDaftar } from "@/components/cash-flow-mutasi-daftar";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { MetricRowsTable } from "@/components/metric-rows-table";
import { MonthRangeFilter } from "@/components/month-range-filter";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      description="Pergerakan Kas/Bank dari jurnal APPROVED. Filter periode format YYYY-MM."
      flowSteps={[
        { label: "Filter", detail: "Pilih rentang bulan lalu terapkan." },
        { label: "Ringkasan", detail: "Tabel saldo dan arus per kategori." },
        { label: "Mutasi", detail: "Detail per jurnal — link ke baris jurnal." },
      ]}
      list={
        <div className="space-y-6">
          <MonthRangeFilter
            dari={data.dari}
            sampai={data.sampai}
            exportHref={`/api/export/cash-flow?${exportQ}`}
          />

          <PageSection title="Ringkasan saldo kas" badge="Read">
            <MetricRowsTable
              rows={[
                {
                  label: "Saldo awal kas",
                  value: formatRupiah(data.saldoAwal),
                  hint: `Sebelum ${data.dari}`,
                },
                {
                  label: "Perubahan bersih",
                  value: formatRupiah(data.netChange),
                  hint: `Periode ${data.dari} s/d ${data.sampai}`,
                },
                {
                  label: "Saldo akhir kas",
                  value: formatRupiah(data.saldoAkhir),
                  hint: "Akhir periode",
                },
              ]}
            />
          </PageSection>

          <PageSection title="Arus per kategori" badge="Read">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Masuk</TableHead>
                  <TableHead className="text-right">Keluar</TableHead>
                  <TableHead className="text-right">Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.sections.map((sec) => (
                  <TableRow key={sec.kategori}>
                    <TableCell className="font-medium">{sec.label}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatRupiah(sec.masuk)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatRupiah(sec.keluar)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatRupiah(sec.net)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PageSection>

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
