/** Katalog bank & e-wallet Indonesia — slug logo selaras idn-finlogos (npm). */

export type InstitusiJenis = "TUNAI" | "BANK" | "EWALLET";

export type InstitusiKeuangan = {
  kode: string;
  nama: string;
  jenis: InstitusiJenis;
  /** Slug idn-finlogos, mis. `bca`, `gopay`. */
  logoSlug?: string;
};

export const INSTITUSI_TUNAI: InstitusiKeuangan = {
  kode: "tunai",
  nama: "Kas tunai",
  jenis: "TUNAI",
};

const BANKS: InstitusiKeuangan[] = [
  { kode: "bca", nama: "BCA", jenis: "BANK", logoSlug: "bca" },
  { kode: "mandiri", nama: "Bank Mandiri", jenis: "BANK", logoSlug: "mandiri" },
  { kode: "bni", nama: "BNI", jenis: "BANK", logoSlug: "bni" },
  { kode: "bri", nama: "BRI", jenis: "BANK", logoSlug: "bri" },
  { kode: "btn", nama: "BTN", jenis: "BANK", logoSlug: "btn" },
  { kode: "cimb", nama: "CIMB Niaga", jenis: "BANK", logoSlug: "cimb-niaga" },
  { kode: "danamon", nama: "Danamon", jenis: "BANK", logoSlug: "danamon" },
  { kode: "permata", nama: "Permata Bank", jenis: "BANK", logoSlug: "permata" },
  { kode: "ocbc", nama: "OCBC NISP", jenis: "BANK", logoSlug: "ocbc-nisp" },
  { kode: "panin", nama: "Panin Bank", jenis: "BANK", logoSlug: "paninbank" },
  { kode: "mega", nama: "Bank Mega", jenis: "BANK", logoSlug: "mega" },
  { kode: "sinarmas", nama: "Bank Sinarmas", jenis: "BANK", logoSlug: "sinarmas" },
  { kode: "bsi", nama: "BSI", jenis: "BANK", logoSlug: "bsi" },
  { kode: "muamalat", nama: "Bank Muamalat", jenis: "BANK", logoSlug: "muamalat" },
  { kode: "bjb", nama: "Bank BJB", jenis: "BANK", logoSlug: "bank-bjb" },
  { kode: "dki", nama: "Bank DKI", jenis: "BANK", logoSlug: "bank-dki" },
  { kode: "jateng", nama: "Bank Jateng", jenis: "BANK", logoSlug: "bank-bpd-jateng" },
  { kode: "jatim", nama: "Bank Jatim", jenis: "BANK", logoSlug: "bank-bpd-jatim" },
  { kode: "sumut", nama: "Bank Sumut", jenis: "BANK", logoSlug: "bank-bpd-sumut" },
  { kode: "kalbar", nama: "Bank Kalbar", jenis: "BANK", logoSlug: "bank-bpd-kalbar" },
  { kode: "kaltimtara", nama: "Bank Kaltimtara", jenis: "BANK", logoSlug: "bank-bpd-kalimantan-timur" },
  { kode: "sulselbar", nama: "Bank Sulselbar", jenis: "BANK", logoSlug: "bank-bpd-sulselbar" },
  { kode: "ntb", nama: "Bank NTB Syariah", jenis: "BANK", logoSlug: "bank-bpd-ntb-syariah" },
  { kode: "bali", nama: "BPD Bali", jenis: "BANK", logoSlug: "bank-bpd-bali" },
  { kode: "papua", nama: "Bank Papua", jenis: "BANK", logoSlug: "bank-bpd-papua" },
  { kode: "bank_lain", nama: "Bank lain", jenis: "BANK" },
];

const EWALLETS: InstitusiKeuangan[] = [
  { kode: "gopay", nama: "GoPay", jenis: "EWALLET", logoSlug: "gopay" },
  { kode: "ovo", nama: "OVO", jenis: "EWALLET", logoSlug: "ovo" },
  { kode: "dana", nama: "DANA", jenis: "EWALLET", logoSlug: "dana" },
  { kode: "shopeepay", nama: "ShopeePay", jenis: "EWALLET", logoSlug: "shopee-pay" },
  { kode: "linkaja", nama: "LinkAja", jenis: "EWALLET", logoSlug: "linkaja" },
  { kode: "jenius", nama: "Jenius", jenis: "EWALLET", logoSlug: "jenius" },
  { kode: "flip", nama: "Flip", jenis: "EWALLET", logoSlug: "flip" },
  { kode: "sakuku", nama: "Sakuku (BCA)", jenis: "EWALLET", logoSlug: "bca" },
  { kode: "isaku", nama: "i.saku (Indomaret)", jenis: "EWALLET", logoSlug: "isaku" },
  { kode: "doku", nama: "DOKU Wallet", jenis: "EWALLET", logoSlug: "doku" },
  { kode: "ewallet_lain", nama: "E-wallet lain", jenis: "EWALLET" },
];

export const DAFTAR_INSTITUSI_KEUANGAN: InstitusiKeuangan[] = [
  INSTITUSI_TUNAI,
  ...BANKS,
  ...EWALLETS,
];

const byKode = new Map(DAFTAR_INSTITUSI_KEUANGAN.map((i) => [i.kode, i]));

export function getInstitusiKeuangan(kode: string): InstitusiKeuangan | undefined {
  return byKode.get(kode.trim().toLowerCase());
}

export function labelInstitusi(kode: string): string {
  return getInstitusiKeuangan(kode)?.nama ?? kode;
}

export function logoSlugInstitusi(kode: string): string | undefined {
  return getInstitusiKeuangan(kode)?.logoSlug;
}

export function parentAkunKodeUntukInstitusi(jenis: InstitusiJenis): "1100" | "1110" {
  return jenis === "TUNAI" ? "1100" : "1110";
}
