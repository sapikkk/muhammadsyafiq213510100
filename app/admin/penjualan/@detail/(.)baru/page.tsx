import { SalesOrderCreateSheet } from "@/components/sales-order-create-sheet";

/** Intercept dari daftar → sheet buat pesanan (daftar tetap terlihat). */
export default function AdminPenjualanBaruInterceptSheet() {
  return <SalesOrderCreateSheet />;
}
