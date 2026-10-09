"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { StateScreen } from "@/components/state-screen";
import { notify } from "@/lib/notify";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { data: session } = useSession();
  const role = session?.user?.role as Role | undefined;
  const homeHref = role ? roleHome[role] : "/login";

  useEffect(() => {
    notify.error("Gagal memuat halaman.", error.message);
  }, [error]);

  return (
    <StateScreen
      title="Gagal memuat halaman"
      description="Sambungan ke server bermasalah sebentar. Coba lagi."
    >
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Button type="button" className="h-11" onClick={reset}>
          Coba lagi
        </Button>
        <Link
          href={homeHref}
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium"
        >
          {role ? "Ke dashboard" : "Ke halaman masuk"}
        </Link>
      </div>
    </StateScreen>
  );
}
