/** Label status laporan panen untuk tampilan layar. */
export const laporanPanenStatusLabel: Record<string, string> = {
  PENDING: "Menunggu tinjauan",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
};

export function labelLaporanPanenStatus(status: string): string {
  return laporanPanenStatusLabel[status] ?? status;
}
