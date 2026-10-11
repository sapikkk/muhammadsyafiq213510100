/** Tips UAT / blackbox per halaman — dipasang di coachmark. */
export const COACH_TIPS: Record<string, string[]> = {
  "owner-home": [
    "KPI memakai jurnal APPROVED bulan berjalan (akun 4xxx / 5xxx).",
    "Banner stok rendah mengarah ke daftar item di bawah minimum.",
    "Sidebar epik 1.0–7.0 — buka grup dengan chevron.",
  ],
  "admin-home": [
    "Reset sandi petani: selesaikan antrian sebelum daftar petani baru.",
    "Alur harian di chip — klik Panduan jika lupa urutan.",
  ],
  "petani-home": [
    "Mulai dari siklus aktif atau buat semai baru.",
    "Stok rendah = bahan perlu diisi Admin atau catat pergerakan.",
  ],
  "owner-laporan": [
    "Format periode YYYY-MM — selaras filter arus kas.",
    "Unduh PDF per jenis laporan (laba rugi, neraca, arus kas).",
  ],
  "owner-jurnal": [
    "Hanya jurnal APPROVED masuk laporan keuangan.",
    "Klik baris untuk detail; setujui/tolak dari Admin atau otomatis.",
  ],
  "owner-akun": [
    "Bagan akun COA — kode 4xxx pendapatan, 5xxx beban.",
    "Perubahan struktur akun hanya Admin; Owner pantau.",
  ],
  "owner-prive": [
    "Pencatatan prive Owner mempengaruhi ekuitas di neraca.",
  ],
  "owner-arus-kas": [
    "Filter rentang bulan lalu terapkan.",
    "Mutasi mengacu akun Kas/Bank dari jurnal APPROVED.",
  ],
  "owner-biaya": [
    "Breakdown biaya langsung vs overhead per periode.",
    "Data siklus panen disetujui mengisi HPP di evaluasi.",
  ],
  "owner-evaluasi": [
    "Margin = harga master varietas − HPP rata.",
    "BEP dan kolam idle membantu keputusan harga & kapasitas.",
  ],
  "owner-varietas": [
    "Klik baris varietas — detail lewat sheet kanan.",
    "Nonaktifkan hanya jika tidak dipakai siklus baru.",
  ],
  "owner-infrastruktur": [
    "Owner baca saja — ubah lahan/GH/kolam via Admin.",
  ],
  "owner-inventaris": [
    "Riwayat pergerakan vs riwayat perubahan master terpisah.",
  ],
  "owner-stok-rendah": [
    "Item di bawah stok minimum — koordinasi dengan Admin.",
  ],
  "owner-petani": [
    "Daftar akun login petani — bukan master HR lengkap.",
  ],
  "owner-pengguna": [
    "Owner bisa buat Admin/Petani dan reset sandi awal.",
    "Nonaktifkan user menutup login, data historis tetap.",
  ],
  "owner-produksi": [
    "Read-only — operasi fase di /petani/siklus.",
  ],
  "owner-kegagalan-susut": [
    "Antrian menunggu klasifikasi Admin di /admin/susut.",
  ],
  "owner-penjualan": [
    "Read-only — aksi SO di /admin/penjualan.",
    "Pendapatan tercatat lewat jurnal saat SO terkirim.",
  ],
  "admin-pelanggan": [
    "Tambah/Ubah lewat sheet; nonaktifkan butuh centang konfirmasi.",
    "Pelanggan nonaktif tidak dipilih di SO baru.",
  ],
  "admin-penjualan": [
    "Buat SO → konfirmasi → kirim → catat pelunasan/DP.",
    "Klik baris untuk detail sheet.",
  ],
  "admin-jurnal": [
    "Draft perlu disetujui Owner (atau otomatis sesuai tipe).",
    "Debit harus sama dengan kredit sebelum approve.",
  ],
  "admin-akuntansi": [
    "Smart jurnal & penyusutan — ikuti langkah di Panduan.",
  ],
  "admin-akun": [
    "Pohon akun — tambah/ubah/nonaktifkan per node.",
  ],
  "admin-biaya": [
    "Overhead bulanan mempengaruhi alokasi HPP panen.",
  ],
  "admin-inventaris": [
    "IN/OUT/ADJUST di detail item; nonaktifkan jika obsolet.",
  ],
  "admin-active-pack": [
    "Pack aktif mengurangi stok bahan saat dipakai semai.",
  ],
  "admin-infrastruktur": [
    "Status kolam TERPAKAI / MENGANGGUR mempengaruhi evaluasi idle.",
  ],
  "admin-varietas": [
    "Parameter varietas dipakai hitung HPP otomatis.",
  ],
  "admin-harvest": [
    "Approve panen menulis HPP + jurnal persediaan.",
    "Klik baris review untuk sheet detail.",
  ],
  "admin-susut": [
    "Normal masuk HPP; abnormal ke beban operasional.",
  ],
  "admin-stok-rendah": [
    "Sama dengan alert banner — prioritas restock.",
  ],
  "admin-petani": [
    "Master petani ≠ akun User — daftar login di reset/daftarkan.",
  ],
  "petani-siklus": [
    "Satu baris = satu batch; detail untuk langkah fase & panen.",
    "Abort menghentikan siklus — tidak bisa lanjut panen.",
  ],
  "petani-inventaris": [
    "Catat OUT saat pakai bahan di lapangan.",
  ],
  "petani-active-pack": [
    "Pakai pack saat mulai semai — sisa unit berkurang.",
  ],
  "petani-varietas": [
    "Hanya varietas AKTIF muncul di semai baru.",
  ],
  "petani-pengiriman": [
    "Konfirmasi kirim & terima sesuai status SO.",
  ],
  "petani-stok-rendah": [
    "Laporkan ke Admin jika stok habis di lapangan.",
  ],
  "detail-varietas": [
    "Riwayat perubahan mencatat siapa mengubah parameter.",
    "Ubah lewat tombol aksi — sheet form.",
  ],
  "detail-inventaris": [
    "Pergerakan stok terpisah dari ubah master item.",
  ],
  "detail-jurnal": [
    "Baris debit/kredit harus seimbang sebelum approve.",
  ],
  "detail-sales-order": [
    "Status SO menentukan tombol aksi yang muncul.",
  ],
  login: [
    "Gunakan email dan sandi akun demo atau produksi.",
    "Sandi salah tidak menyinggung apakah email terdaftar.",
    "Owner, Admin, dan Petani masuk ke dashboard berbeda.",
  ],
  "pengaturan": [
    "Ganti sandi dan profil — wajib setelah reset Owner.",
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
