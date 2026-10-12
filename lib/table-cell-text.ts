import { cn } from "@/lib/utils";

/** Sel tabel: teks panjang dipotong; kode/teknis di detail. */
export const tableCellText = cn(
  "block max-w-[12rem] truncate text-sm sm:max-w-md",
);

export const tableCellMuted = cn(tableCellText, "text-muted-foreground");

export const tableCellMono = cn(
  "block max-w-[8rem] truncate font-mono text-xs sm:max-w-[10rem]",
);
