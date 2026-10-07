"use server";

import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ProfileState = { ok?: boolean; error?: string };
export type PasswordState = { ok?: boolean; error?: string };

async function currentUserId() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  return id ? Number(id) : null;
}

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const id = await currentUserId();
  if (!id) return { error: "Sesi habis. Masuk lagi." };

  const nama = String(formData.get("nama") ?? "").trim();
  if (!nama) return { error: "Isi nama Anda." };
  if (nama.length > 100) return { error: "Nama maksimal 100 karakter." };

  await prisma.user.update({ where: { id }, data: { nama } });
  revalidatePath("/pengaturan");
  return { ok: true };
}

export async function changeOwnPassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const id = await currentUserId();
  if (!id) return { error: "Sesi habis. Masuk lagi." };

  const current = String(formData.get("current") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return { error: "Sandi baru minimal 8 karakter, berisi huruf dan angka." };
  }
  if (password !== confirm) {
    return { error: "Ulangi sandi baru dengan sama persis." };
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return { error: "Akun tidak ditemukan. Masuk lagi." };
  if (!(await compare(current, user.passwordHash))) {
    return { error: "Sandi lama tidak cocok." };
  }
  if (await compare(password, user.passwordHash)) {
    return { error: "Sandi baru harus berbeda dari sandi lama." };
  }

  await prisma.user.update({
    where: { id },
    data: { passwordHash: await hash(password, 10), mustChangePassword: false },
  });
  return { ok: true };
}
