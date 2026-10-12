import type { TimelineStep } from "@/lib/timeline-siklus";
import { cn } from "@/lib/utils";

function dotClass(step: TimelineStep) {
  return cn(
    "h-3 w-3 shrink-0 rounded-full border-2 bg-background",
    step.aktif && "border-primary bg-primary",
    step.selesai && !step.aktif && "border-primary bg-primary/30",
    !step.selesai && !step.aktif && "border-muted-foreground/40",
  );
}

function connectorClass(leftDone: boolean, rightDone: boolean) {
  return cn(
    "mt-1.5 h-0.5 min-w-3 flex-1 shrink-0",
    leftDone && rightDone ? "bg-primary/45" : "bg-border",
  );
}

export function SiklusTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain pb-1">
      <ol
        className="flex min-w-full items-start"
        aria-label="Timeline produksi"
      >
        {steps.map((step, index) => {
          const prev = index > 0 ? steps[index - 1] : null;
          const prevDone = prev ? prev.selesai || prev.aktif : false;
          const stepDone = step.selesai || step.aktif;

          return (
            <li
              key={step.fase}
              className="flex min-w-0 flex-1 items-start last:flex-none last:max-w-[5.75rem]"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className={connectorClass(prevDone, stepDone)}
                />
              ) : null}
              <div className="flex w-[5.75rem] shrink-0 flex-col items-center px-0.5 text-center">
                <span className={dotClass(step)} aria-hidden />
                <p
                  className={cn(
                    "mt-2 line-clamp-2 text-[11px] font-medium leading-snug sm:text-xs",
                    step.aktif && "text-primary",
                  )}
                >
                  {step.label}
                </p>
                {step.tanggal ? (
                  <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                    {step.tanggal}
                  </p>
                ) : (
                  <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                    {step.selesai ? "Selesai" : "Belum"}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
