import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Grid3x3,
  Layers,
  PackageCheck,
  ShoppingBag,
  Sprout,
  Timer,
  Warehouse,
} from "lucide-react";

/** Ikon metrik — gaya line (Lucide), selaras ui-ringkas / Lime iconography. */
export const METRIC_ICON_BY_ID: Record<string, LucideIcon> = {
  tugas: ClipboardList,
  "lubang-terisi": Grid3x3,
  "siap-jual": ShoppingBag,
  "stok-rendah": Warehouse,
};

export const METRIC_ICON_FASE: Record<string, LucideIcon> = {
  SEMAI: Sprout,
  SPROUT: Layers,
  TAMBAL: Grid3x3,
  PENDEWASAAN: Timer,
  SIAP_JUAL: PackageCheck,
};

export function metricIconForFaseLabel(label: string): LucideIcon | undefined {
  const key = label.toLowerCase();
  if (key.includes("semai")) return METRIC_ICON_FASE.SEMAI;
  if (key.includes("sprout") || key.includes("daun")) return METRIC_ICON_FASE.SPROUT;
  if (key.includes("tambal")) return METRIC_ICON_FASE.TAMBAL;
  if (key.includes("pendewasaan")) return METRIC_ICON_FASE.PENDEWASAAN;
  if (key.includes("siap jual")) return METRIC_ICON_FASE.SIAP_JUAL;
  return undefined;
}
