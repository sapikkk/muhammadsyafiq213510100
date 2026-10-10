import "server-only";

import { Prisma, type Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export class OwnerUserError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const assignableRoles: Role[] = ["ADMIN", "PEKERJA"];

export function listUsersForOwner() {
  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { nama: "asc" }],
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
      mustChangePassword: true,
    },
  });
}

function parseRole(raw: unknown): Role {
  const role = String(raw ?? "").trim().toUpperCase() as Role;
  if (!assignableRoles.includes(role)) {
    throw new OwnerUserError("Peran hanya boleh Admin atau Petani.", 400);
  }
  return role;
}

export async function createUserByOwner(raw: Record<string, unknown>) {
  const nama = String(raw.nama ?? "").trim();
  const email = String(raw.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(raw.password ?? "");
  const role = parseRole(raw.role);

  if (!nama || !email || !password) {
    throw new OwnerUserError("Isi nama, email, sandi awal, dan peran.", 400);
  }
  if (nama.length > 100) throw new OwnerUserError("Nama maksimal 100 karakter.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new OwnerUserError("Email tidak valid.", 400);
  }
  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new OwnerUserError("Sandi minimal 8 karakter, huruf dan angka.", 400);
  }

  try {
    return await prisma.user.create({
      data: {
        nama,
        email,
        passwordHash: await hash(password, 10),
        role,
        mustChangePassword: true,
      },
      select: { id: true, nama: true, email: true, role: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new OwnerUserError("Email sudah dipakai.", 409);
    }
    throw error;
  }
}

export async function resetPasswordByOwner(
  targetUserId: number,
  ownerId: number,
  raw: Record<string, unknown>,
) {
  const password = String(raw.password ?? "");
  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new OwnerUserError("Sandi baru minimal 8 karakter, huruf dan angka.", 400);
  }

  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) throw new OwnerUserError("User tidak ditemukan.", 404);
  if (target.role === "OWNER") {
    throw new OwnerUserError("Sandi Owner hanya diganti lewat pengaturan profil.", 403);
  }
  if (target.id === ownerId) {
    throw new OwnerUserError("Reset sandi sendiri lewat menu pengaturan.", 400);
  }

  return prisma.user.update({
    where: { id: targetUserId },
    data: {
      passwordHash: await hash(password, 10),
      mustChangePassword: true,
    },
    select: { id: true, nama: true, email: true, role: true },
  });
}
