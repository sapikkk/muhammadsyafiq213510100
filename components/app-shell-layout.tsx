"use client";

import { Menu } from "lucide-react";
import { Suspense, useState, type ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { NotifikasiFloating } from "@/components/notifikasi-floating";
import type { Role } from "@/types/role";
import { roleLabel } from "@/types/role";
import { NotifikasiInboxPopover } from "@/components/notifikasi-inbox-popover";
import { PageGuideFooter } from "@/components/page-guide-footer";

export function AppShellLayout({
  role,
  userName,
  stokRendahCount = 0,
  notifikasiUnreadCount = 0,
  auditShowAllNav = false,
  children,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
  notifikasiUnreadCount?: number;
  auditShowAllNav?: boolean;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <NotifikasiFloating />
      <div className="hidden shrink-0 md:flex">
        <Suspense fallback={<div className="h-screen w-64 border-r bg-sidebar" aria-hidden />}>
          <AppSidebar
            role={role}
            userName={userName}
            stokRendahCount={stokRendahCount}
            notifikasiUnreadCount={notifikasiUnreadCount}
            auditShowAllNav={auditShowAllNav}
          />
        </Suspense>
      </div>

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex h-12 min-[220px]:h-14 shrink-0 items-center gap-2 min-[220px]:gap-3 border-b bg-background px-2 min-[220px]:px-4 md:px-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Buka menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{roleLabel[role]}</p>
            <h1 className="truncate text-sm font-semibold leading-snug min-[220px]:text-base">
              {userName}
            </h1>
          </div>
          <NotifikasiInboxPopover initialUnreadCount={notifikasiUnreadCount} />
        </header>

        <div className="flex-1 p-2 min-[220px]:p-4 md:p-8">
          <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 min-[220px]:gap-6">
            {children}
            <PageGuideFooter />
          </div>
        </div>
      </main>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="fixed left-0 top-0 flex h-full w-[min(100%,15rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 border-r p-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <DialogTitle className="sr-only">Menu navigasi</DialogTitle>
          <Suspense fallback={null}>
            <AppSidebar
              role={role}
              userName={userName}
              stokRendahCount={stokRendahCount}
              notifikasiUnreadCount={notifikasiUnreadCount}
              auditShowAllNav={auditShowAllNav}
              onNavigate={() => setMenuOpen(false)}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </div>
  );
}
