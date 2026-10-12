"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { tandaiDibaca, tandaiSemuaDibaca } from "@/lib/notifikasi";

export async function tandaiNotifikasiDibaca(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) return;

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await tandaiDibaca(id, userId);
  revalidatePath("/pengaturan");
}

export async function tandaiSemuaNotifikasiDibaca() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) return;

  await tandaiSemuaDibaca(userId);
  revalidatePath("/pengaturan");
}
