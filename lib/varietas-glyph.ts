import type { AgritechGlyphKey } from "@/components/icons/agritech-glyphs";

/** Tebak glyph dari nama varietas (Bahasa Indonesia / Latin). */
export function varietasGlyphKey(nama: string): AgritechGlyphKey {
  const n = nama.toLowerCase();
  if (/selada|lettuce|romaine|lollo|iceberg/.test(n)) return "lettuce";
  if (/tomat|tomato/.test(n)) return "tomato";
  if (/wortel|carrot/.test(n)) return "carrot";
  if (/cabai|paprika|pepper|bell/.test(n)) return "pepper";
  if (/basil|kemangi|mint|timun|cucumber/.test(n)) return "basil";
  if (/bayam|kangkung|pakcoy|pak choi|selada|caesar|mustard|kale|selada/.test(n)) return "leaf";
  return "leaf";
}
