import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";

export type KeuanganPipelineStage = {
  id: string;
  label: string;
  /** Angka besar di bawah label. */
  value: string;
  href?: string;
  /** Tahap sorot: kartu gelap (neraca). */
  inverted?: boolean;
};

/** Alur keuangan horizontal — label + angka saja (tanpa blok hatch kosong). */
export function KeuanganPipelineStages({ stages }: { stages: KeuanganPipelineStage[] }) {
  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3"
      role="list"
      aria-label="Alur keuangan"
    >
      {stages.map((stage) => {
        const body = (
          <article
            role="listitem"
            className={cn(
              "flex min-w-0 flex-col gap-2 border border-border p-3 transition-colors",
              stage.inverted
                ? "bg-foreground text-background lime-pipeline-invert"
                : "bg-card text-foreground hover:bg-muted/30",
            )}
          >
            <span
              className={cn(
                "line-clamp-2 min-w-0 text-xs font-medium leading-snug",
                stage.inverted ? "text-background/85" : "text-muted-foreground",
              )}
            >
              {stage.label}
            </span>
            <p className="min-w-0 text-lg font-semibold tabular-nums leading-tight tracking-tight sm:text-xl">
              {stage.value}
            </p>
          </article>
        );

        if (stage.href) {
          return (
            <Link
              key={stage.id}
              href={stage.href}
              className="rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {body}
            </Link>
          );
        }

        return <div key={stage.id}>{body}</div>;
      })}
    </div>
  );
}

/** Helper: tampilkan rupiah atau em dash jika nol. */
export function pipelineRupiah(raw: string | number): string {
  const n = Number(raw);
  if (!Number.isFinite(n) || n === 0) return "—";
  return formatRupiah(raw);
}
