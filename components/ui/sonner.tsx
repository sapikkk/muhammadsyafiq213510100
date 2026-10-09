"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast border border-foreground bg-background text-foreground rounded-none shadow-none",
          title: "text-sm font-medium",
          description: "text-sm text-muted-foreground",
          actionButton: "border border-foreground bg-foreground text-background",
          cancelButton: "border border-border bg-background",
          success: "border-foreground",
          error: "border-foreground",
          warning: "border-foreground",
          info: "border-foreground",
        },
      }}
    />
  );
}
