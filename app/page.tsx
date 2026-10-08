import Link from "next/link";
import { FoundationPanel } from "@/components/foundation-panel";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground">
            <span className="text-[10px] font-bold text-background">KF</span>
          </div>
          <span className="text-sm font-semibold">Kokonus Farm</span>
        </div>
        <Button asChild size="sm">
          <Link href="/login">Masuk</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sistem manajemen
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Kokonus Farm
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tata kelola biaya produksi hidroponik. Satu siklus, satu HPP, satu
          laba.
        </p>
      </section>

      {/* Foundation panel */}
      <div className="mx-auto w-full max-w-3xl px-6 pb-12">
        <FoundationPanel />
      </div>
    </main>
  );
}
