"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  cancelSalesOrderAction,
  confirmSalesOrderAction,
  deliverSalesOrderAction,
  recordPackingCostAction,
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
  nomor_invoice?: string | null;
  biaya_packing?: string;
  alasan_batal?: string | null;
  jurnal_packing_id?: number | null;
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

function PackingCostForm({ id, defaultValue }: { id: number; defaultValue: string }) {
  const [state, formAction] = useFormState(recordPackingCostAction, {});
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-dashed p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input
        name="biayaPacking"
        type="text"
        inputMode="decimal"
        defaultValue={defaultValue === "0" ? "" : defaultValue}
        placeholder="Biaya packing (Rp)"
        className="h-9 text-sm"
      />
      <SubmitButton className="h-9" pendingLabel="...">
        Catat biaya packing
      </SubmitButton>
      <p className="text-xs text-muted-foreground">Jurnal beban 5400 / Kas jika nominal &gt; 0.</p>
      {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="text-xs text-primary">{state.ok}</p> : null}
    </form>
  );
}

function CancelForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(cancelSalesOrderAction, {});
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-destructive/40 p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="alasan" placeholder="Alasan pembatalan (wajib)" className="h-9 text-sm" required />
      <SubmitButton className="h-9" pendingLabel="..." variant="destructive">
        Batalkan SO
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
          {row.alasan_batal ? (
            <p className="text-xs text-destructive">Batal: {row.alasan_batal}</p>
          ) : null}
          {mode === "admin" && row.status !== "DRAFT" && row.status !== "CANCELLED" ? (
            <Link
              href={`/admin/penjualan/${row.id}/invoice`}
              className="text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              Invoice {row.nomor_invoice ? `(${row.nomor_invoice})` : ""}
            </Link>
          ) : null}
          {mode === "admin" && row.status === "DRAFT" ? <ConfirmButton id={row.id} /> : null}
          {mode === "admin" &&
          ["CONFIRMED", "SHIPPED", "DELIVERED"].includes(row.status) &&
          !row.jurnal_packing_id ? (
            <PackingCostForm id={row.id} defaultValue={row.biaya_packing ?? "0"} />
          ) : null}
          {mode === "admin" && row.biaya_packing && row.biaya_packing !== "0" ? (
            <p className="text-xs text-muted-foreground">
              Biaya packing: {formatRupiah(row.biaya_packing)}
              {row.jurnal_packing_id ? ` · Jurnal #${row.jurnal_packing_id}` : null}
            </p>
          ) : null}
          {mode === "admin" && row.status !== "CANCELLED" ? <CancelForm id={row.id} /> : null}
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
