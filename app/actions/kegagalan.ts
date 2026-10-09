"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  KegagalanError,
  catatLogKegagalan,
  parseKegagalanInput,
} from "@/lib/log-kegagalan";

type FormState = { error?: string; ok?: string };

export async function submitLogKegagalan(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (session.user.role !== "PEKERJA") {
    return { error: "Hanya petani yang boleh catat kegagalan." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const input = parseKegagalanInput(raw);
    await catatLogKegagalan(input);
    revalidatePath(`/petani/siklus/${input.siklusId}`);
    revalidatePath("/admin/susut");
    return { ok: "Kegagalan tercatat." };
  } catch (err) {
    if (err instanceof KegagalanError) return { error: err.message };
    throw err;
  }
}
