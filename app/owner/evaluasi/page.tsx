import { redirect } from "next/navigation";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_EVALUASI } from "@/lib/owner-section-tabs";
import { EvaluasiMarginDaftar } from "@/components/evaluasi-margin-daftar";
import { MetricCards } from "@/components/metric-cards";
import { MonochromeProgressBar } from "@/components/monochrome-progress-bar";
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

type Bagian = "untung" | "impas" | "kolam" | "harga";

function parseBagian(raw: string | undefined): Bagian {
  if (raw === "impas" || raw === "kolam" || raw === "harga") return raw;
  return "untung";
}

export default async function OwnerEvaluasiPage({
  searchParams,
}: {
  searchParams: { bagian?: string };
}) {
  if (!searchParams.bagian) {
    redirect("/owner/evaluasi?bagian=untung");
  }

  const bagian = parseBagian(searchParams.bagian);
  const data = await ownerEvaluation();

  const kapasitasRow = [
    {
      id: "total-lubang",
      label: "Total lubang",
      value: data.kapasitas.totalLubang.toLocaleString("id-ID"),
      hint: `${data.kapasitas.idlePct}% kosong`,
    },
    {
      id: "terpakai",
      label: "Lubang terpakai",
      value: data.kapasitas.lubangTerpakai.toLocaleString("id-ID"),
    },
    {
      id: "menganggur",
      label: "Lubang menganggur",
      value: data.kapasitas.lubangMenganggur.toLocaleString("id-ID"),
    },
    {
      id: "kolam",
      label: "Kolam aktif / menganggur",
      value: `${data.kapasitas.kolamTerpakai} / ${data.kapasitas.kolamMenganggur}`,
    },
  ];

  return (
    <CrudPageLayout
      title="Evaluasi"
      list={
        <div className="space-y-6">
          <OwnerSectionTabsShell tabs={TABS_EVALUASI} />

          {bagian === "untung" ? (
            <>
              <MetricCards columns={4} items={kapasitasRow} />
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
              <PageSection title="Siklus panen dengan HPP disetujui" badge="Read">
                <EvaluasiMarginDaftar rows={data.siklusTerbaru} />
              </PageSection>
            </>
          ) : null}

          {bagian === "impas" ? (
            <>
              <MetricCards
                columns={2}
                items={[
                  {
                    id: "bep-kg",
                    label: "Titik impas curah",
                    value:
                      data.bep.bepKgCurah != null
                        ? `${formatQty(data.bep.bepKgCurah)} kg/bulan`
                        : "—",
                  },
                  {
                    id: "bep-lubang",
                    label: "Titik impas per lubang",
                    value:
                      data.bep.bepLubangMin != null
                        ? `${Number(data.bep.bepLubangMin).toLocaleString("id-ID")} lubang/bulan`
                        : "—",
                  },
                ]}
              />
              <PageSection title="Dasar perhitungan" badge="Read">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Overhead periode</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatRupiah(data.bep.overheadBulan)}
                        {data.bep.overheadPeriode ? ` (${data.bep.overheadPeriode})` : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kontribusi curah per kg</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatRupiah(data.bep.kontribusiCurahPerKg)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kontribusi pack per pack</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatRupiah(data.bep.kontribusiPackPerPack)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </PageSection>
            </>
          ) : null}

          {bagian === "kolam" ? (
            <>
              <MetricCards columns={4} items={kapasitasRow} />
              <PageSection title="Kapasitas produksi" badge="Read">
                <MonochromeProgressBar
                  label="Lubang terisi"
                  hint={`${data.kapasitas.lubangTerpakai.toLocaleString("id-ID")} dari ${data.kapasitas.totalLubang.toLocaleString("id-ID")} lubang`}
                  value={100 - Number(data.kapasitas.idlePct)}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  {Number(data.kapasitas.idlePct) >= 25
                    ? `Kapasitas menganggur ${data.kapasitas.idlePct}% — pertimbangkan isi kolam idle atau kurangi overhead tetap.`
                    : Number(data.kapasitas.idlePct) <= 5
                      ? "Kapasitas hampir penuh — pastikan permintaan jual menyerap hasil panen."
                      : "Utilisasi lubang dalam batas wajar untuk operasi rutin."}
                </p>
              </PageSection>
            </>
          ) : null}

          {bagian === "harga" ? (
            <>
              <MetricCards
                columns={3}
                items={[
                  {
                    label: "HPP rata-rata per kg",
                    value: formatRupiah(data.rataRata.hppPerKg),
                  },
                  {
                    label: "Harga jual curah",
                    value: formatRupiah(data.rataRata.hargaCurah),
                  },
                  {
                    label: "Margin curah per kg",
                    value: formatRupiah(data.rataRata.marginCurahPerKg),
                  },
                ]}
              />
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
            </>
          ) : null}
        </div>
      }
      listTitle="Analisis"
    />
  );
}
