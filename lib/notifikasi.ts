import "server-only";

import type { Role } from "@/types/role";
import { prisma } from "@/lib/prisma";

export type NotifikasiPayload = {
  jenis: string;
  judul: string;
  pesan: string;
  href?: string;
  entitas?: string;
  entitasId?: number;
};

export async function userIdsForRoles(roles: Role[]): Promise<number[]> {
  const rows = await prisma.user.findMany({
    where: { role: { in: roles }, aktif: true },
    select: { id: true },
  });
  return rows.map((r) => r.id);
}

export async function kirimNotifikasi(
  userIds: number[],
  payload: NotifikasiPayload,
  opts?: { excludeUserId?: number; dedupeUnread?: boolean },
) {
  let targets = userIds;
  if (opts?.excludeUserId) {
    targets = targets.filter((id) => id !== opts.excludeUserId);
  }
  if (!targets.length) return;

  if (opts?.dedupeUnread && payload.entitas && payload.entitasId != null) {
    const existing = await prisma.notifikasi.findMany({
      where: {
        userId: { in: targets },
        jenis: payload.jenis,
        entitas: payload.entitas,
        entitasId: payload.entitasId,
        dibacaPada: null,
      },
      select: { userId: true },
    });
    const skip = new Set(existing.map((e) => e.userId));
    targets = targets.filter((id) => !skip.has(id));
    if (!targets.length) return;
  }

  await prisma.notifikasi.createMany({
    data: targets.map((userId) => ({
      userId,
      jenis: payload.jenis,
      judul: payload.judul.slice(0, 200),
      pesan: payload.pesan.slice(0, 500),
      href: payload.href?.slice(0, 255) ?? null,
      entitas: payload.entitas ?? null,
      entitasId: payload.entitasId ?? null,
    })),
  });
}

export async function kirimNotifikasiPeran(
  roles: Role[],
  payload: NotifikasiPayload,
  opts?: { excludeUserId?: number; dedupeUnread?: boolean },
) {
  const ids = await userIdsForRoles(roles);
  await kirimNotifikasi(ids, payload, opts);
}

export async function kirimNotifikasiUser(userId: number, payload: NotifikasiPayload) {
  await kirimNotifikasi([userId], payload);
}

export async function countNotifikasiBelumDibaca(userId: number) {
  return prisma.notifikasi.count({
    where: { userId, dibacaPada: null },
  });
}

export async function listNotifikasi(userId: number, limit = 40) {
  return prisma.notifikasi.findMany({
    where: { userId },
    orderBy: [
      { dibacaPada: { sort: "asc", nulls: "first" } },
      { createdAt: "desc" },
    ],
    take: limit,
  });
}

export async function tandaiDibaca(id: number, userId: number) {
  await prisma.notifikasi.updateMany({
    where: { id, userId, dibacaPada: null },
    data: { dibacaPada: new Date() },
  });
}

export async function tandaiSemuaDibaca(userId: number) {
  await prisma.notifikasi.updateMany({
    where: { userId, dibacaPada: null },
    data: { dibacaPada: new Date() },
  });
}
