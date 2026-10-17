import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { cn } from "@/lib/utils";

/** Logo sidebar — ikon + teks, muat lebar sidebar (bukan wordmark penuh). */
export function KokonusSidebarLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--kokonus-green,#1a3d2e)]"
        aria-hidden
      >
        <KokonusBrandMark size={22} mark="icon" className="shrink-0" alt="" />
      </span>
      <span className="truncate text-sm font-semibold leading-tight tracking-tight text-foreground">
        Kokonus Farm
      </span>
    </span>
  );
}
