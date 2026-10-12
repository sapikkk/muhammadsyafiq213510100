/** Langkah panduan per halaman (coachmark). */
export type FlowStep = {
  label: string;
  detail: string;
};

export type CoachMeta = {
  pageKey: string;
  title: string;
  steps: FlowStep[];
};

/** Meta panduan dari path URL (detail, /baru, pengaturan, auth). */
export function resolveCoachMeta(pathname: string): CoachMeta | null {
  if (pathname === "/login") {
    return {
      pageKey: "login",
      title: "Panduan masuk",
      steps: [
        { label: "Email & sandi", detail: "Isi keduanya lalu klik Masuk." },
        { label: "Peran", detail: "Sistem mengarahkan ke dashboard Owner, Admin, atau Petani." },
        { label: "Lupa sandi", detail: "Petani minta reset ke Admin; profil di Pengaturan." },
      ],
    };
  }
  if (pathname === "/pengaturan") {
    return {
      pageKey: "pengaturan",
      title: "Pengaturan akun",
      steps: [
        { label: "Profil", detail: "Perbarui nama tampilan jika perlu." },
        { label: "Sandi", detail: "Ganti sandi — wajib setelah reset dari Owner." },
      ],
    };
  }
  const staticMatchers: { pattern: RegExp; pageKey: string; title: string; steps: FlowStep[] }[] = [
    {
      pattern: /^\/ganti-sandi\/?$/,
      pageKey: "ganti-sandi",
      title: "Ganti sandi",
      steps: [
        { label: "Sandi lama", detail: "Wajib benar sebelum sandi baru disimpan." },
        { label: "Konfirmasi", detail: "Ulangi sandi baru — lalu lanjut ke dashboard." },
      ],
    },
    {
      pattern: /^\/akses-ditolak\/?$/,
      pageKey: "akses-ditolak",
      title: "Akses ditolak",
      steps: [
        { label: "Peran", detail: "Menu dan URL dibatasi per Owner / Admin / Petani." },
        { label: "Keluar", detail: "Kembali ke dashboard Anda lewat tombol di bawah." },
      ],
    },
    {
      pattern: /^\/admin\/jurnal\/baru\/?$/,
      pageKey: "admin-jurnal-baru",
      title: "Jurnal baru",
      steps: [
        { label: "Tipe", detail: "Smart Jurnal (17 tipe) atau baris manual." },
        { label: "Approve", detail: "Saldo dan laporan berubah setelah disetujui." },
      ],
    },
    {
      pattern: /^\/admin\/penjualan\/baru\/?$/,
      pageKey: "admin-penjualan-baru",
      title: "Buat sales order",
      steps: [
        { label: "Pelanggan & batch", detail: "Pilih baris pesanan valid." },
        { label: "Draft", detail: "Lanjut konfirmasi stok di detail SO." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/baru\/?$/,
      pageKey: "petani-siklus-baru",
      title: "Mulai semai baru",
      steps: [
        { label: "Varietas & kolam", detail: "Pastikan kolam siap dan pack cukup." },
        { label: "Submit", detail: "Batch baru muncul di daftar siklus aktif." },
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
      title: "Invoice penjualan",
      steps: [
        { label: "Pratinjau", detail: "Layout cetak di bawah tombol Cetak." },
        { label: "Kembali", detail: "Ke detail SO untuk status dan pembayaran." },
      ],
    },
    {
      pattern: /^\/owner\/varietas\/\d+$/,
      pageKey: "detail-varietas",
      title: "Detail varietas",
      steps: [
        { label: "Parameter", detail: "Baca HPP dan harga jual master." },
        { label: "Ubah", detail: "Tombol aksi — form sheet." },
        { label: "Riwayat", detail: "Perubahan tercatat per user." },
      ],
    },
    {
      pattern: /^\/(owner|admin|petani)\/inventaris\/\d+$/,
      pageKey: "detail-inventaris",
      title: "Detail inventaris",
      steps: [
        { label: "Stok", detail: "Saldo saat ini vs minimum." },
        { label: "Pergerakan", detail: "IN/OUT/ADJUST di Admin/Petani." },
      ],
    },
    {
      pattern: /^\/(owner|admin)\/jurnal\/\d+$/,
      pageKey: "detail-jurnal",
      title: "Detail jurnal",
      steps: [
        { label: "Baris", detail: "Periksa akun debit dan kredit." },
        { label: "Status", detail: "Draft vs APPROVED." },
      ],
    },
    {
      pattern: /^\/(admin|owner)\/penjualan\/\d+$/,
      pageKey: "detail-sales-order",
      title: "Detail sales order",
      steps: [
        { label: "Status", detail: "Menentukan aksi yang boleh dilakukan." },
        { label: "Baris", detail: "Batch, jumlah, subtotal per item." },
      ],
    },
    {
      pattern: /^\/petani\/pengiriman\/\d+$/,
      pageKey: "petani-pengiriman-detail",
      title: "Detail pengiriman",
      steps: [
        { label: "Status SO", detail: "Ikuti alur kirim dan terima." },
        { label: "Baris", detail: "Periksa batch dan jumlah sebelum konfirmasi." },
      ],
    },
    {
      pattern: /^\/admin\/harvest\/\d+$/,
      pageKey: "admin-harvest",
      title: "Review panen",
      steps: [
        { label: "Sortasi", detail: "Layak dan tidak layak jual." },
        { label: "HPP", detail: "Pratinjau sebelum disetujui." },
        { label: "Setujui", detail: "HPP dan jurnal persediaan tercatat." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/\d+$/,
      pageKey: "petani-siklus",
      title: "Detail batch",
      steps: [
        { label: "Langkah berikutnya", detail: "Pindah fase atau kirim laporan panen." },
        { label: "Aksi", detail: "Monitor, tambal, atau abort via dialog." },
      ],
    },
    {
      pattern: /^\/(admin|petani)\/active-pack\/\d+$/,
      pageKey: "admin-active-pack",
      title: "Detail active pack",
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
