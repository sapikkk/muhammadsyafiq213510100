"use server";

import { randomBytes } from "crypto";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type RequestState = { sent?: boolean; error?: string };
export type ApproveState = {
  tempPassword?: string;
  nama?: string;
  email?: string;
  error?: string;
};
export type ChangeState = { ok?: boolean; error?: string };

export async function requestPasswordReset(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return { error: "Isi email akun Anda." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const pending = await prisma.passwordResetRequest.findFirst({
      where: { userId: user.id, status: "PENDING" },
    });
    if (!pending) {
      await prisma.passwordResetRequest.create({ data: { userId: user.id } });
    }
  }
  // Jawaban sama untuk email terdaftar atau tidak, supaya daftar akun tidak bocor.
  return { sent: true };
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return null;
  return Number(session.user.id);
}

export async function approvePasswordReset(
  _prev: ApproveState,
  formData: FormData,
): Promise<ApproveState> {
  const adminId = await requireAdmin();
  if (!adminId)
    return { error: "Hanya Admin yang bisa menyetujui reset sandi." };

  const id = Number(formData.get("id"));
  const request = await prisma.passwordResetRequest.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!request || request.status !== "PENDING") {
    return { error: "Permintaan ini sudah diproses atau tidak ada." };
  }
  if (request.userId === adminId) {
    return {
      error: "Admin tidak bisa menyetujui permintaan untuk akunnya sendiri.",
    };
  }

  const tempPassword = randomBytes(9).toString("base64url");
  await prisma.$transaction([
    prisma.user.update({
      where: { id: request.userId },
      data: {
        passwordHash: await hash(tempPassword, 10),
        mustChangePassword: true,
      },
    }),
    prisma.passwordResetRequest.update({
      where: { id },
      data: { status: "APPROVED", handledById: adminId, handledAt: new Date() },
    }),
  ]);

  revalidatePath("/admin");
  return { tempPassword, nama: request.user.nama, email: request.user.email };
}

export async function rejectPasswordReset(formData: FormData) {
  const adminId = await requireAdmin();
  if (!adminId) return;

  const id = Number(formData.get("id"));
  await prisma.passwordResetRequest.updateMany({
    where: { id, status: "PENDING", NOT: { userId: adminId } },
    data: { status: "REJECTED", handledById: adminId, handledAt: new Date() },
  });
  revalidatePath("/admin");
}

export async function changePassword(
  _prev: ChangeState,
  formData: FormData,
): Promise<ChangeState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Sesi habis. Masuk lagi." };

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return { error: "Sandi baru minimal 8 karakter, berisi huruf dan angka." };
  }
  if (password !== confirm)
    return { error: "Ulangi sandi baru dengan sama persis." };

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
  });
  if (!user) return { error: "Akun tidak ditemukan. Masuk lagi." };
  if (await compare(password, user.passwordHash)) {
    return { error: "Sandi baru harus berbeda dari sandi sementara." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hash(password, 10), mustChangePassword: false },
  });
  return { ok: true };
}
