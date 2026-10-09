/** Memisahkan active pack benih vs media untuk form mulai siklus. */
export function isItemBenih(kodeItem: string): boolean {
  return kodeItem.startsWith("BNH-");
}

export function isItemMedia(kodeItem: string): boolean {
  return kodeItem.startsWith("RW-") || kodeItem.startsWith("MED-");
}
