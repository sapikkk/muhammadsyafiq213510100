import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type MetricRow = {
  label: string;
  value: ReactNode;
  hint?: string;
};

export function MetricRowsTable({ rows, caption }: { rows: MetricRow[]; caption?: string }) {
  const showHints = rows.some((r) => r.hint?.trim());
  return (
    <Table>
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Indikator</TableHead>
          <TableHead>Nilai</TableHead>
          {showHints ? <TableHead className="hidden md:table-cell">Keterangan</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label}>
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell className="tabular-nums">{row.value}</TableCell>
            {showHints ? (
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {row.hint ?? "—"}
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
