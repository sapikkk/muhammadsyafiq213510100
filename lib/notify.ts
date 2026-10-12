"use client";

import { toast } from "sonner";

export const notify = {
  success(message: string, description?: string) {
    toast.success(message, { description });
  },
  error(message: string, description?: string) {
    toast.error(message, { description });
  },
  info(message: string, description?: string) {
    toast(message, { description });
  },
  warning(message: string, description?: string) {
    toast.warning(message, { description });
  },
  promise<T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) {
    return toast.promise(promise, messages);
  },
  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
  /** Notifikasi aktivitas — Lihat langsung ke halaman terkait (bukan pengaturan). */
  aktivitas(
    judul: string,
    pesan: string,
    targetHref: string,
    notifikasiId?: number,
  ) {
    toast(judul, {
      description: pesan,
      duration: 14_000,
      action: {
        label: "Lihat",
        onClick: () => {
          void (async () => {
            if (notifikasiId != null) {
              await fetch(`/api/notifikasi/${notifikasiId}/baca`, {
                method: "POST",
              });
            }
            window.location.assign(targetHref);
          })();
        },
      },
    });
  },
};
