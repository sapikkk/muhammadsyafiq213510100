"use client";

import { useEffect } from "react";
import { notify } from "@/lib/notify";
import { pesanErrorUntukLayar } from "@/lib/pesan-ui";

type ActionFeedback = {
  error?: string;
  ok?: boolean | string;
  saved?: string;
  message?: string;
};

export function useActionToast(state: ActionFeedback) {
  useEffect(() => {
    if (state.error) notify.error(pesanErrorUntukLayar(state.error));
    if (typeof state.ok === "string") notify.success(state.ok);
    else if (state.ok === true) notify.success(state.message ?? "Berhasil disimpan.");
    else if (state.saved) notify.success(state.saved);
    else if (state.message && !state.error) notify.success(state.message);
  }, [state.error, state.ok, state.saved, state.message]);
}
