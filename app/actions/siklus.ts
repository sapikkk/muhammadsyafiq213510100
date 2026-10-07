"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  SiklusError,
  buatSiklusSemai,
  parseSiklusInput,
} from "@/lib/siklus-produksi";

type FormState = { error?: string; ok?: string };

export async function mulaiSiklusSemai(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "PEKERJA") {
      throw new SiklusError("Peran Anda tidak berhak.", 403);
    }
    const raw = Object.fromEntries(formData.entries());
    const siklus = await buatSiklusSemai(parseSiklusInput(raw));
    revalidatePath("/petani/siklus");
    return { ok: `Siklus ${siklus.kode_batch} tersimpan. Fase ${siklus.status}.` };
  } catch (error) {
    if (error instanceof SiklusError) return { error: error.message };
    throw error;
  }
}
