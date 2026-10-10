/** Kode COA v2 — selaras blueprint §7 & skill akuntansi-hidroponik. */
export const AKUN_KODE = {
  KAS: "1100",
  BANK: "1110",
  PIUTANG: "1200",
  PERSEDIAAN_SAYUR: "1350",
  WIP: "1360",
  UANG_MUKA: "2200",
  MODAL: "3100",
  PRIVE: "3200",
  PENDAPATAN_CURAH: "4100",
  PENDAPATAN_PACK: "4200",
  HPP: "5100",
  KERUGIAN_SUSUT: "5300",
  BEBAN_OPERASIONAL: "5230",
} as const;

export type AkunKode = (typeof AKUN_KODE)[keyof typeof AKUN_KODE];
