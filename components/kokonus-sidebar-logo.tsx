import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { cn } from "@/lib/utils";

/** Logo sidebar — ikon + teks, muat lebar sidebar (bukan wordmark penuh). */
export function KokonusSidebarLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <KokonusBrandMark size={28} mark="icon" className="shrink-0" />
      <span className="truncate text-sm font-semibold leading-tight tracking-tight">
        Kokonus Farm
      </span>
    </span>
  );
}
