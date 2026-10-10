/** Tipe tugas dashboard petani — aman untuk client. */

export type TugasPetani = {
  id: string;
  prioritas: "tinggi" | "sedang" | "rendah";
  judul: string;
  deskripsi: string;
  href: string;
};
