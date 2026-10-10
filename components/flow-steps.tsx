export type FlowStep = {
  label: string;
  detail: string;
};

/** Langkah CRUD/alur bisnis — dipasang di atas form & tabel. */
export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  if (steps.length === 0) return null;
  return (
    <ol
      className="grid gap-3 rounded-md border border-border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr"
      aria-label="Alur halaman"
    >
      {steps.map((step, index) => (
        <li key={step.label} className="flex gap-3 text-sm">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground text-xs font-semibold"
            aria-hidden
          >
            {index + 1}
          </span>
          <div className="min-w-0 space-y-0.5">
            <p className="font-medium leading-snug">{step.label}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
