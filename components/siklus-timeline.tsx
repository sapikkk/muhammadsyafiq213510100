import type { TimelineStep } from "@/lib/timeline-siklus";
import { cn } from "@/lib/utils";

export function SiklusTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative space-y-0 border-l border-border pl-4">
      {steps.map((step) => (
        <li key={step.fase} className="relative pb-6 last:pb-0">
          <span
            className={cn(
              "absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full border-2 bg-background",
              step.aktif && "border-primary bg-primary",
              step.selesai && !step.aktif && "border-primary bg-primary/30",
              !step.selesai && !step.aktif && "border-muted-foreground/40",
            )}
          />
          <p className={cn("text-sm font-medium", step.aktif && "text-primary")}>{step.label}</p>
          {step.tanggal ? (
            <p className="text-xs text-muted-foreground">{step.tanggal}</p>
          ) : (
            <p className="text-xs text-muted-foreground">{step.selesai ? "Selesai" : "Belum"}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
