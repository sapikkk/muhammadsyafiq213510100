"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { ChunkLoadRecovery } from "@/components/chunk-load-recovery";
import { NetworkStatus } from "@/components/network-status";
import { Toaster } from "@/components/ui/sonner";
import { UiThemeProvider } from "@/components/ui-theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UiThemeProvider>
      <ChunkLoadRecovery />
      {children}
      <NetworkStatus />
      <Toaster />
      </UiThemeProvider>
    </SessionProvider>
  );
}
