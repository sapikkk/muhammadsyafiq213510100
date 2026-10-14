import type { TipeAkunKey } from "@/lib/akun-tipe";

/** Judul kelompok neraca di layar (bahasa Indonesia). */
export const neracaKelompokLabel: Record<TipeAkunKey, string> = {
  ASET: "Aktiva",
  KEWAJIBAN: "Kewajiban",
  MODAL: "Ekuitas",
  PENDAPATAN: "Pendapatan",
  BEBAN: "Beban",
};

export const neracaUrutanAktivaPasiva: TipeAkunKey[] = ["ASET", "KEWAJIBAN", "MODAL"];

export const neracaUrutanLaba: TipeAkunKey[] = ["PENDAPATAN", "BEBAN"];
