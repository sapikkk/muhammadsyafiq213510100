import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listLogKegagalanMenunggu } from "@/lib/log-kegagalan";

export async function KegagalanSusutOwnerPanel() {
  const pending = await listLogKegagalanMenunggu();

  if (pending.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tidak ada log kegagalan menunggu klasifikasi. Susut terhitung saat Admin mengklasifikasi dan
        saat panen disetujui.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch</TableHead>
          <TableHead>Varietas</TableHead>
          <TableHead>Tahap</TableHead>
          <TableHead className="text-right">Gagal</TableHead>
          <TableHead>Penyebab</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pending.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.siklus.kode_batch}</TableCell>
            <TableCell>{row.siklus.varietas.nama}</TableCell>
            <TableCell>{row.tahap}</TableCell>
            <TableCell className="text-right tabular-nums">{row.jumlah_gagal}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{row.penyebab}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
