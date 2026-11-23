"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mulaiSemaiPetaniSingkat } from "@/lib/petani-semai-singkat";
import { SiklusError } from "@/lib/siklus-produksi";

type FormState = { error?: string; ok?: string };

export async function submitSemaiPetaniSingkat(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? Number(session.user.id) : null;
    if (session?.user?.role !== "PEKERJA" || !userId) {
      throw new SiklusError("Hanya petani yang boleh mulai semai.", 403);
    }
    const raw = Object.fromEntries(formData.entries());
    await mulaiSemaiPetaniSingkat(raw, userId);
    revalidatePath("/petani");
    revalidatePath("/petani/kolam");
    revalidatePath("/petani/siklus");
    return { ok: "Semai tersimpan. Paket benih dan media dipotong otomatis." };
  } catch (error) {
    if (error instanceof SiklusError) return { error: error.message };
    throw error;
  }
}
