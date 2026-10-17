import { AgritechGlyph } from "@/components/icons/agritech-glyphs";
import { varietasGlyphKey } from "@/lib/varietas-glyph";
import { cn } from "@/lib/utils";

/** Mark bulat di baris varietas (bukan tile dekoratif penuh layar). */
export function VarietasGlyph({
  nama,
  className,
  size = 18,
}: {
  nama: string;
  className?: string;
  size?: number;
}) {
  const key = varietasGlyphKey(nama);
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-foreground",
        className,
      )}
      aria-hidden
    >
      <AgritechGlyph name={key} size={size} />
    </span>
  );
}
