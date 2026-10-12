"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NotifikasiUnreadBadge } from "@/components/notifikasi-unread-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type InboxItem = {
  id: number;
  judul: string;
  pesan: string;
  dibaca: boolean;
  createdAt: string;
  targetHref: string;
};

function formatWaktu(iso: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function NotifikasiInboxPopover({
  initialUnreadCount = 0,
  className,
}: {
  initialUnreadCount?: number;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<InboxItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUnreadCount(initialUnreadCount);
  }, [initialUnreadCount]);

  const loadInbox = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifikasi/inbox?limit=30", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as {
        items?: InboxItem[];
        unreadCount?: number;
      };
      setItems(data.items ?? []);
      if (typeof data.unreadCount === "number") {
        setUnreadCount(data.unreadCount);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void loadInbox();
  }, [open, loadInbox]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const bukaItem = async (item: InboxItem) => {
    if (!item.dibaca) {
      await fetch(`/api/notifikasi/${item.id}/baca`, { method: "POST" });
      setUnreadCount((c) => Math.max(0, c - 1));
      setItems((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, dibaca: true } : row)),
      );
    }
    setOpen(false);
    router.push(item.targetHref);
    router.refresh();
  };

  const tandaiSemua = async () => {
    const { tandaiSemuaNotifikasiDibaca } = await import(
      "@/app/actions/notifikasi"
    );
    await tandaiSemuaNotifikasiDibaca();
    setUnreadCount(0);
    setItems((prev) => prev.map((row) => ({ ...row, dibaca: true })));
    router.refresh();
  };

  return (
    <div ref={panelRef} className={cn("relative", className)}>
      <button
        type="button"
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Notifikasi"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-4 w-4" />
        <NotifikasiUnreadBadge
          count={unreadCount}
          className="absolute -right-1 -top-1"
        />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-full z-50 mt-2 flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
          role="dialog"
          aria-label="Daftar notifikasi"
        >
          <div className="flex items-center justify-between border-b px-3 py-2">
            <p className="text-sm font-semibold">Notifikasi</p>
            {unreadCount > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => void tandaiSemua()}
              >
                Tandai semua dibaca
              </Button>
            ) : null}
          </div>
          <div className="max-h-80 overflow-y-auto overscroll-contain">
            {loading && items.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">Memuat…</p>
            ) : items.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                Belum ada notifikasi.
              </p>
            ) : (
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full flex-col gap-0.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                        !item.dibaca && "bg-muted/40",
                      )}
                      onClick={() => void bukaItem(item)}
                    >
                      <span className="font-medium leading-snug">{item.judul}</span>
                      <span className="line-clamp-2 text-xs text-muted-foreground">
                        {item.pesan}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {formatWaktu(item.createdAt)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t px-3 py-2">
            <Link
              href="/pengaturan"
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              Pengaturan akun
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
