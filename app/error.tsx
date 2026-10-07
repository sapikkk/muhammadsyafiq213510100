"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StateScreen } from "@/components/state-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StateScreen
      title="Gagal memuat halaman"
      description="Sambungan ke server bermasalah sebentar. Coba lagi."
    >
      <Button type="button" className="h-11" onClick={reset}>
        Coba lagi
      </Button>
    </StateScreen>
  );
}
