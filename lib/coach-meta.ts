/** Langkah panduan per halaman (tombol Panduan). */
export type FlowStep = {
  label: string;
  detail: string;
};

export type CoachMeta = {
  pageKey: string;
  title: string;
  steps: FlowStep[];
};

/** Meta panduan dari path URL. */
export function resolveCoachMeta(pathname: string): CoachMeta | null {
  if (pathname === "/login") {
    return {
      pageKey: "login",
      title: "Cara masuk",
      steps: [
        { label: "Email dan sandi", detail: "Isi keduanya, lalu klik Masuk." },
        { label: "Peran", detail: "Sistem membuka beranda Owner, Admin, atau Petani." },
        { label: "Lupa sandi", detail: "Petani minta bantuan Admin; ganti sandi rutin di Pengaturan." },
      ],
    };
  }
  if (pathname === "/pengaturan") {
    return {
      pageKey: "pengaturan",
      title: "Pengaturan akun",
      steps: [
        { label: "Profil", detail: "Ubah nama tampilan jika perlu." },
        { label: "Sandi", detail: "Ganti sandi, wajib setelah reset dari Owner." },
      ],
    };
  }
  const staticMatchers: { pattern: RegExp; pageKey: string; title: string; steps: FlowStep[] }[] = [
    {
      pattern: /^\/ganti-sandi\/?$/,
      pageKey: "ganti-sandi",
      title: "Ganti sandi",
      steps: [
        { label: "Sandi lama", detail: "Harus benar sebelum sandi baru disimpan." },
        { label: "Konfirmasi", detail: "Ketik ulang sandi baru, lalu lanjut ke beranda." },
      ],
    },
    {
      pattern: /^\/akses-ditolak\/?$/,
      pageKey: "akses-ditolak",
      title: "Akses ditolak",
      steps: [
        { label: "Peran", detail: "Menu dan alamat web dibatasi per Owner, Admin, atau Petani." },
        { label: "Kembali", detail: "Pakai tombol di bawah untuk ke beranda Anda." },
      ],
    },
    {
      pattern: /^\/admin\/jurnal\/baru\/?$/,
      pageKey: "admin-jurnal-baru",
      title: "Catatan keuangan baru",
      steps: [
        { label: "Jenis", detail: "Pilih jurnal otomatis (17 jenis) atau isi baris sendiri." },
        { label: "Setujui", detail: "Laporan berubah setelah catatan disetujui." },
      ],
    },
    {
      pattern: /^\/admin\/penjualan\/baru\/?$/,
      pageKey: "admin-penjualan-baru",
      title: "Buat pesanan jual",
      steps: [
        { label: "Pelanggan dan batch", detail: "Pilih baris pesanan yang valid." },
        { label: "Draft", detail: "Simpan dulu; konfirmasi stok di halaman detail." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/baru\/?$/,
      pageKey: "petani-siklus-baru",
      title: "Mulai semai baru",
      steps: [
        { label: "Varietas dan kolam", detail: "Pastikan kolam siap dan paket cukup." },
        { label: "Simpan", detail: "Batch baru muncul di daftar siklus." },
      ],
    },
  ];
  for (const m of staticMatchers) {
    if (m.pattern.test(pathname)) {
      return { pageKey: m.pageKey, title: m.title, steps: m.steps };
    }
  }
  const detailMatchers: { pattern: RegExp; pageKey: string; title: string; steps: FlowStep[] }[] = [
    {
      pattern: /^\/admin\/penjualan\/\d+\/invoice\/?$/,
      pageKey: "admin-penjualan-invoice",
      title: "Nota penjualan",
      steps: [
        { label: "Pratinjau", detail: "Tampilan cetak di bawah tombol Cetak." },
        { label: "Kembali", detail: "Ke detail pesanan untuk status dan pembayaran." },
      ],
    },
    {
      pattern: /^\/owner\/varietas\/\d+$/,
      pageKey: "detail-varietas",
      title: "Detail varietas",
      steps: [
        { label: "Parameter", detail: "Lihat HPP dan harga jual." },
        { label: "Ubah", detail: "Tombol aksi membuka form di samping." },
        { label: "Riwayat", detail: "Siapa mengubah dan kapan." },
      ],
    },
    {
      pattern: /^\/(owner|admin|petani)\/inventaris\/\d+$/,
      pageKey: "detail-inventaris",
      title: "Detail stok barang",
      steps: [
        { label: "Stok", detail: "Jumlah sekarang dibanding batas minimum." },
        { label: "Pergerakan", detail: "Masuk, keluar, penyesuaian di Admin atau Petani." },
      ],
    },
    {
      pattern: /^\/(owner|admin)\/jurnal\/\d+$/,
      pageKey: "detail-jurnal",
      title: "Detail catatan keuangan",
      steps: [
        { label: "Baris", detail: "Periksa akun masuk dan keluar." },
        { label: "Status", detail: "Draft (sementara) atau sudah disetujui." },
      ],
    },
    {
      pattern: /^\/(admin|owner)\/penjualan\/\d+$/,
      pageKey: "detail-sales-order",
      title: "Detail pesanan jual",
      steps: [
        { label: "Status", detail: "Menentukan tombol apa yang boleh diklik." },
        { label: "Baris", detail: "Batch, jumlah, subtotal per item." },
      ],
    },
    {
      pattern: /^\/petani\/pengiriman\/\d+$/,
      pageKey: "petani-pengiriman-detail",
      title: "Detail pengiriman",
      steps: [
        { label: "Status pesanan", detail: "Ikuti urutan kirim dan terima." },
        { label: "Baris", detail: "Periksa batch dan jumlah sebelum konfirmasi." },
      ],
    },
    {
      pattern: /^\/admin\/harvest\/\d+$/,
      pageKey: "admin-harvest",
      title: "Tinjau laporan panen",
      steps: [
        { label: "Sortasi", detail: "Layak jual dan tidak layak jual." },
        { label: "HPP", detail: "Pratinjau sebelum disetujui." },
        { label: "Setujui", detail: "HPP dan catatan stok terisi." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/\d+$/,
      pageKey: "petani-siklus",
      title: "Detail batch tanam",
      steps: [
        { label: "Langkah berikutnya", detail: "Pindah fase atau kirim laporan panen." },
        { label: "Aksi lain", detail: "Monitor, tambal, atau batalkan siklus lewat dialog." },
      ],
    },
    {
      pattern: /^\/(admin|petani)\/active-pack\/\d+$/,
      pageKey: "admin-active-pack",
      title: "Detail paket siap pakai",
      steps: [
        { label: "Sisa", detail: "Unit tersisa setelah dipakai semai." },
        { label: "Pakai", detail: "Kurangi stok saat dipakai di lapangan." },
      ],
    },
  ];
  for (const m of detailMatchers) {
    if (m.pattern.test(pathname)) {
      return { pageKey: m.pageKey, title: m.title, steps: m.steps };
    }
  }
  return null;
}
