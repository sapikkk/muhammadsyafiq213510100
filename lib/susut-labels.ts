export const kategoriSusutOptions = [
  { value: "NORMAL", label: "Susut normal (masuk HPP)" },
  { value: "ABNORMAL", label: "Susut abnormal (kerugian operasional)" },
] as const;

export type KategoriSusut = (typeof kategoriSusutOptions)[number]["value"];

const kategoriSusutByValue = Object.fromEntries(
  kategoriSusutOptions.map((o) => [o.value, o.label]),
) as Record<string, string>;

export function labelKategoriSusut(value: string): string {
  if (value === "MENUNGGU") return "Menunggu klasifikasi";
  return kategoriSusutByValue[value] ?? value;
}

export function labelJenisKerugian(value: string): string {
  if (value === "ALOKASI_HPP") return "Masuk HPP";
  if (value === "KERUGIAN_OPERASIONAL") return "Beban operasional";
  if (value === "MENUNGGU") return "Menunggu";
  return value;
}
