"use client";

import Link from "next/link";
import { SalesOrderBarisLine } from "@/components/sales-order-baris-line";
import { SalesOrderProgressStrip } from "@/components/sales-order-progress-strip";
import { formatRupiah } from "@/lib/format";
import { statusJurnalLabel, type StatusJurnalKey } from "@/lib/jurnal-status";
import { labelPembayaranStatus } from "@/lib/sales-order-status";
import type { SoRow } from "@/lib/sales-order-detail-types";

export type { SoRow } from "@/lib/sales-order-detail-types";

function TautanCatatanKeuangan({
  mode,
  jurnalId,
}: {
  mode: "admin" | "owner" | "pengiriman";
  jurnalId: number;
}) {
  if (mode === "pengiriman") return null;
  const href =
    mode === "owner" ? `/owner/jurnal/${jurnalId}` : `/admin/jurnal/${jurnalId}`;
  return (
    <>
      {" · "}
      <Link href={href} scroll={false} className="text-primary underline-offset-2 hover:underline">
        Catatan keuangan
      </Link>
    </>
  );
}

function SalesOrderDetailMeta({
  row,
  mode,
}: {
  row: SoRow;
  mode: "admin" | "pengiriman" | "owner";
}) {
  const lines: string[] = [];
  if (row.jumlah_dp && row.jumlah_dp !== "0") {
    lines.push(`Uang muka ${formatRupiah(row.jumlah_dp)}`);
  }
  if (row.status_pembayaran && row.status_pembayaran !== "BELUM_BAYAR") {
    lines.push(`Bayar: ${labelPembayaranStatus(row.status_pembayaran)}`);
  }
  if (row.biaya_packing && row.biaya_packing !== "0") {
    lines.push(`Packing ${formatRupiah(row.biaya_packing)}`);
  }

  const hasMeta =
    lines.length > 0 ||
    row.catatan_pengiriman ||
    row.dikirim_pada ||
    row.terkirim_pada ||
    row.alasan_batal ||
    mode === "owner";

  if (!hasMeta) return null;

  return (
    <div className="space-y-2 rounded-md border border-border/80 bg-muted/10 px-3 py-2.5 text-sm">
      {lines.length ? (
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
          {lines.map((t) => (
            <span key={t}>{t}</span>
          ))}
          {row.jurnal_dp_id ? (
            <TautanCatatanKeuangan mode={mode} jurnalId={row.jurnal_dp_id} />
          ) : null}
          {row.jurnal_packing_id ? (
            <TautanCatatanKeuangan mode={mode} jurnalId={row.jurnal_packing_id} />
          ) : null}
        </p>
      ) : null}
      {row.catatan_pengiriman ? (
        <p className="text-muted-foreground">Catatan kirim: {row.catatan_pengiriman}</p>
      ) : null}
      {row.dikirim_pada ? (
        <p className="text-xs text-muted-foreground">
          Dikirim {new Date(row.dikirim_pada).toLocaleString("id-ID")}
        </p>
      ) : null}
      {row.terkirim_pada ? (
        <p className="text-xs text-muted-foreground">
          Sampai {new Date(row.terkirim_pada).toLocaleString("id-ID")}
          {row.jurnal_pendapatan_id ? (
            <>
              {row.jurnal_pendapatan_status ? (
                <>
                  {" · "}
                  {statusJurnalLabel[row.jurnal_pendapatan_status as StatusJurnalKey] ??
                    row.jurnal_pendapatan_status}
                </>
              ) : null}
              <TautanCatatanKeuangan mode={mode} jurnalId={row.jurnal_pendapatan_id} />
            </>
          ) : null}
        </p>
      ) : null}
      {row.alasan_batal ? (
        <p className="text-destructive">Alasan batal: {row.alasan_batal}</p>
      ) : null}
      {mode === "owner" ? (
        <p className="text-xs text-muted-foreground">Owner hanya melihat. Aksi lewat Admin.</p>
      ) : null}
    </div>
  );
}

export function SalesOrderDetail({
  row,
  mode,
}: {
  row: SoRow;
  mode: "admin" | "pengiriman" | "owner";
}) {
  return (
    <div className="space-y-4">
      <SalesOrderProgressStrip status={row.status} />
      <ul className="divide-y divide-border/60 rounded-md border">
        {row.baris.map((b, i) => (
          <SalesOrderBarisLine
            key={i}
            compact
            baris={{
              greenhouseNama: b.greenhouse_nama,
              kolamNama: b.kolam_nama,
              varietasNama: b.varietas_nama,
              kodeBatch: b.kode_batch,
              jenis: b.jenis,
              jumlah: b.jumlah,
              lubang_terpakai: b.lubang_terpakai,
              hpp_order: b.hpp_order,
              subtotal: b.subtotal,
            }}
          />
        ))}
      </ul>
      <SalesOrderDetailMeta row={row} mode={mode} />
    </div>
  );
}
