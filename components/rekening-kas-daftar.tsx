import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RekeningLabel } from "@/components/rekening-sumber-select";
import { formatRupiah } from "@/lib/format";
import type { RekeningKasBaris } from "@/lib/rekening-kas-types";

export function RekeningKasDaftar({ rows }: { rows: RekeningKasBaris[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada rekening. Tambah lewat form di bawah.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rekening</TableHead>
          <TableHead>Atas nama</TableHead>
          <TableHead className="text-right">Saldo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell>
              <RekeningLabel option={r} />
              {!r.aktif ? (
                <span className="ml-2 text-xs text-muted-foreground">(nonaktif)</span>
              ) : null}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{r.atasNama ?? "—"}</TableCell>
            <TableCell className="text-right tabular-nums font-medium">{formatRupiah(r.saldo)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
