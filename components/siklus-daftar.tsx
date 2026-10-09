import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatTanggal } from "@/lib/format";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

export type SiklusBaris = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  kolam_nama: string;
  greenhouse_nama: string;
  tanggal_semai: string;
  jumlah_disemai: number;
  status: string;
};

export function SiklusDaftar({ rows }: { rows: SiklusBaris[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada siklus produksi.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-1 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{row.kode_batch}</p>
            <Badge variant="secondary">
              {isFaseProduksi(row.status) ? faseLabel[row.status] : row.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {row.varietas_nama} · {row.greenhouse_nama} / {row.kolam_nama}
          </p>
          <p className="text-muted-foreground">
            Semai {formatTanggal(new Date(`${row.tanggal_semai}T12:00:00.000Z`))} ·{" "}
            {row.jumlah_disemai} bibit
          </p>
          <Link
            href={`/petani/siklus/${row.id}`}
            className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Pindah fase
          </Link>
        </li>
      ))}
    </ul>
  );
}
