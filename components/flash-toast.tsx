"use client";

import { useEffect } from "react";
import { notify } from "@/lib/notify";

export function FlashToast({ message }: { message?: string }) {
  useEffect(() => {
    if (message) notify.success(message);
  }, [message]);
  return null;
}
