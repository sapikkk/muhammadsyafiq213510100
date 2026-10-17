import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { formatRupiah } from "@/lib/format";
import type { IncomeStatementLine } from "@/lib/income-statement";
import { cn } from "@/lib/utils";

function barisHighlight(label: string): "lime" | "green" | null {
  const l = label.toLowerCase();
  if (l.includes("laba kotor")) return "lime";
  if (l.includes("laba bersih") || l.includes("laba operasional")) return "green";
  return null;
}

/** Tampilan laba rugi — gaya Figma (data dari `buildIncomeStatement`). */
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
    <article className="mx-auto max-w-3xl space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
      <header className="space-y-1 text-center">
        <p className="text-sm font-semibold">{namaUsaha}</p>
        <h2 className="text-lg font-semibold">Laporan laba rugi</h2>
        <p className="text-sm text-muted-foreground">Periode {periodeLabel}</p>
      </header>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="bg-[var(--kokonus-green,#1a3d2e)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
          Ringkasan hasil
        </div>
        <ul className="divide-y divide-border">
          {lines.map((line) => {
            const hi = barisHighlight(line.label);
            return (
              <li
                key={line.label}
                className={cn(
                  "flex items-center justify-between gap-4 px-4 py-3 text-sm",
                  hi === "lime" && "bg-[var(--kokonus-lime-mark,#d3fa53)] font-semibold text-[#0f0f0d]",
                  hi === "green" && "bg-[var(--kokonus-green,#1a3d2e)] font-semibold text-white",
                )}
              >
                <span>{line.label.replace(/\s*\(\d+\)\s*$/, "").replace(/\(5100\)/, "")}</span>
                <span className="tabular-nums">{formatRupiah(line.nominal)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="flex items-center gap-2 text-xs text-muted-foreground">
        <KokonusBrandMark size={20} mark="icon" alt="" />
        <span>Angka dari jurnal disetujui — bukan proyeksi.</span>
      </footer>
    </article>
  );
}
