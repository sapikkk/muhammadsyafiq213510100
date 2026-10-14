import { cn } from "@/lib/utils";

/** Sel tabel: teks panjang dipotong; kode/teknis di detail. */
export const tableCellText = cn(
  "block max-w-full truncate text-sm min-[220px]:max-w-[12rem] sm:max-w-md",
);

export const tableCellMuted = cn(tableCellText, "text-muted-foreground");

export const tableCellMono = cn(
  "block max-w-full truncate font-mono text-xs min-[220px]:max-w-[8rem] sm:max-w-[10rem]",
);
