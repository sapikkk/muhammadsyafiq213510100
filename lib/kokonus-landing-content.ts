/** Copy landing — bahasa Indonesia, kalimat pendek (ui-ringkas). */

export type LandingStackCard = {
  title: string;
  meta: string;
  date: string;
  image: string;
};

export type LandingFacility = {
  title: string;
  image: string;
};

export const LANDING_ASSET = "/landing";

export const LANDING_NAV = [
  { href: "#modul", label: "Modul" },
  { href: "#fasilitas", label: "Alur kebun" },
  { href: "#masuk", label: "Masuk" },
] as const;

export const LANDING_HERO = {
  title: "Greenhouse, rakit apung, penjualan — satu aplikasi.",
  lead:
    "Petani catat di kolam. Admin jual dan jadwalkan antar. Owner lihat uang masuk. Teks di layar pakai bahasa Indonesia.",
  cta: "Masuk",
  previewTitle: "01 / 03",
  previewBody: "Siklus tanam, stok pack, pesanan jual — berurutan, bukan di akhir bulan.",
  stack: [
    {
      title: "Pengantaran",
      meta: "Jadwal kirim hari ini",
      date: "Petani",
      image: `${LANDING_ASSET}/dab15.png`,
    },
    {
      title: "Panen",
      meta: "Rakit apung · greenhouse",
      date: "Produksi",
      image: `${LANDING_ASSET}/879d7.png`,
    },
    {
      title: "Pesanan jual",
      meta: "Pelanggan & piutang",
      date: "Admin",
      image: `${LANDING_ASSET}/7fa27.png`,
    },
  ] satisfies LandingStackCard[],
};

export const LANDING_FACILITIES: LandingFacility[] = [
  { title: "Greenhouse & varietas", image: `${LANDING_ASSET}/79bee.png` },
  { title: "Rakit apung & stok", image: `${LANDING_ASSET}/46779.png` },
  { title: "Penjualan & antar", image: `${LANDING_ASSET}/5e4b8.png` },
  { title: "Laporan keuangan", image: `${LANDING_ASSET}/cba57.png` },
];

export const LANDING_BENTO = {
  stat: "3 peran",
  statNote: "Petani · admin · owner",
  darkTitle: "Biaya produksi hidroponik",
  darkBody: "Catat di lapangan. Angka di owner selaras dengan kebun.",
  button: "Buka aplikasi",
};

export const LANDING_ROLES = [
  { title: "Petani", line: "Tugas, inventaris, panen, pengiriman." },
  { title: "Admin", line: "Pesanan jual, pelanggan, stok, jurnal." },
  { title: "Owner", line: "Arus kas, laba rugi, varietas." },
] as const;
