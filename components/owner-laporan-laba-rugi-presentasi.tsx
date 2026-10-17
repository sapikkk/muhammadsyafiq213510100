import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { formatRupiah } from "@/lib/format";
import type { IncomeStatementLine } from "@/lib/income-statement";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function barisHighlight(label: string): "lime" | "green" | null {
  const l = label.toLowerCase();
  if (l.includes("laba kotor")) return "lime";
  if (l.includes("laba bersih") || l.includes("laba operasional")) return "green";
  return null;
}

/** Tampilan laba rugi — header tabel kapsul (tema Lime). */
export function OwnerLaporanLabaRugiPresentasi({
  lines,
  periodeLabel,
  namaUsaha = "Kokonus Farm",
}: {
  lines: IncomeStatementLine[];
  periodeLabel: string;
  namaUsaha?: string;
}) {
  return (
    <article className="lime-report-sheet mx-auto max-w-3xl space-y-4 rounded-xl bg-card p-4 sm:p-6">
      <header className="space-y-1 text-center">
        <p className="text-sm font-semibold">{namaUsaha}</p>
        <h2 className="text-lg font-semibold">Laporan laba rugi</h2>
        <p className="text-sm text-muted-foreground">Periode {periodeLabel}</p>
      </header>

      <div className="data-table-panel w-full min-w-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Ringkasan hasil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line) => {
              const hi = barisHighlight(line.label);
              const label = line.label.replace(/\s*\(\d+\)\s*$/, "").replace(/\(5100\)/, "");
              return (
                <TableRow
                  key={line.label}
                  className={cn(
                    hi === "lime" && "bg-[var(--kokonus-lime-mark,#d3fa53)] font-semibold text-[#0f0f0d] hover:bg-[var(--kokonus-lime-mark,#d3fa53)]",
                    hi === "green" &&
                      "bg-[var(--kokonus-green,#1a3d2e)] font-semibold text-white hover:bg-[var(--kokonus-green,#1a3d2e)]",
                  )}
                >
                  <TableCell className="border-0">{label}</TableCell>
                  <TableCell className="border-0 text-right tabular-nums">
                    {formatRupiah(line.nominal)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <footer className="flex items-center gap-2 text-xs text-muted-foreground">
        <KokonusBrandMark size={20} mark="icon" alt="" />
        <span>Angka dari jurnal disetujui — bukan proyeksi.</span>
      </footer>
    </article>
  );
}
