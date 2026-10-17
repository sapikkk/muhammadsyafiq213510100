import { ListIcon } from "@/components/lime/ui/list";
import { varietasCarbonIcon } from "@/lib/lime/varietas-carbon-icon";
import type { ComponentProps } from "react";

type ListIconTone = NonNullable<ComponentProps<typeof ListIcon>["tone"]>;

/**
 * Mark varietas untuk `List` Lime — pakai hanya di dalam `.lime` / tema Lime.
 * Wireframe: `VarietasGlyph` (`@/components/varietas-glyph`).
 */
export function VarietasListIcon({
  nama,
  tone = "neutral",
  className,
}: {
  nama: string;
  tone?: ListIconTone;
  className?: string;
}) {
  return (
    <ListIcon
      icon={varietasCarbonIcon(nama)}
      tone={tone}
      className={className}
    />
  );
}
