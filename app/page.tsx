import Link from "next/link";
import { getServerSession } from "next-auth";
import { ProjectHub } from "@/components/project-hub";
import { PageGuideFooter } from "@/components/page-guide-footer";
import { PageHeaderRow } from "@/components/page-header-row";
import { KokonusSidebarLogo } from "@/components/kokonus-sidebar-logo";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { loadAgileProgress } from "@/lib/agile-progress";
import { HUB_TABS, loadProjectHubContent } from "@/lib/project-hub-content";
import { loadGanttFromGit } from "@/lib/project-hub-gantt-git";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const progress = loadAgileProgress();
  const hub = loadProjectHubContent();
  const gantt = loadGanttFromGit();
  const role = session?.user?.role as Role | undefined;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <Link href="/" className="flex min-w-0 items-center">
          <KokonusSidebarLogo />
        </Link>
        <div className="flex items-center gap-2">
          {role ? (
            <Button asChild size="sm" variant="secondary">
              <Link href={roleHome[role]}>Beranda aplikasi</Link>
            </Button>
          ) : null}
          <Button asChild size="sm" className="shadow-none">
            <Link href="/login">{role ? "Ganti akun" : "Masuk"}</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <PageHeaderRow title="Pusat dokumentasi dan progress Kokonus Farm" />

        <div className="mt-8">
          <ProjectHub tabs={HUB_TABS} hub={hub} agile={progress} gantt={gantt} />
        </div>
        <PageGuideFooter />
      </section>
    </main>
  );
}
