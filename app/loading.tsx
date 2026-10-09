import { SessionShell } from "@/components/session-shell";

export default function Loading() {
  return (
    <SessionShell>
      <div aria-busy="true" className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">Memuat…</p>
      </div>
    </SessionShell>
  );
}
