import { FoundationPanel } from "@/components/foundation-panel";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Sprint 1 · US1.1</p>
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
