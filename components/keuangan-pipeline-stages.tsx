import { OpenDetailSheetLink } from "@/components/open-detail-sheet-link";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";

export type KeuanganPipelineStage = {
  id: string;
  label: string;
  /** Angka besar di bawah hatch (jumlah atau rupiah). */
  value: string;
  href?: string;
  /** Tahap selesai: kartu invert + bar aksen bawah. */
  inverted?: boolean;
};

/** Baris pipeline horizontal (LeaseFlow-style): pill, hatch, angka. */
export function KeuanganPipelineStages({ stages }: { stages: KeuanganPipelineStage[] }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory sm:gap-3"
      role="list"
      aria-label="Alur keuangan"
    >
      {stages.map((stage) => {
        const body = (
          <article
            role="listitem"
            className={cn(
              "flex min-w-[8.5rem] max-w-[10.5rem] shrink-0 snap-start flex-col gap-2 overflow-hidden border border-border p-2.5 sm:min-w-[10rem] sm:max-w-[11rem] sm:p-3",
              stage.inverted
                ? "bg-foreground text-background lime-pipeline-invert"
                : "bg-card text-foreground",
            )}
          >
            <span
              className={cn(
                "line-clamp-2 min-w-0 rounded border px-1.5 py-0.5 text-[11px] font-medium leading-tight sm:px-2 sm:text-xs",
                stage.inverted
                  ? "border-background/30 text-background"
                  : "border-border text-muted-foreground",
              )}
            >
              {stage.label}
            </span>
            <div
              className={cn(
                "min-h-20 flex-1 rounded-none border border-border/60 lime-pipeline-hatch",
                stage.inverted ? "border-background/20 opacity-90" : "opacity-100",
              )}
              aria-hidden
            />
            <p className="min-w-0 text-base font-semibold tabular-nums leading-tight tracking-tight sm:text-xl">
              {stage.value}
            </p>
            {stage.inverted ? (
              <div
                className="h-1 w-full rounded-none bg-primary lime-pipeline-accent-bar"
                aria-hidden
              />
            ) : null}
          </article>
        );

        if (stage.href) {
          return (
            <OpenDetailSheetLink
              key={stage.id}
              href={stage.href}
              className="rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {body}
            </OpenDetailSheetLink>
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
