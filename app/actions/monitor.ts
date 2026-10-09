"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  MonitorError,
  catatMonitorPertumbuhan,
  parseMonitorInput,
} from "@/lib/monitor-produksi";

type FormState = { error?: string; ok?: string };

export async function submitMonitorPertumbuhan(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (session.user.role !== "PEKERJA") {
    return { error: "Hanya petani yang boleh catat monitor." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const input = parseMonitorInput(raw);
    await catatMonitorPertumbuhan(Number(session.user.id), input);
    revalidatePath(`/petani/siklus/${input.siklusId}`);
    revalidatePath("/petani");
    return { ok: "Monitor pertumbuhan tercatat." };
  } catch (err) {
    if (err instanceof MonitorError) return { error: err.message };
    throw err;
  }
}
