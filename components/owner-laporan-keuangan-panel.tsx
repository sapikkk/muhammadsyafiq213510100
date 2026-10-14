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
    return (
      <div className="space-y-6">
        <MetricCards
          columns={2}
          items={[
            { label: "Total aset", value: formatRupiah(sheet.totalAset) },
            {
              label: "Kewajiban + modal",
              value: formatRupiah(sheet.totalKewajibanModal),
            },
          ]}
        />
        <PageSection title="Neraca" badge="Read">
          <p className="mb-3 text-sm text-muted-foreground">
            Per {sheet.asOf.split("-").reverse().join("/")}
          </p>
          {sheet.sections.map((sec) => (
            <div key={sec.tipe} className="mb-6 last:mb-0">
              <p className="mb-2 text-sm font-medium">{sec.tipe}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Akun</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sec.rows.map((r) => (
                    <TableRow key={r.kode}>
                      <TableCell>
                        <span className="font-medium">{r.nama}</span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatRupiah(r.saldo)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">Subtotal {sec.tipe.toLowerCase()}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatRupiah(sec.subtotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))}
        </PageSection>
      </div>
    );
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
