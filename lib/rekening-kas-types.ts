/** Tipe aman untuk client — tanpa Prisma Decimal. */

export type RekeningKasOption = {
  akunKode: string;
  namaRekening: string;
  institusiKode: string;
  institusiNama: string;
  jenis: "TUNAI" | "BANK" | "EWALLET";
  nomorRekening: string | null;
  saldo: string;
  logoSlug?: string;
};

export type RekeningKasBaris = RekeningKasOption & {
  id: number;
  atasNama: string | null;
  aktif: boolean;
  urutan: number;
};
