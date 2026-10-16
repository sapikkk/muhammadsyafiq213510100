import type { AgritechGlyphKey } from "@/components/icons/agritech-glyphs";
import type { LimeIcon } from "@/components/lime/icon";
import {
  AgricultureAnalytics,
  Crop,
  CropGrowth,
  CropHealth,
  FruitBowl,
} from "@/components/lime/icon";
import { varietasGlyphKey } from "@/lib/varietas-glyph";

/** Carbon glyph per kategori varietas (wireframe tetap pakai SVG `agritech-glyphs`). */
const BY_GLYPH: Record<AgritechGlyphKey, LimeIcon> = {
  lettuce: CropGrowth,
  basil: CropHealth,
  tomato: FruitBowl,
  carrot: Crop,
  pepper: CropHealth,
  leaf: CropGrowth,
};

/** Ikon Lime untuk satu baris varietas / ListItem. */
export function varietasCarbonIcon(nama: string): LimeIcon {
  const key = varietasGlyphKey(nama);
  return BY_GLYPH[key] ?? AgricultureAnalytics;
}

export { BY_GLYPH as VARIETAS_LIME_ICON_BY_GLYPH };
