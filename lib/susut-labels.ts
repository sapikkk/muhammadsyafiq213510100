export const kategoriSusutOptions = [
  { value: "NORMAL", label: "Susut normal (masuk HPP)" },
  { value: "ABNORMAL", label: "Susut abnormal (kerugian operasional)" },
] as const;

export type KategoriSusut = (typeof kategoriSusutOptions)[number]["value"];
