import type { KolamIsiBaris } from "@/lib/produksi-kapasitas-types";

/** Record untuk props client (JSON-safe). */
export function kolamIsiToRecord(kolamIsi: KolamIsiBaris[]): Record<number, KolamIsiBaris> {
  return Object.fromEntries(kolamIsi.map((k) => [k.kolamId, k]));
}
