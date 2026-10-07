"use server";

import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type RegisterState = {
  nama?: string;
  email?: string;
  error?: string;
};

// ponytail: satu ulang pada P2024. Pool Prisma Postgres sering habis di dev server.
async function retryIfPoolBusy(
  error: unknown,
  retry: () => Promise<unknown>,
): Promise<RegisterState | null> {
  const first =
    error instanceof Prisma.PrismaClientKnownRequestError ? error : null;
  if (first?.code === "P2002") return { error: "Email ini sudah dipakai." };
  if (first?.code !== "P2024") throw error;

  try {
    await retry();
    return null;
  } catch (retryError) {
    const second =
      retryError instanceof Prisma.PrismaClientKnownRequestError
        ? retryError
        : null;
    if (second?.code === "P2002") return { error: "Email ini sudah dipakai." };
    if (second?.code === "P2024") {
      return { error: "Database sedang sibuk. Coba simpan lagi." };
    }
    throw retryError;
  }
}

export async function registerPetani(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return { error: "Hanya Admin yang bisa mendaftarkan petani." };
  }

  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!nama || !email || !password) {
    return { error: "Isi nama, email, dan sandi awal." };
  }
  if (nama.length > 100) return { error: "Nama maksimal 100 karakter." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Isi email yang valid." };
  }
  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return { error: "Sandi awal minimal 8 karakter, berisi huruf dan angka." };
  }

  const data = {
    nama,
    email,
    passwordHash: await hash(password, 10),
    role: "PEKERJA" as const,
    mustChangePassword: true,
  };

  try {
    await prisma.user.create({ data });
  } catch (error) {
    const busy = await retryIfPoolBusy(error, () =>
      prisma.user.create({ data }),
    );
    if (busy) return busy;
  }

  revalidatePath("/admin");
  revalidatePath("/owner");
  return { nama, email };
}
