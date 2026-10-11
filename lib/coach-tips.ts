/** Catatan singkat per halaman — dipasang di dialog Panduan. */
export const COACH_TIPS: Record<string, string[]> = {
  "owner-home": [
    "KPI memakai jurnal berstatus APPROVED pada bulan berjalan (akun 4xxx dan 5xxx).",
    "Banner stok rendah mengarah ke daftar item di bawah batas minimum.",
    "Menu Owner dikelompokkan; buka grup dengan ikon chevron di sidebar.",
  ],
  "admin-home": [
    "Selesaikan antrian reset sandi sebelum mendaftarkan petani baru.",
    "Tombol Panduan di setiap halaman menjelaskan urutan kerja halaman itu.",
  ],
  "petani-home": [
    "Mulai dari batch aktif di Siklus, atau buat semai baru jika kolam siap.",
    "Stok rendah berarti bahan perlu diisi Admin atau dicatat pergerakannya.",
  ],
  "owner-laporan": [
    "Format periode YYYY-MM, selaras dengan filter arus kas.",
    "Unduh PDF per jenis laporan: laba rugi, neraca, dan arus kas.",
  ],
  "owner-jurnal": [
    "Hanya jurnal APPROVED yang masuk laporan keuangan.",
    "Klik baris untuk detail; persetujuan dilakukan Admin atau otomatis sesuai tipe.",
  ],
  "owner-akun": [
    "Bagan akun COA: kode 4xxx pendapatan, 5xxx beban.",
    "Perubahan struktur akun hanya Admin; Owner memantau.",
  ],
  "owner-prive": [
    "Pencatatan prive Owner mempengaruhi ekuitas pada neraca.",
  ],
  "owner-arus-kas": [
    "Terapkan filter rentang bulan sebelum membaca mutasi.",
    "Mutasi mengacu akun Kas/Bank dari jurnal APPROVED.",
  ],
  "owner-biaya": [
    "Pisahkan biaya langsung dan overhead per periode.",
    "Batch panen yang disetujui mengisi HPP di halaman Evaluasi.",
  ],
  "owner-evaluasi": [
    "Margin = harga master varietas dikurangi HPP rata-rata.",
    "BEP dan kolam idle membantu keputusan harga dan kapasitas.",
  ],
  "owner-varietas": [
    "Klik baris varietas untuk detail di panel kanan.",
    "Nonaktifkan varietas hanya jika tidak dipakai untuk siklus baru.",
  ],
  "owner-infrastruktur": [
    "Owner hanya melihat; perubahan lahan, greenhouse, dan kolam lewat Admin.",
  ],
  "owner-inventaris": [
    "Riwayat pergerakan stok terpisah dari riwayat perubahan master item.",
  ],
  "owner-stok-rendah": [
    "Item di bawah stok minimum; koordinasikan restock dengan Admin.",
  ],
  "owner-petani": [
    "Daftar ini master petani lapangan, bukan daftar akun login.",
  ],
  "owner-pengguna": [
    "Owner dapat membuat Admin/Petani dan memberi sandi awal.",
    "Menonaktifkan user menutup login; data historis tetap tersimpan.",
  ],
  "owner-produksi": [
    "Halaman baca saja; operasi fase di menu Petani → Siklus.",
  ],
  "owner-kegagalan-susut": [
    "Antrian menunggu klasifikasi Admin di menu Susut.",
  ],
  "owner-penjualan": [
    "Halaman baca saja; aksi sales order di menu Penjualan Admin.",
    "Pendapatan tercatat lewat jurnal saat order terkirim.",
  ],
  "admin-pelanggan": [
    "Tambah dan ubah lewat panel samping; nonaktifkan memerlukan konfirmasi.",
    "Pelanggan nonaktif tidak dapat dipilih pada sales order baru.",
  ],
  "admin-penjualan": [
    "Alur: buat order → konfirmasi → kirim → catat pelunasan atau DP.",
    "Klik baris untuk detail di panel samping.",
  ],
  "admin-jurnal": [
    "Draft perlu disetujui Owner, kecuali tipe yang disetujui otomatis.",
    "Total debit harus sama dengan total kredit sebelum approve.",
  ],
  "admin-akuntansi": [
    "Smart Jurnal dan penyusutan: ikuti langkah di Panduan halaman ini.",
  ],
  "admin-akun": [
    "Pohon akun: tambah, ubah, atau nonaktifkan per node.",
  ],
  "admin-biaya": [
    "Overhead bulanan mempengaruhi alokasi HPP panen.",
  ],
  "admin-inventaris": [
    "Pergerakan IN, OUT, dan ADJUST di detail item; nonaktifkan jika obsolet.",
  ],
  "admin-active-pack": [
    "Pack aktif mengurangi stok bahan saat dipakai untuk semai.",
  ],
  "admin-infrastruktur": [
    "Status kolam TERPAKAI atau MENGANGGUR mempengaruhi evaluasi kapasitas idle.",
  ],
  "admin-varietas": [
    "Parameter varietas dipakai perhitungan HPP otomatis.",
  ],
  "admin-harvest": [
    "Approve panen menulis HPP dan jurnal persediaan.",
    "Klik baris review untuk detail di panel samping.",
  ],
  "admin-susut": [
    "Susut normal masuk HPP; susut abnormal ke beban operasional.",
  ],
  "admin-stok-rendah": [
    "Sama dengan peringatan banner; prioritaskan restock.",
  ],
  "admin-petani": [
    "Master petani berbeda dari akun User; login didaftarkan terpisah di beranda Admin.",
  ],
  "petani-siklus": [
    "Satu baris = satu batch; detail berisi langkah fase dan panen.",
    "Abort menghentikan siklus; batch tidak dapat dilanjutkan ke panen.",
  ],
  "petani-inventaris": [
    "Catat OUT saat bahan dipakai di lapangan.",
  ],
  "petani-active-pack": [
    "Pakai pack saat mulai semai; sisa unit berkurang otomatis.",
  ],
  "petani-varietas": [
    "Hanya varietas berstatus AKTIF muncul di semai baru.",
  ],
  "petani-pengiriman": [
    "Konfirmasi kirim dan terima sesuai status sales order.",
  ],
  "petani-stok-rendah": [
    "Hubungi Admin jika stok habis di lapangan.",
  ],
  "detail-varietas": [
    "Riwayat perubahan mencatat siapa mengubah parameter.",
    "Ubah lewat tombol aksi; form di panel samping.",
  ],
  "detail-inventaris": [
    "Pergerakan stok terpisah dari perubahan data master item.",
  ],
  "detail-jurnal": [
    "Baris debit dan kredit harus seimbang sebelum approve.",
  ],
  "detail-sales-order": [
    "Status order menentukan tombol aksi yang tampil.",
  ],
  login: [
    "Masuk dengan email dan sandi yang diberikan administrador.",
    "Pesan error tidak menyinggung apakah email terdaftar.",
    "Owner, Admin, dan Petani diarahkan ke dashboard masing-masing.",
  ],
  pengaturan: [
    "Perbarui profil dan sandi; wajib setelah reset dari Owner atau Admin.",
  ],
  "admin-jurnal-baru": [
    "Smart Jurnal atau manual: pastikan debit sama dengan kredit sebelum simpan.",
    "Periode tutup memblokir tanggal sebelum tanggal lock.",
  ],
  "admin-penjualan-baru": [
    "Pilih pelanggan aktif dan batch panen yang masih tersedia.",
    "Simpan sebagai draft; konfirmasi stok di halaman detail order.",
  ],
  "petani-siklus-baru": [
    "Stok pack benih atau media berkurang otomatis saat batch dibuat.",
    "Varietas nonaktif tidak muncul di daftar pilihan.",
  ],
  "ganti-sandi": [
    "Wajib setelah Admin atau Owner memberi sandi sementara.",
    "Setelah berhasil, Anda diarahkan ke dashboard peran Anda.",
  ],
  "lupa-sandi": [
    "Reset tidak otomatis lewat email; Admin memproses antrian.",
    "Gunakan email yang terdaftar pada akun petani.",
  ],
  "akses-ditolak": [
    "URL atau menu ini bukan untuk peran Anda; gunakan menu sidebar.",
    "Tombol kembali mengarah ke dashboard peran saat ini.",
  ],
  "admin-penjualan-invoice": [
    "Pratinjau di layar; gunakan Cetak untuk PDF atau kertas.",
    "Kembali ke detail order untuk ubah status atau pelunasan.",
  ],
  "petani-pengiriman-detail": [
    "Konfirmasi kirim dan terima sesuai peran logistik.",
    "Status order menentukan aksi yang boleh dilakukan.",
  ],
  home: [
    "Halaman ini menampilkan status pengembangan produk, bukan transaksi harian.",
    "Untuk operasional, masuk lalu buka dashboard peran Anda.",
  ],
};

const COACH_KEY_ALIASES: Record<string, string> = {
  owner: "owner-home",
  admin: "admin-home",
  petani: "petani-home",
};

export function tipsForCoachKey(coachKey: string): string[] {
  const key = COACH_KEY_ALIASES[coachKey] ?? coachKey;
  return COACH_TIPS[key] ?? [];
}
