"use client";

import { useFormState } from "react-dom";
import { confirmSalesOrderAction } from "@/app/actions/sales-order";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";

export type SoRow = {
  id: number;
  nomor_so: string;
  pelanggan_nama: string;
  status: string;
  total: string;
  baris: { kode_batch: string; jenis: string; jumlah: string; subtotal: string }[];
};

function ConfirmButton({ id }: { id: number }) {
  const [state, formAction] = useFormState(confirmSalesOrderAction, {});
  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="salesOrderId" value={id} />
      <SubmitButton className="h-9" pendingLabel="...">
        Konfirmasi stok
      </SubmitButton>
      {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="text-xs text-primary">{state.ok}</p> : null}
    </form>
  );
}

export function SalesOrderDaftar({ rows }: { rows: SoRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada sales order.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-2 p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{row.nomor_so}</p>
            <Badge variant="secondary">{row.status}</Badge>
          </div>
          <p className="text-muted-foreground">
            {row.pelanggan_nama} · Total {formatRupiah(row.total)}
          </p>
          <ul className="text-xs text-muted-foreground">
            {row.baris.map((b, i) => (
              <li key={i}>
                {b.kode_batch} · {b.jenis} {b.jumlah} → {formatRupiah(b.subtotal)}
              </li>
            ))}
          </ul>
          {row.status === "DRAFT" ? <ConfirmButton id={row.id} /> : null}
        </li>
      ))}
    </ul>
  );
}
