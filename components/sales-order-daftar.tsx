"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  cancelSalesOrderAction,
  catatDpSalesOrderAction,
  confirmSalesOrderAction,
  deliverSalesOrderAction,
  recordPackingCostAction,
  shipSalesOrderAction,
} from "@/app/actions/sales-order";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import { useActionToast } from "@/lib/hooks/use-action-toast";

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
  jumlah_dp?: string;
  akun_dp_kode?: string | null;
  status_pembayaran?: string;
  jurnal_dp_id?: number | null;
  baris: {
    kode_batch: string;
    jenis: string;
    jumlah: string;
    lubang_terpakai?: number;
    hpp_order?: string;
    subtotal: string;
  }[];
};

function CatatDpButton({ id }: { id: number }) {
  const [state, formAction] = useFormState(catatDpSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-dashed p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <SubmitButton className="h-9" pendingLabel="...">
        Catat DP (Dr Kas · Cr uang muka)
      </SubmitButton>
      <p className="text-xs text-muted-foreground">
        Jurnal langsung APPROVED; bukan pendapatan. Pelunasan di story berikutnya.
      </p>
    </form>
  );
}

function ConfirmButton({ id }: { id: number }) {
  const [state, formAction] = useFormState(confirmSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="salesOrderId" value={id} />
      <SubmitButton className="h-9" pendingLabel="...">
        Konfirmasi stok
      </SubmitButton>
    </form>
  );
}

function ShipForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(shipSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-dashed p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="catatan" placeholder="Catatan packing/kirim (opsional)" className="h-9 text-sm" />
      <SubmitButton className="h-9" pendingLabel="...">
        Tandai dikirim (SHIPPED)
      </SubmitButton>
    </form>
  );
}

function PackingCostForm({ id, defaultValue }: { id: number; defaultValue: string }) {
  const [state, formAction] = useFormState(recordPackingCostAction, {});
  useActionToast({ error: state.error, ok: state.ok });
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
    </form>
  );
}

function CancelForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(cancelSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="mt-2 space-y-2 rounded-md border border-destructive/40 p-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="alasan" placeholder="Alasan pembatalan (wajib)" className="h-9 text-sm" required />
      <SubmitButton className="h-9" pendingLabel="..." variant="destructive">
        Batalkan SO
      </SubmitButton>
    </form>
  );
}

function DeliverForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(deliverSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
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
    </form>
  );
}

function SalesOrderDetail({
  row,
  mode,
}: {
  row: SoRow;
  mode: "admin" | "pengiriman";
}) {
  return (
    <div className="space-y-2 rounded-md border p-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-medium">{row.nomor_so}</p>
        <Badge variant="secondary">{row.status}</Badge>
      </div>
      <p className="text-muted-foreground">
        {row.pelanggan_nama} · Total {formatRupiah(row.total)}
        {row.jumlah_dp && row.jumlah_dp !== "0"
          ? ` · DP ${formatRupiah(row.jumlah_dp)}${row.akun_dp_kode ? ` → akun ${row.akun_dp_kode}` : ""}`
          : ""}
      </p>
      {row.status_pembayaran && row.status_pembayaran !== "BELUM_BAYAR" ? (
        <p className="text-xs text-muted-foreground">
          Pembayaran: {row.status_pembayaran}
          {row.jurnal_dp_id ? ` · Jurnal DP #${row.jurnal_dp_id}` : ""}
        </p>
      ) : null}
      <ul className="text-xs text-muted-foreground">
        {row.baris.map((b, i) => (
          <li key={i}>
            {b.kode_batch} · {b.jenis} {b.jumlah}
            {b.lubang_terpakai ? ` · ${b.lubang_terpakai} lubang` : ""}
            {b.hpp_order && b.hpp_order !== "0" ? ` · HPP ${formatRupiah(b.hpp_order)}` : ""} →{" "}
            {formatRupiah(b.subtotal)}
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
      row.status_pembayaran === "BELUM_BAYAR" &&
      row.jumlah_dp &&
      row.jumlah_dp !== "0" &&
      row.status !== "DRAFT" &&
      row.status !== "CANCELLED" ? (
        <CatatDpButton id={row.id} />
      ) : null}
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
    </div>
  );
}

export function SalesOrderDaftar({
  rows,
  mode = "admin",
}: {
  rows: SoRow[];
  mode?: "admin" | "pengiriman";
}) {
  const [selectedId, setSelectedId] = useState<number | null>(rows[0]?.id ?? null);

  const columns = useMemo<ColumnDef<SoRow>[]>(
    () => [
      { accessorKey: "nomor_so", header: "Nomor SO" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
      },
      { accessorKey: "pelanggan_nama", header: "Pelanggan" },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.total)}</span>
        ),
      },
      {
        id: "aksi",
        header: "",
        cell: ({ row }) => (
          <Button
            type="button"
            variant={selectedId === row.original.id ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setSelectedId(row.original.id)}
          >
            {selectedId === row.original.id ? "Dipilih" : "Detail"}
          </Button>
        ),
      },
    ],
    [selectedId],
  );

  const selected = rows.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={rows}
        pageSize={10}
        searchPlaceholder="Cari SO, pelanggan, status…"
        searchColumnIds={["nomor_so", "pelanggan_nama", "status"]}
        emptyMessage="Belum ada sales order."
      />
      {selected ? <SalesOrderDetail row={selected} mode={mode} /> : null}
    </div>
  );
}
