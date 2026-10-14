/** Catatan singkat per halaman — dialog Panduan. */
export const COACH_TIPS: Record<string, string[]> = {
  "owner-home": [
    "Angka di beranda dihitung dari catatan keuangan yang sudah disetujui bulan ini.",
    "Jika ada peringatan stok rendah, buka menu yang sama di sidebar.",
    "Menu Owner bisa dibuka tutup dengan tanda panah di sidebar.",
  ],
  "admin-home": [
    "Selesaikan dulu permintaan ganti sandi sebelum mendaftarkan petani baru.",
    "Tombol pintasan di bawah mengarah ke stok, panen, pesanan jual, catatan keuangan, pelanggan, dan akuntansi.",
  ],
  "petani-home": [
    "Baca «Urutan kerja» di atas: siklus → monitor → stok → pengiriman.",
    "Tombol «Kerjakan tugas» atau «Mulai semai» di kanan atas = langkah paling urgent.",
    "Stok rendah: cek daftar, lalu beri tahu Admin bila perlu isi ulang.",
  ],
  "owner-laporan": [
    "Isi bulan dengan format 2026-01 (tahun-bulan).",
    "Unduh PDF untuk laporan laba rugi, neraca, dan arus kas.",
  ],
  "owner-jurnal": [
    "Hanya catatan keuangan yang sudah disetujui yang masuk laporan.",
    "Klik baris untuk detail. Persetujuan biasanya dilakukan Admin.",
  ],
  "owner-akun": [
    "Daftar akun keuangan: kode 4xxx pendapatan, 5xxx beban.",
    "Ubah struktur akun hanya lewat Admin; Owner melihat saja.",
  ],
  "owner-prive": [
    "Pencatatan ambil pribadi Owner mempengaruhi neraca.",
  ],
  "owner-arus-kas": [
    "Pilih rentang bulan dulu sebelum membaca daftar.",
    "Daftar ini dari akun Kas dan Bank yang sudah disetujui.",
  ],
  "owner-biaya": [
    "Pisahkan biaya langsung dan biaya umum per bulan.",
    "Setelah panen disetujui Admin, HPP terisi di halaman Untung dan titik impas.",
  ],
  "owner-evaluasi": [
    "Untung kotor = harga jual varietas dikurangi HPP rata-rata.",
    "Titik impas dan kolam kosong membantu tentukan harga dan kapasitas.",
  ],
  "owner-varietas": [
    "Klik baris varietas untuk lihat detail di panel kanan.",
    "Nonaktifkan varietas hanya jika tidak dipakai untuk tanam baru.",
  ],
  "owner-infrastruktur": [
    "Owner hanya melihat. Ubah lahan, greenhouse, dan kolam lewat Admin.",
  ],
  "owner-inventaris": [
    "Riwayat stok masuk keluar terpisah dari riwayat ubah data barang.",
  ],
  "owner-stok-rendah": [
    "Barang di bawah batas minimum; koordinasikan isi ulang dengan Admin.",
  ],
  "owner-petani": [
    "Daftar ini data petani di lapangan, bukan daftar akun untuk login.",
  ],
  "owner-pengguna": [
    "Owner bisa membuat akun Admin atau Petani dan memberi sandi awal.",
    "Menonaktifkan akun = tidak bisa login lagi; data lama tetap ada.",
  ],
  "owner-produksi": [
    "Halaman ini hanya untuk melihat. Kerja di lapangan lewat menu Petani → Siklus.",
  ],
  "owner-kegagalan-susut": [
    "Antrian kegagalan menunggu pengelompokan Admin di menu Susut.",
  ],
  "owner-penjualan": [
    "Owner hanya melihat. Buat dan ubah pesanan jual lewat Admin.",
    "Pendapatan tercatat saat pesanan sudah dikirim dan dicatat di keuangan.",
  ],
  "admin-pelanggan": [
    "Tambah dan ubah lewat panel samping; nonaktifkan perlu konfirmasi.",
    "Pelanggan nonaktif tidak bisa dipilih saat buat pesanan jual baru.",
  ],
  "admin-pelanggan-detail": [
    "Klik baris pesanan untuk buka detail penjualan di panel samping.",
    "HPP dan margin internal; faktur pelanggan tidak menampilkan HPP.",
  ],
  "admin-penjualan": [
    "Urutan: buat pesanan, konfirmasi, kirim, lalu catat pelunasan atau uang muka.",
    "Klik baris untuk detail di panel samping.",
  ],
  "admin-jurnal": [
    "Catatan sementara perlu disetujui Owner, kecuali jenis yang disetujui otomatis.",
    "Total masuk dan total keluar harus sama sebelum disetujui.",
  ],
  "admin-akuntansi": [
    "Tutup periode sebelum tutup buku; jalankan penyusutan tiap bulan.",
  ],
  "admin-akun": [
    "Daftar akun berbentuk pohon: tambah, ubah, atau nonaktifkan per baris.",
  ],
  "admin-biaya": [
    "Listrik diisi per lahan, bukan per greenhouse. Kolam membagi proporsional lubang.",
    "Gaji bulanan di biaya umum; sewa lahan dan depresiasi greenhouse dari data infrastruktur.",
  ],
  "admin-inventaris": [
    "Stok masuk, keluar, dan penyesuaian di halaman detail barang.",
  ],
  "admin-active-pack": [
    "Paket siap pakai mengurangi stok bahan saat dipakai untuk semai.",
  ],
  "admin-infrastruktur": [
    "Status kolam (dipakai atau kosong) dipakai untuk evaluasi kapasitas.",
  ],
  "admin-varietas": [
    "Data varietas dipakai untuk hitung HPP otomatis.",
  ],
  "admin-harvest": [
    "Setujui panen = HPP dan catatan stok sayur terisi.",
    "Klik baris untuk tinjau di panel samping.",
  ],
  "admin-susut": [
    "Susut normal masuk HPP; susut tidak normal masuk beban operasional.",
  ],
  "admin-stok-rendah": [
    "Sama dengan peringatan di sidebar; prioritaskan isi ulang stok.",
  ],
  "admin-petani": [
    "Data petani lapangan beda dengan akun login; akun login dibuat di beranda Admin.",
  ],
  "petani-siklus": [
    "Satu baris = satu siklus tanam; buka baris untuk lanjut fase atau panen.",
    "Filter rumah kaca/kolam lalu «Monitor kolam hari ini» untuk catat pH dan PPM.",
  ],
  "petani-inventaris": [
    "Catat keluar saat bahan dipakai di lapangan.",
  ],
  "petani-active-pack": [
    "Pakai paket saat mulai semai; sisa otomatis berkurang.",
  ],
  "petani-varietas": [
    "Hanya varietas aktif muncul saat buat semai baru.",
  ],
  "petani-pengiriman": [
    "Konfirmasi kirim dan terima sesuai status pesanan.",
  ],
  "petani-stok-rendah": [
    "Hubungi Admin jika stok habis di lapangan.",
  ],
  "detail-varietas": [
    "Riwayat perubahan mencatat siapa yang mengubah.",
    "Ubah lewat tombol aksi; form di panel samping.",
  ],
  "detail-inventaris": [
    "Riwayat stok terpisah dari riwayat ubah data master barang.",
  ],
  "detail-jurnal": [
    "Baris masuk dan keluar harus seimbang sebelum disetujui.",
  ],
  "detail-sales-order": [
    "Status pesanan menentukan tombol apa yang boleh diklik.",
  ],
  login: [
    "Masuk dengan email dan sandi yang diberikan pengelola.",
    "Pesan salah sandi tidak memberitahu apakah email terdaftar (demi keamanan).",
    "Owner, Admin, dan Petani masuk ke halaman beranda masing-masing.",
  ],
  pengaturan: [
    "Perbarui profil dan sandi; wajib setelah Owner atau Admin memberi sandi baru.",
  ],
  "admin-jurnal-baru": [
    "Bisa pakai jurnal otomatis (17 jenis) atau isi manual; pastikan masuk = keluar sebelum simpan.",
    "Periode tutup memblokir tanggal sebelum tanggal kunci.",
  ],
  "admin-penjualan-baru": [
    "Pilih pelanggan aktif dan batch panen yang masih ada.",
    "Simpan dulu sebagai pesanan sementara; konfirmasi stok di halaman detail pesanan.",
  ],
  "petani-siklus-baru": [
    "Stok paket benih atau media berkurang otomatis saat batch dibuat.",
    "Varietas nonaktif tidak muncul di daftar pilihan.",
  ],
  "ganti-sandi": [
    "Wajib setelah Admin atau Owner memberi sandi sementara.",
    "Setelah berhasil, Anda diarahkan ke beranda peran Anda.",
  ],
  "lupa-sandi": [
    "Ganti sandi tidak lewat email otomatis; Admin memproses antrian.",
    "Gunakan email yang terdaftar pada akun petani.",
  ],
  "akses-ditolak": [
    "Alamat atau menu ini bukan untuk peran Anda; gunakan menu di sidebar.",
    "Tombol kembali mengarah ke beranda peran saat ini.",
  ],
  "admin-penjualan-invoice": [
    "Pratinjau di layar; gunakan Cetak untuk PDF atau kertas.",
    "Kembali ke detail pesanan untuk ubah status atau pelunasan.",
  ],
  "petani-pengiriman-detail": [
    "Konfirmasi kirim dan terima sesuai peran logistik.",
    "Status pesanan menentukan aksi yang boleh dilakukan.",
  ],
  home: [
    "Halaman ini status pengembangan produk, bukan transaksi harian.",
    "Untuk kerja sehari-hari, masuk lalu buka beranda peran Anda.",
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
