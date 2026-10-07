"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LogoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="h-11">
          Keluar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keluar dari akun ini?</DialogTitle>
          <DialogDescription>
            Sesi akan ditutup. Untuk masuk lagi, isi email dan sandi.
          </DialogDescription>
        </DialogHeader>
        <Button
          type="button"
          className="h-11"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Keluar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
