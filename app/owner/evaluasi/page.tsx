import { CrudPageLayout } from "@/components/crud-page-layout";
import { EvaluasiMarginDaftar } from "@/components/evaluasi-margin-daftar";
import { MetricRowsTable } from "@/components/metric-rows-table";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatQty, formatRupiah } from "@/lib/format";
import { ownerEvaluation } from "@/lib/owner-evaluation";

export const dynamic = "force-dynamic";

export default async function OwnerEvaluasiPage() {
  const data = await ownerEvaluation();

  const overheadHint = data.bep.overheadPeriode
    ? `Periode ${data.bep.overheadPeriode} · ${formatRupiah(data.bep.overheadBulan)}/bulan`
    : "Belum diinput Admin";

  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Evaluasi margin & BEP"
      description="Perbandingan HPP dan harga jual, titik impas, dan kapasitas kolam menganggur."
      flowSteps={[
        { label: "Kapasitas", detail: "Tabel ringkasan lubang & kolam." },
        { label: "Untung dan titik impas", detail: "Rata-rata curah/pack dan titik impas." },
        { label: "Batch", detail: "Margin per siklus panen disetujui." },
      ]}
      list={
        <div className="space-y-6">
          <PageSection title="Kapasitas produksi" badge="Read">
            <MetricRowsTable
              rows={[
                {
                  label: "Total lubang",
                  value: data.kapasitas.totalLubang.toLocaleString("id-ID"),
                  hint: `Idle ${data.kapasitas.idlePct}%`,
                },
                {
                  label: "Lubang terpakai",
                  value: data.kapasitas.lubangTerpakai.toLocaleString("id-ID"),
                },
                {
                  label: "Lubang menganggur",
                  value: data.kapasitas.lubangMenganggur.toLocaleString("id-ID"),
                },
                {
                  label: "Kolam aktif / menganggur",
                  value: `${data.kapasitas.kolamTerpakai} / ${data.kapasitas.kolamMenganggur}`,
                  hint: "Status TERPAKAI / MENGANGGUR",
                },
              ]}
            />
          </PageSection>

          <PageSection title="Margin rata-rata" badge="Read">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metrik</TableHead>
                  <TableHead className="text-right">Curah</TableHead>
                  <TableHead className="text-right">Pack</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>HPP</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatRupiah(data.rataRata.hppPerKg)}/kg
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatRupiah(data.rataRata.hppPerPack)}/pack
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Harga jual</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatRupiah(data.rataRata.hargaCurah)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatRupiah(data.rataRata.hargaPack)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kontribusi</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {formatRupiah(data.rataRata.marginCurahPerKg)}/kg
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {formatRupiah(data.rataRata.marginPackPerPack)}/pack
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PageSection>

          <PageSection title="Titik impas (BEP)" description={overheadHint} badge="Read">
            <MetricRowsTable
              rows={[
                {
                  label: "BEP penjualan curah",
                  value:
                    data.bep.bepKgCurah != null ? `${formatQty(data.bep.bepKgCurah)} kg/bulan` : "—",
                  hint: `Overhead ÷ kontribusi (${formatRupiah(data.bep.kontribusiCurahPerKg)}/kg)`,
                },
                {
                  label: "BEP lubang layak jual",
                  value:
                    data.bep.bepLubangMin != null
                      ? `${Number(data.bep.bepLubangMin).toLocaleString("id-ID")} lubang/bulan`
                      : "—",
                  hint: "Estimasi curah per lubang − HPP/lubang",
                },
              ]}
            />
          </PageSection>

          <PageSection title="Rekomendasi" badge="Read">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Saran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rekomendasi.map((line, i) => (
                  <TableRow key={line}>
                    <TableCell className="tabular-nums text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>{line}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PageSection>

          <PageSection
            title="Siklus dengan HPP disetujui"
            description="Margin curah per batch."
            badge="Read"
          >
            <EvaluasiMarginDaftar rows={data.siklusTerbaru} />
          </PageSection>
        </div>
      }
      listTitle="Analisis"
    />
  );
}
