import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number, className?: string) {
  return cn("shrink-0 text-current", className);
}

/** Monokrom, garis tunggal — selaras Figma agritech (bukan emoji warna). */
export function GlyphLettuce({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <path d="M12 3c-3 2-5 5-5 9a5 5 0 0 0 10 0c0-4-2-7-5-9Z" />
      <path d="M12 12v9" />
      <path d="M8 16h8" />
    </svg>
  );
}

export function GlyphBasil({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <path d="M12 21V11" />
      <path d="M12 11C12 6 8 3 5 5c2 1 3 3 3 6" />
      <path d="M12 11c0-5 4-8 7-6-2 1-3 3-3 6" />
      <path d="M12 14c-2 0-3 1-3 3" />
      <path d="M12 14c2 0 3 1 3 3" />
    </svg>
  );
}

export function GlyphTomato({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="14" r="7" />
      <path d="M9 7c0-2 1-4 3-4s3 2 3 4" />
      <path d="M8 7h8" />
    </svg>
  );
}

export function GlyphCarrot({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <path d="M12 21V9" />
      <path d="M12 9 8 5" />
      <path d="M12 9l4-4" />
      <path d="M10 13h4" />
      <path d="M9 17h6" />
    </svg>
  );
}

export function GlyphPepper({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <path d="M12 21c4-2 6-6 6-11 0-3-2-5-4-5-1 0-2 1-2 2" />
      <path d="M12 21C8 19 6 15 6 10c0-3 2-5 4-5 1 0 2 1 2 2" />
      <path d="M12 3v2" />
    </svg>
  );
}

export function GlyphLeaf({ size = 20, className, ...props }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base(size, className)}
      aria-hidden
      {...props}
    >
      <path d="M12 21c-5-3-8-8-8-14 4 0 8 2 8 6 0-4 4-6 8-6 0 6-3 11-8 14Z" />
      <path d="M12 21V9" />
    </svg>
  );
}

export type AgritechGlyphKey =
  | "lettuce"
  | "basil"
  | "tomato"
  | "carrot"
  | "pepper"
  | "leaf";

const GLYPHS: Record<AgritechGlyphKey, typeof GlyphLeaf> = {
  lettuce: GlyphLettuce,
  basil: GlyphBasil,
  tomato: GlyphTomato,
  carrot: GlyphCarrot,
  pepper: GlyphPepper,
  leaf: GlyphLeaf,
};

export function AgritechGlyph({
  name,
  size = 20,
  className,
}: {
  name: AgritechGlyphKey;
  size?: number;
  className?: string;
}) {
  const Comp = GLYPHS[name] ?? GlyphLeaf;
  return <Comp size={size} className={className} />;
}
