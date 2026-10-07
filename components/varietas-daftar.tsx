import { Badge } from "@/components/ui/badge";
import { varietasStatusLabel, type VarietasStatus } from "@/lib/varietas-status";
import type { serializeVarietas } from "@/lib/varietas";

type Row = ReturnType<typeof serializeVarietas>;

export function VarietasDaftar({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada varietas. Tambah lewat form di bawah.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-2 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{row.nama}</p>
            <VarietasStatusBadge status={row.status as VarietasStatus} />
          </div>
          <p className="text-muted-foreground">
            Benih {row.hargaBenihPerGram}/g · kecambah {row.dayaKecambah}% · semai{" "}
            {row.lamaSemai} h · kolam {row.lamaDiKolam} h
          </p>
          <p className="text-muted-foreground">
            Panen ~{row.beratRataRataPanen} g · pack {row.beratPerPack} g · jual curah{" "}
            {row.hargaJualCurah} / pack {row.hargaJualPack}
          </p>
          {row.jumlahSiklus > 0 ? (
            <p className="text-xs text-muted-foreground">Dipakai {row.jumlahSiklus} siklus</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function VarietasStatusBadge({ status }: { status: VarietasStatus }) {
  const label = varietasStatusLabel[status] ?? status;
  return (
    <Badge variant={status === "AKTIF" ? "secondary" : "outline"}>{label}</Badge>
  );
}
