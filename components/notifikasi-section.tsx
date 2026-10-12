import Link from "next/link";
import { Bell } from "lucide-react";
import {
  tandaiNotifikasiDibaca,
  tandaiSemuaNotifikasiDibaca,
} from "@/app/actions/notifikasi";
import { Button } from "@/components/ui/button";
import { listNotifikasi } from "@/lib/notifikasi";
import { cn } from "@/lib/utils";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export async function NotifikasiSection({ userId }: { userId: number }) {
  const rows = await listNotifikasi(userId);
  const unread = rows.filter((r) => !r.dibacaPada).length;

  return (
    <section aria-labelledby="notif-title" className="space-y-3" id="notifikasi">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="notif-title" className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-5 w-5" aria-hidden />
          Notifikasi
          {unread > 0 ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {unread} belum dibaca
            </span>
          ) : null}
        </h2>
        {unread > 0 ? (
          <form action={tandaiSemuaNotifikasiDibaca}>
            <Button type="submit" variant="outline" size="sm">
              Tandai semua dibaca
            </Button>
          </form>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Belum ada notifikasi.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => {
            const isUnread = !row.dibacaPada;
            const inner = (
              <>
                <p className="font-medium leading-snug">{row.judul}</p>
                <p className="mt-1 text-sm text-muted-foreground">{row.pesan}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {waktu.format(row.createdAt)}
                </p>
              </>
            );
            return (
              <li
                key={row.id}
                className={cn(
                  "rounded-md border p-4 text-sm",
                  isUnread && "border-primary/40 bg-primary/5",
                )}
              >
                <div className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    {row.href ? (
                      <Link
                        href={`/notifikasi/buka/${row.id}`}
                        className="block underline-offset-4 hover:underline"
                      >
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </div>
                  {isUnread ? (
                    <form action={tandaiNotifikasiDibaca}>
                      <input type="hidden" name="id" value={row.id} />
                      <Button type="submit" variant="ghost" size="sm" className="shrink-0">
                        Dibaca
                      </Button>
                    </form>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
