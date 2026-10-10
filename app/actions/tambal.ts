"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  TambalError,
  catatTambalSusulan,
  parseTambalInput,
} from "@/lib/tambal-susulan";

type FormState = { error?: string; ok?: string };

export async function submitTambalSusulan(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "PEKERJA")) {
    return { error: "Hanya petani yang boleh tambal susulan." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const input = parseTambalInput(raw);
    await catatTambalSusulan(Number(session.user.id), input);
    revalidatePath(`/petani/siklus/${input.siklusId}`);
    revalidatePath("/petani");
    return { ok: "Tambal susulan tercatat." };
  } catch (err) {
    if (err instanceof TambalError) return { error: err.message };
    throw err;
  }
}
