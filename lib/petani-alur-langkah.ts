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
    label: "Siklus tanam",
    hint: "Semai baru atau lanjut fase di kolam.",
    href: "/petani/siklus",
  },
  {
    no: 2,
    label: "Monitor kolam",
    hint: "Catat pH, PPM, dan suhu dari siklus aktif.",
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
