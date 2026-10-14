import { MetricCards } from "@/components/metric-cards";
import { PageSection } from "@/components/page-section";
import type { OwnerKegagalanFunnel } from "@/lib/owner-kegagalan-susut";
import { cn } from "@/lib/utils";

export function KegagalanFunnelPanel({
  funnel,
  periodeLabel,
}: {
  funnel: OwnerKegagalanFunnel;
  periodeLabel: string;
}) {
  const steps = [
    { key: "disemai", label: "Bibit disemai", value: funnel.disemai },
    { key: "sprout", label: "Susut sprout", value: funnel.sprout },
    { key: "pindah", label: "Susut pindah kolam", value: funnel.pindahKolam },
    { key: "kolam", label: "Susut di kolam", value: funnel.diKolam },
    { key: "panen", label: "Gagal saat panen", value: funnel.gagalPanen },
    { key: "layak", label: "Layak jual", value: funnel.layakJual },
  ] as const;

  const max = Math.max(funnel.disemai, 1);

  return (
    <div className="space-y-4">
      <MetricCards
        columns={2}
        items={[
          { id: "disemai", label: "Bibit disemai", value: funnel.disemai.toLocaleString("id-ID") },
          {
            id: "susut",
            label: "Susut tercatat",
            value: funnel.susutTercatat.toLocaleString("id-ID"),
            hint: "Jumlah bibit dari log",
          },
          {
            id: "sprout",
            label: "Susut sprout",
            value: funnel.sprout.toLocaleString("id-ID"),
          },
          {
            id: "pindah",
            label: "Susut pindah kolam",
            value: funnel.pindahKolam.toLocaleString("id-ID"),
          },
          {
            id: "kolam",
            label: "Susut di kolam",
            value: funnel.diKolam.toLocaleString("id-ID"),
          },
          {
            id: "panen",
            label: "Gagal saat panen",
            value: funnel.gagalPanen.toLocaleString("id-ID"),
          },
          {
            id: "layak-panen",
            label: "Layak panen",
            value: funnel.layakPanen.toLocaleString("id-ID"),
          },
          {
            id: "layak-jual",
            label: "Layak jual",
            value: funnel.layakJual.toLocaleString("id-ID"),
          },
        ]}
      />
      <PageSection title={`Alur funnel · ${periodeLabel}`} badge="Read">
        <ol className="space-y-2">
          {steps.map((step, i) => {
            const pct = Math.min(100, Math.round((step.value / max) * 100));
            return (
              <li key={step.key} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium">{step.label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {step.value.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full bg-foreground/80 transition-all")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">{i + 1}</span>
              </li>
            );
          })}
        </ol>
      </PageSection>
    </div>
  );
}
