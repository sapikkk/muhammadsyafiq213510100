/** Kode akun COA — sekunder di detail jurnal / daftar. */
export function AkunKodeMuted({ kode }: { kode: string }) {
  return (
    <span className="font-mono text-[11px] text-muted-foreground/70" title={`Kode ${kode}`}>
      {kode}
    </span>
  );
}
