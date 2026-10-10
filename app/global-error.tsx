"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight">Terjadi kesalahan</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Aplikasi mengalami masalah. Muat ulang halaman atau coba lagi.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center rounded-md border border-input bg-background px-4 text-sm font-medium"
          >
            Coba lagi
          </button>
        </div>
      </body>
    </html>
  );
}
