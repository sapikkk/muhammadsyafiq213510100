"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { notify } from "@/lib/notify";

const POLL_MS =
  process.env.NODE_ENV === "development" ? 10_000 : 22_000;

type RecentItem = {
  id: number;
  judul: string;
  pesan: string;
  bukaHref: string;
};

/**
 * Toast mengambang untuk notifikasi baru (hanya setelah halaman dibuka).
 * Klik "Lihat" → tandai dibaca + halaman setara peran user.
 */
export function NotifikasiFloating() {
  const router = useRouter();
  const cursorRef = useRef(0);
  const readyRef = useRef(false);

  const poll = useCallback(async () => {
    if (!readyRef.current) return;
    try {
      const res = await fetch(
        `/api/notifikasi/recent?afterId=${cursorRef.current}`,
        { cache: "no-store" },
      );
      if (!res.ok) return;
      const data = (await res.json()) as {
        items?: RecentItem[];
        maxId?: number;
        unreadCount?: number;
      };
      const items = data.items ?? [];
      if (items.length) {
        for (const item of items) {
          notify.aktivitas(item.judul, item.pesan, item.bukaHref);
        }
        cursorRef.current = data.maxId ?? items[items.length - 1]!.id;
        router.refresh();
      }
    } catch {
      /* jaringan putus — coba lagi di poll berikutnya */
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    (async () => {
      try {
        const res = await fetch("/api/notifikasi/recent?baseline=1", {
          cache: "no-store",
        });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { maxId?: number };
        cursorRef.current = data.maxId ?? 0;
        readyRef.current = true;
        timer = setInterval(() => void poll(), POLL_MS);
      } catch {
        readyRef.current = true;
        timer = setInterval(() => void poll(), POLL_MS);
      }
    })();

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [poll]);

  return null;
}
