"use client";

import { useEffect, useRef } from "react";
import { notify } from "@/lib/notify";

/** Toast saat browser offline / kembali online. */
export function NetworkStatus() {
  const wasOffline = useRef(false);

  useEffect(() => {
    const onOffline = () => {
      wasOffline.current = true;
      notify.error("Anda offline. Perubahan mungkin tidak tersimpan.");
    };
    const onOnline = () => {
      if (wasOffline.current) {
        notify.success("Koneksi kembali.");
        wasOffline.current = false;
      }
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      onOffline();
    }

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return null;
}
