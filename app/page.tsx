import Link from "next/link";
import { getServerSession } from "next-auth";
import { ProjectHub } from "@/components/project-hub";
import { PageCoachmark } from "@/components/page-coachmark";
import { PageHeaderRow } from "@/components/page-header-row";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { loadAgileProgress } from "@/lib/agile-progress";
import { HUB_TABS, loadProjectHubContent } from "@/lib/project-hub-content";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const progress = loadAgileProgress();
  const hub = loadProjectHubContent();
  const role = session?.user?.role as Role | undefined;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center bg-foreground">
            <span className="text-xs font-bold text-background">KF</span>
          </div>
          <span className="text-sm font-semibold">Kokonus Farm</span>
        </div>
        <div className="flex items-center gap-2">
          {role ? (
            <Button asChild size="sm" variant="secondary">
              <Link href={roleHome[role]}>Beranda aplikasi</Link>
            </Button>
          ) : null}
          <Button asChild size="sm">
            <Link href="/login">{role ? "Ganti akun" : "Masuk"}</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <PageHeaderRow
          title="Pusat dokumentasi & progress Kokonus Farm"
          guide={
            <PageCoachmark
              pageKey="home"
              title="Panduan halaman beranda"
              placement="toolbar"
              steps={[
                { label: "Tab di atas", detail: "Agile, Gantt, blackbox, UCD, deploy — dokumentasi sidang & PO." },
                { label: "Masuk aplikasi", detail: "Klik Masuk, lalu buka dashboard sesuai peran akun." },
              ]}
            />
          }
        />

        <div className="mt-8">
          <ProjectHub tabs={HUB_TABS} hub={hub} agile={progress} />
        </div>
      </section>
    </main>
  );
}
