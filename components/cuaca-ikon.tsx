import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function CuacaIkon({
  kode,
  className,
}: {
  kode: number;
  className?: string;
}) {
  const cls = cn("shrink-0 text-foreground", className);
  if (kode === 0 || kode === 1) return <Sun className={cls} aria-hidden />;
  if (kode >= 61 && kode <= 65) return <CloudRain className={cls} aria-hidden />;
  if (kode === 2 || kode === 3) return <Cloud className={cls} aria-hidden />;
  return <CloudSun className={cls} aria-hidden />;
}
