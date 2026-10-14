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
    notify.error("Gagal memuat halaman. Silakan coba lagi.");
  }, [error]);

  return (
    <StateScreen
      title="Gagal memuat halaman"
      description="Terjadi kesalahan saat memuat halaman. Gunakan tombol di bawah untuk mencoba lagi."
    >
      <Button type="button" className="h-11" onClick={reset}>
        Coba lagi
      </Button>
    </StateScreen>
  );
}
