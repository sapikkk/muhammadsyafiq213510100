"use client";

import { useEffect } from "react";

const RELOAD_ONCE_KEY = "kokonus-chunk-reload-once";

export function isChunkLoadFailure(reason: unknown): boolean {
  const message =
    reason instanceof Error
      ? `${reason.name} ${reason.message}`
      : typeof reason === "string"
        ? reason
        : "";
  return /Loading chunk \d+ failed/i.test(message) || /ChunkLoadError/i.test(message);
}

function tryReloadOnce(reason: unknown) {
  if (typeof window === "undefined" || !isChunkLoadFailure(reason)) return;
  if (sessionStorage.getItem(RELOAD_ONCE_KEY)) return;
  sessionStorage.setItem(RELOAD_ONCE_KEY, "1");
  window.location.reload();
}

/** Setelah deploy Vercel, tab lama bisa minta chunk JS yang sudah dihapus — muat ulang sekali otomatis. */
export function ChunkLoadRecovery() {
  useEffect(() => {
    sessionStorage.removeItem(RELOAD_ONCE_KEY);

    const onRejection = (event: PromiseRejectionEvent) => tryReloadOnce(event.reason);
    const onError = (event: ErrorEvent) => tryReloadOnce(event.error ?? event.message);

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
