"use client";

import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Role } from "@/types/role";
import { roleLabel } from "@/types/role";

export function AppShellLayout({
  role,
  userName,
  stokRendahCount = 0,
  auditShowAllNav = false,
  children,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
  auditShowAllNav?: boolean;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden shrink-0 md:flex">
        <AppSidebar
          role={role}
          userName={userName}
          stokRendahCount={stokRendahCount}
          auditShowAllNav={auditShowAllNav}
        />
      </div>

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
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
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{roleLabel[role]}</p>
            <h1 className="truncate text-sm font-semibold leading-tight">{userName}</h1>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
        </div>
      </main>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="fixed left-0 top-0 flex h-full w-[min(100%,15rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 border-r p-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <DialogTitle className="sr-only">Menu navigasi</DialogTitle>
          <AppSidebar
            role={role}
            userName={userName}
            stokRendahCount={stokRendahCount}
            auditShowAllNav={auditShowAllNav}
            onNavigate={() => setMenuOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
