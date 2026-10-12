"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  MonitorKolamError,
  catatMonitorKolam,
  parseMonitorKolamInput,
} from "@/lib/monitor-kolam";

type FormState = { error?: string; ok?: string };

export async function submitMonitorKolam(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (session?.user?.role !== "PEKERJA" || !userId) {
    return { error: "Hanya petani yang boleh catat monitor kolam." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const input = parseMonitorKolamInput(raw);
    await catatMonitorKolam(userId, input);
    revalidatePath("/petani");
    revalidatePath("/petani/siklus");
    revalidatePath(`/petani/siklus/${input.siklusId}`);
    return { ok: "Monitor kolam tersimpan." };
  } catch (err) {
    if (err instanceof MonitorKolamError) return { error: err.message };
    throw err;
  }
}
