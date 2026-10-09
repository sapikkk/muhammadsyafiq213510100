import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/format";

type Row = { id: number; nama: string; gaji_bulanan: string };

export function PetaniMasterDaftar({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada data petani (ERD).</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead className="text-right">Gaji bulanan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.nama}</TableCell>
            <TableCell className="text-right">{formatRupiah(row.gaji_bulanan)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
