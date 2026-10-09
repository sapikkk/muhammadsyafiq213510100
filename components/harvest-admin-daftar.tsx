import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Row = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  status: string;
  jumlah_layak: number;
  jumlah_tidak_layak: number;
  petani_nama: string;
};

export function HarvestAdminDaftar({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada laporan panen.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id}>
          <Link href={`/admin/harvest/${row.id}`} className="block space-y-1 px-4 py-3 text-sm hover:bg-muted/50 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{row.kode_batch}</p>
              <Badge variant={row.status === "PENDING" ? "default" : "secondary"}>
                {row.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {row.varietas_nama} · {row.petani_nama}
            </p>
            <p>
              Layak {row.jumlah_layak} · Tidak layak {row.jumlah_tidak_layak}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
