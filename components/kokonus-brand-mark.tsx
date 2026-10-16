import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "light" | "dark" | "auto";
  /** `icon` = daun saja tanpa latar (sidebar, favicon). `lockup` = ekspor Figma penuh (arsip). */
  mark?: "icon" | "lockup";
  size?: number;
  className?: string;
  /** Alt teks untuk emblem saja (wordmark terpisah). */
  alt?: string;
};

/** Emblem dari Figma → Logo Design (`public/brand/`). */
export function KokonusBrandMark({
  variant = "auto",
  mark = "icon",
  size = 28,
  className,
  alt = "Kokonus Farm",
}: Props) {
  const src =
    mark === "icon"
      ? "/brand/kokonus-icon.svg"
      : variant === "dark"
        ? "/brand/kokonus-emblem-dark.svg"
        : "/brand/kokonus-emblem-light.svg";

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 bg-transparent", className)}
      priority
    />
  );
}
