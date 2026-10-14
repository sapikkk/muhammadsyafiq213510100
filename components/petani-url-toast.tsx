"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { notify } from "@/lib/notify";

/** Toast dari query ?sukses= atau ?error= (petani & halaman lain). */
export function PetaniUrlToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sukses = searchParams.get("sukses");
    const error = searchParams.get("error");
    if (!sukses && !error) return;

    if (sukses) notify.success(decodeURIComponent(sukses));
    if (error) notify.error(decodeURIComponent(error));

    const next = new URLSearchParams(searchParams.toString());
    next.delete("sukses");
    next.delete("error");
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  return null;
}
