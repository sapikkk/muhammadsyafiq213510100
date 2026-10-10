import Link from "next/link";
import { getServerSession } from "next-auth";
import { AgileProgressDashboard } from "@/components/agile-progress-dashboard";
import { FoundationPanel } from "@/components/foundation-panel";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { loadAgileProgress } from "@/lib/agile-progress";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const progress = loadAgileProgress();
  const role = session?.user?.role as Role | undefined;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center bg-foreground">
            <span className="text-[10px] font-bold text-background">KF</span>
          </div>
          <span className="text-sm font-semibold">Kokonus Farm</span>
        </div>
        <div className="flex items-center gap-2">
          {role ? (
            <Button asChild size="sm" variant="secondary">
              <Link href={roleHome[role]}>Dashboard aplikasi</Link>
            </Button>
          ) : null}
          <Button asChild size="sm">
            <Link href="/login">{role ? "Ganti akun" : "Masuk"}</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Progres proyek
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Kokonus Farm</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Tata kelola biaya produksi hidroponik. Ringkasan agile live dari GitHub Project —
          semua kartu sprint, status, dan riwayat waktu kerja (WIB).
        </p>

        <div className="mt-10">
          <AgileProgressDashboard data={progress} />
        </div>

        <div className="mt-16 border-t pt-10">
          <FoundationPanel />
        </div>
      </section>
    </main>
  );
}
