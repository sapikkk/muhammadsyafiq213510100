import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { FoundationPanel } from "@/components/foundation-panel";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role) {
    redirect(roleHome[session.user.role as Role]);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center bg-foreground">
            <span className="text-[10px] font-bold text-background">KF</span>
          </div>
          <span className="text-sm font-semibold">Kokonus Farm</span>
        </div>
        <Button asChild size="sm">
          <Link href="/login">Masuk</Link>
        </Button>
      </header>

      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sistem manajemen
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Kokonus Farm</h1>
        <p className="mt-2 text-muted-foreground">
          Tata kelola biaya produksi hidroponik. Satu siklus, satu HPP, satu laba.
        </p>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-12">
        <FoundationPanel />
      </div>
    </main>
  );
}
