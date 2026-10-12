/** Kode batch internal — hanya detail / kolom sekunder. */
export function KodeBatchMuted({ kode }: { kode: string }) {
  return (
    <span className="font-mono text-[11px] text-muted-foreground/70" title={kode}>
      {kode}
    </span>
  );
}
