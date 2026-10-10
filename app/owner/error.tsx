"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StateScreen } from "@/components/state-screen";
import { notify } from "@/lib/notify";

export default function OwnerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    notify.error("Gagal memuat halaman Owner.", error.message);
  }, [error]);

  return (
    <StateScreen
      title="Gagal memuat halaman"
      description="Terjadi kesalahan di area Owner. Coba lagi."
    >
      <Button type="button" className="h-11" onClick={reset}>
        Coba lagi
      </Button>
    </StateScreen>
  );
}
