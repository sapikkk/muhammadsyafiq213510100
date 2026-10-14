import type { SoRow } from "@/lib/sales-order-detail-types";

/** Langkah utama Admin — satu tombol per layar agar alur cepat. */
export type SalesOrderAdminPrimary =
  | "confirm"
  | "ship"
  | "deliver"
  | "pelunasan"
  | null;

export function adminPrimarySalesOrderStep(row: SoRow): SalesOrderAdminPrimary {
  if (row.status === "CANCELLED") return null;
  if (row.status === "DRAFT") return "confirm";
  if (row.status === "CONFIRMED") return "ship";
  if (row.status === "SHIPPED") return "deliver";
  if (row.status === "DELIVERED" && row.status_pembayaran === "PIUTANG") return "pelunasan";
  return null;
}

export function adminShowCatatDp(row: SoRow): boolean {
  return (
    row.status_pembayaran === "BELUM_BAYAR" &&
    Boolean(row.jumlah_dp && row.jumlah_dp !== "0") &&
    row.status !== "DRAFT" &&
    row.status !== "CANCELLED"
  );
}

export function adminShowPackingForm(row: SoRow): boolean {
  return (
    ["CONFIRMED", "SHIPPED", "DELIVERED"].includes(row.status) && !row.jurnal_packing_id
  );
}

export function adminShowCancel(row: SoRow): boolean {
  return row.status !== "CANCELLED";
}

export function pengirimanPrimaryStep(row: SoRow): "ship" | "deliver" | null {
  if (row.status === "CONFIRMED") return "ship";
  if (row.status === "SHIPPED") return "deliver";
  return null;
}
