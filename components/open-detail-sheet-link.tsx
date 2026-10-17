"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Navigasi detail — prefetch + scroll false agar intercept `@detail` sheet lebih cepat. */
export function OpenDetailSheetLink({
  href,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  return (
    <Link href={href} scroll={false} prefetch {...rest}>
      {children}
    </Link>
  );
}
