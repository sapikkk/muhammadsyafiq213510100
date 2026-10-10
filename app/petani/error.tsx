"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StateScreen } from "@/components/state-screen";
import { notify } from "@/lib/notify";

export default function PetaniError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    notify.error("Gagal memuat halaman Petani.", error.message);
  }, [error]);

  return (
    <StateScreen
      title="Gagal memuat halaman"
      description="Terjadi kesalahan di area Petani. Coba lagi."
    >
      <Button type="button" className="h-11" onClick={reset}>
        Coba lagi
      </Button>
    </StateScreen>
  );
}
