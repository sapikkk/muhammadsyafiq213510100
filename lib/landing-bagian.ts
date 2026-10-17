/** Bagian landing — selaras enum Prisma `LandingBagian`. */

export const LANDING_BAGIAN = [
  "HERO_STACK",
  "FACILITIES",
  "FUNDRAISING",
  "ROLES",
  "SPORTS_FEATURE",
  "ATHLETE",
  "VERIFICATION",
  "FOOTER",
  "TENTANG",
  "EMBED",
] as const;

export type LandingBagianId = (typeof LANDING_BAGIAN)[number];

export const LANDING_BAGIAN_LABEL: Record<LandingBagianId, string> = {
  HERO_STACK: "Hero — kartu tumpuk",
  FACILITIES: "Modul fasilitas",
  FUNDRAISING: "Kartu fundraising",
  ROLES: "Peran (petani · admin · owner)",
  SPORTS_FEATURE: "Fitur kebun",
  ATHLETE: "Tim & pengalaman",
  VERIFICATION: "Stat verifikasi",
  FOOTER: "Footer",
  TENTANG: "Tentang kami (halaman /tentang)",
  EMBED: "Stok kartu sosmed (embed)",
};

export function isLandingBagian(raw: string): raw is LandingBagianId {
  return (LANDING_BAGIAN as readonly string[]).includes(raw);
}
