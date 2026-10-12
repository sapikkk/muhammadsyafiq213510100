import { cn } from "@/lib/utils";

export function NotifikasiUnreadBadge({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count <= 0) return null;
  const label = count > 99 ? "99+" : String(count);
  return (
    <span
      className={cn(
        "inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground",
        className,
      )}
      aria-label={`${count} notifikasi belum dibaca`}
    >
      {label}
    </span>
  );
}
