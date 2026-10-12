/** Label status pesanan jual untuk tampilan layar (bukan enum Prisma). */
export const salesOrderStatusLabel: Record<string, string> = {
  DRAFT: "Sementara",
  CONFIRMED: "Dikonfirmasi",
  SHIPPED: "Sudah kirim",
  DELIVERED: "Sudah sampai",
  CANCELLED: "Dibatalkan",
};

export const pembayaranStatusLabel: Record<string, string> = {
  BELUM_BAYAR: "Belum bayar",
  DP_DITERIMA: "Uang muka diterima",
  PIUTANG: "Belum lunas",
  LUNAS: "Lunas",
};

export function labelSalesOrderStatus(status: string): string {
  return salesOrderStatusLabel[status] ?? status;
}

export function labelPembayaranStatus(status: string): string {
  return pembayaranStatusLabel[status] ?? status;
}
