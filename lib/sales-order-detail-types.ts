/** Baris detail pesanan jual (serialisasi untuk layar). */
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
  jumlah_pelunasan?: string;
  akun_dp_kode?: string | null;
  status_pembayaran?: string;
  jurnal_dp_id?: number | null;
  baris: {
    kode_batch: string;
    greenhouse_nama: string;
    kolam_nama: string;
    varietas_nama: string;
    jenis: string;
    jumlah: string;
    lubang_terpakai?: number;
    hpp_order?: string;
    subtotal: string;
  }[];
};
