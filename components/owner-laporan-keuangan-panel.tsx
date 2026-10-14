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
import { OwnerNeracaTampilan } from "@/components/owner-neraca-tampilan";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { buildIncomeStatement } from "@/lib/income-statement";
import { formatRupiah } from "@/lib/format";

export type OwnerLaporanJenis = "laba-rugi" | "neraca";

function monthBounds(dari: string, sampai: string) {
  const start = new Date(`${dari}-01T00:00:00`);
  const [y, m] = sampai.split("-").map(Number);
  const end = new Date(y, m, 0, 23, 59, 59);
  return { start, end };
}

export async function OwnerLaporanKeuanganPanel({
  jenis,
  dari,
  sampai,
}: {
  jenis: OwnerLaporanJenis;
  dari: string;
  sampai: string;
}) {
  const { start, end } = monthBounds(dari, sampai);

  if (jenis === "neraca") {
    const sheet = await buildBalanceSheet(end);
    return <OwnerNeracaTampilan sheet={sheet} />;
  }

  const laba = await buildIncomeStatement(start, end);
  const labaBersih = Number(laba.labaBersih);

  return (
    <div className="space-y-6">
      <MetricCards
        columns={3}
        items={[
          {
            label: "Laba bersih periode",
            value: formatRupiah(labaBersih),
          },
          {
            label: "Periode",
            value: `${dari === sampai ? dari : `${dari} – ${sampai}`}`,
          },
          {
            label: "Baris laporan",
            value: laba.lines.length,
          },
        ]}
      />
      <PageSection title="Laba rugi" badge="Read">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead className="text-right">Nominal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laba.lines.map((line) => (
              <TableRow key={line.label}>
                <TableCell className={line.label.includes("Laba") ? "font-medium" : undefined}>
                  {sanitizeLabelLabaRugi(line.label)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatRupiah(line.nominal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageSection>
    </div>
  );
}

/** Sembunyikan kode akun di label tampilan (audit kode di detail akun). */
function sanitizeLabelLabaRugi(label: string): string {
  return label.replace(/\s*\(\d+\)\s*$/, "").replace(/\(5100\)/, "").trim();
}
