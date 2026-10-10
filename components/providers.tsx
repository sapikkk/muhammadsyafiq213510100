"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { NetworkStatus } from "@/components/network-status";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <NetworkStatus />
      <Toaster />
    </SessionProvider>
  );
}
