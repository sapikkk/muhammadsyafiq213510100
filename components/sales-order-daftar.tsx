"use client";

import { useFormState } from "react-dom";
import {
  confirmSalesOrderAction,
  deliverSalesOrderAction,
  shipSalesOrderAction,
} from "@/app/actions/sales-order";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";

export type SoRow = {
  id: number;
  nomor_so: string;
  pelanggan_nama: string;
  status: string;
  total: string;
  dikirim_pada?: string | null;
  terkirim_pada?: string | null;
  catatan_pengiriman?: string | null;
  jurnal_pendapatan_id?: number | null;
  jurnal_pendapatan_status?: string | null;
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

function ShipForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(shipSalesOrderAction, {});
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-dashed p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="catatan" placeholder="Catatan packing/kirim (opsional)" className="h-9 text-sm" />
      <SubmitButton className="h-9" pendingLabel="...">
        Tandai dikirim (SHIPPED)
      </SubmitButton>
      {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="text-xs text-primary">{state.ok}</p> : null}
    </form>
  );
}

function DeliverForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(deliverSalesOrderAction, {});
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-dashed p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="catatan" placeholder="Catatan serah terima (opsional)" className="h-9 text-sm" />
      <SubmitButton className="h-9" pendingLabel="...">
        Tandai terkirim (DELIVERED)
      </SubmitButton>
      <p className="text-xs text-muted-foreground">
        Membuat jurnal pendapatan berstatus PENDING untuk persetujuan Admin.
      </p>
      {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="text-xs text-primary">{state.ok}</p> : null}
    </form>
  );
}

export function SalesOrderDaftar({
  rows,
  mode = "admin",
}: {
  rows: SoRow[];
  mode?: "admin" | "pengiriman";
}) {
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
          {row.catatan_pengiriman ? (
            <p className="text-xs text-muted-foreground">Catatan kirim: {row.catatan_pengiriman}</p>
          ) : null}
          {row.dikirim_pada ? (
            <p className="text-xs text-muted-foreground">
              Dikirim: {new Date(row.dikirim_pada).toLocaleString("id-ID")}
            </p>
          ) : null}
          {row.terkirim_pada ? (
            <p className="text-xs text-muted-foreground">
              Terkirim: {new Date(row.terkirim_pada).toLocaleString("id-ID")}
              {row.jurnal_pendapatan_id
                ? ` · Jurnal #${row.jurnal_pendapatan_id} (${row.jurnal_pendapatan_status ?? "?"})`
                : null}
            </p>
          ) : null}
          {mode === "admin" && row.status === "DRAFT" ? <ConfirmButton id={row.id} /> : null}
          {(mode === "admin" || mode === "pengiriman") && row.status === "CONFIRMED" ? (
            <ShipForm id={row.id} />
          ) : null}
          {(mode === "admin" || mode === "pengiriman") && row.status === "SHIPPED" ? (
            <DeliverForm id={row.id} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
