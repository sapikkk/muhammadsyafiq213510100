import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  /** Terang = hijau gelap di latar terang; gelap = putih di hero gelap. */
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

/** Wordmark PNG dari Figma (Logo Design). */
export function KokonusBrandWordmark({
  variant = "light",
  className,
  priority,
}: Props) {
  const src =
    variant === "dark"
      ? "/brand/kokonus-wordmark-dark.png"
      : "/brand/kokonus-wordmark-light.png";

  return (
    <Image
      src={src}
      alt="Kokonus Farm"
      width={variant === "dark" ? 280 : 260}
      height={40}
      className={cn("h-8 w-auto max-w-[min(100%,16rem)] object-contain object-left", className)}
      priority={priority}
    />
  );
}
