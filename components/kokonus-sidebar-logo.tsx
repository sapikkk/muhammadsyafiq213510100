import Image from "next/image";
import { cn } from "@/lib/utils";

/** Wordmark sidebar — lebar penuh area logo, tidak terpotong. */
export function KokonusSidebarLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/kokonus-wordmark.png"
      alt="Kokonus Farm"
      width={200}
      height={28}
      className={cn("h-7 w-auto max-w-[calc(100%-0.25rem)] object-contain object-left", className)}
      priority
    />
  );
}
