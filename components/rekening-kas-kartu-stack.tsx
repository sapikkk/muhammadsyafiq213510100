import { formatRupiah } from "@/lib/format";
import type { RekeningKasBaris } from "@/lib/rekening-kas-types";
import { cn } from "@/lib/utils";

/** Kartu saldo rekening — metafora visual Figma (bukan kartu kredit). */
export function RekeningKasKartuStack({ rows }: { rows: RekeningKasBaris[] }) {
  const aktif = rows.filter((r) => r.aktif);
  if (aktif.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Rekening kas & bank ({aktif.length})</p>
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {aktif.slice(0, 4).map((r, i) => (
          <li
            key={r.id}
            className={cn(
              "relative min-h-[8.5rem] w-full max-w-sm overflow-hidden rounded-2xl p-4 text-white shadow-md sm:w-[min(100%,18rem)]",
              "bg-[var(--kokonus-green,#1a3d2e)]",
              i > 0 && "-mt-2 sm:mt-0",
            )}
            style={{
              boxShadow: i === 0 ? undefined : `0 ${4 + i * 2}px 0 var(--kokonus-lime-mark,#d3fa53)`,
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wide opacity-90">{r.namaRekening}</p>
            <p className="mt-4 text-2xl font-semibold tabular-nums tracking-tight">
              {formatRupiah(r.saldo)}
            </p>
            <p className="mt-auto pt-3 text-xs opacity-80">
              {r.atasNama ?? "—"} · {r.jenis === "BANK" ? "Bank" : r.jenis === "EWALLET" ? "Dompet digital" : "Kas"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
