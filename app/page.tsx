import Link from "next/link";
import { FoundationPanel } from "@/components/foundation-panel";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-primary">Sprint 1 · US1.4</p>
          <Link
            href="/login"
            className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Masuk
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Kokonus Farm</h1>
        <p className="text-muted-foreground">
          Tata kelola biaya produksi hidroponik. Satu siklus, satu HPP, satu
          laba.
        </p>
      </header>
      <FoundationPanel />
    </main>
  );
}
