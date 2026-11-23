/** Langkah operasional Petani (PEKERJA) — hanya modul yang boleh di RBAC. */
export type PetaniAlurLangkah = {
  no: number;
  label: string;
  hint: string;
  href: string;
};

export const PETANI_ALUR_LANGKAH: PetaniAlurLangkah[] = [
  {
    no: 1,
    label: "Kolam rakit",
    hint: "Semai tiga isian, catat air, atau lapor gagal.",
    href: "/petani/kolam",
  },
  {
    no: 2,
    label: "Siklus tanam",
    hint: "Lanjut fase atau lihat daftar batch.",
    href: "/petani/siklus",
  },
  {
    no: 3,
    label: "Stok & paket",
    hint: "Cek stok barang dan paket siap pakai.",
    href: "/petani/active-pack",
  },
  {
    no: 4,
    label: "Pengiriman",
    hint: "Siapkan dan konfirmasi kirim pesanan jual.",
    href: "/petani/pengiriman",
  },
];
