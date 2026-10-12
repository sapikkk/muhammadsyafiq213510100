"use client";

import { Logo } from "idn-finlogos/react";
import { Landmark, Wallet } from "lucide-react";
import type { InstitusiJenis } from "@/lib/indonesia-institusi-keuangan";

type Props = {
  /** Slug idn-finlogos (mis. `bca`, `dana`). */
  logoSlug?: string;
  jenis?: InstitusiJenis;
  className?: string;
  title?: string;
};

function sizeFromClassName(className: string): number {
  if (className.includes("h-4")) return 16;
  if (className.includes("h-8")) return 32;
  return 20;
}

export function InstitusiKeuanganIcon({
  logoSlug,
  jenis,
  className = "h-5 w-5 shrink-0",
  title,
}: Props) {
  if (logoSlug) {
    return (
      <Logo
        slug={logoSlug}
        size={sizeFromClassName(className)}
        title={title}
        className={className}
        aria-hidden={title ? undefined : true}
      />
    );
  }
  if (jenis === "TUNAI") {
    return <Wallet className={className} aria-hidden />;
  }
  return <Landmark className={className} aria-hidden />;
}
