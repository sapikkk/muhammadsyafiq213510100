import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAuditWaktu } from "@/lib/entity-audit";

export type EntityChangeRow = {
  id: number;
  aksi: string;
  ringkasan: string;
  userEmail: string | null;
  userNama: string | null;
  createdAt: Date;
};

export function EntityChangeHistory({
  rows,
  emptyMessage = "Belum ada perubahan tercatat.",
}: {
  rows: EntityChangeRow[];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Waktu</TableHead>
          <TableHead>Aksi</TableHead>
          <TableHead>Ringkasan</TableHead>
          <TableHead>Oleh</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="whitespace-nowrap text-xs tabular-nums">
              {formatAuditWaktu(row.createdAt)}
            </TableCell>
            <TableCell className="text-xs font-medium uppercase">{row.aksi}</TableCell>
            <TableCell className="text-sm">{row.ringkasan}</TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {row.userNama ?? row.userEmail ?? "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
