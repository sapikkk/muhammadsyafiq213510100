import { CrudPageLayout } from "@/components/crud-page-layout";
import { EvaluasiMarginDaftar } from "@/components/evaluasi-margin-daftar";
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
import { formatQty, formatRupiah } from "@/lib/format";
import { ownerEvaluation } from "@/lib/owner-evaluation";

export const dynamic = "force-dynamic";

export default async function OwnerEvaluasiPage() {
  const data = await ownerEvaluation();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Untung dan titik impas"
      list={
        <div className="space-y-6">
          <PageSection title="Kapasitas produksi" badge="Read">
            <MetricCards
              columns={2}
              items={[
                {
                  label: "Total lubang",
                  value: data.kapasitas.totalLubang.toLocaleString("id-ID"),
                  hint: `${data.kapasitas.idlePct}% kosong`,
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
                },
              ]}
            />
          </PageSection>

          <PageSection title="Untung rata-rata" badge="Read">
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
                  <TableCell>Biaya pokok (HPP)</TableCell>
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
                  <TableCell className="font-medium">Sisa setelah HPP</TableCell>
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

          <PageSection title="Titik impas" badge="Read">
            <MetricCards
              columns={2}
              items={[
                {
                  label: "Titik impas curah",
                  value:
                    data.bep.bepKgCurah != null ? `${formatQty(data.bep.bepKgCurah)} kg/bulan` : "—",
                },
                {
                  label: "Titik impas per lubang",
                  value:
                    data.bep.bepLubangMin != null
                      ? `${Number(data.bep.bepLubangMin).toLocaleString("id-ID")} lubang/bulan`
                      : "—",
                },
              ]}
            />
          </PageSection>

          <PageSection title="Rekomendasi" badge="Read">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No.</TableHead>
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

          <PageSection title="Siklus panen dengan HPP disetujui" badge="Read">
            <EvaluasiMarginDaftar rows={data.siklusTerbaru} />
          </PageSection>
        </div>
      }
      listTitle="Analisis"
    />
  );
}
