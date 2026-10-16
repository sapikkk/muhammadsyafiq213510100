import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "light" | "dark" | "auto";
  size?: number;
  className?: string;
  /** Alt teks untuk emblem saja (wordmark terpisah). */
  alt?: string;
};

/** Emblem dari Figma → Logo Design (`public/brand/`). */
export function KokonusBrandMark({
  variant = "auto",
  size = 28,
  className,
  alt = "Kokonus Farm",
}: Props) {
  const src =
    variant === "dark"
      ? "/brand/kokonus-emblem-dark.svg"
      : variant === "light"
        ? "/brand/kokonus-emblem-light.svg"
        : "/brand/kokonus-emblem-light.svg";

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
