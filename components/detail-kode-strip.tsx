/** Kode internal — hanya halaman detail, blok terpisah dari judul/baris utama. */

export function DetailKodeStrip({
  label,
  kode,
}: {
  label: string;
  kode: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-border/60 bg-muted/15 px-3 py-2 text-xs text-muted-foreground">
      <span>{label}: </span>
      <span className="font-mono text-[11px] text-foreground/80">{kode}</span>
    </div>
  );
}
