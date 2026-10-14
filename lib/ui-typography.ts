import { cn } from "@/lib/utils";

/** Judul halaman daftar / CRUD (skala responsif, aman layar sempit). */
export const pageTitleClass = cn(
  "text-balance text-xl font-semibold leading-snug tracking-tight sm:text-2xl",
);

/** Judul section (PageSection, bento). */
export const sectionTitleClass = cn(
  "text-balance text-base font-semibold leading-snug tracking-tight sm:text-lg",
);

/** Judul detail (DetailLayout). */
export const detailTitleClass = cn(
  "text-balance text-lg font-semibold leading-snug tracking-tight sm:text-xl md:text-2xl",
);

/** Teks pendukung di bawah judul. */
export const pageLeadClass = "text-pretty text-sm leading-relaxed text-muted-foreground";

/** Wrapper konten utama — cegah overflow horizontal di viewport sempit. */
export const pageContentClass = "min-w-0 max-w-full [overflow-wrap:anywhere]";
