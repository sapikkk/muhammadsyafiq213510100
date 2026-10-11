import "server-only";

import { prisma } from "@/lib/prisma";

export type EntityAuditActor = {
  email: string;
  nama?: string;
};

export async function logEntityChange(input: {
  entitas: string;
  entitasId: number;
  aksi: "CREATE" | "UPDATE" | "STATUS" | "DELETE";
  ringkasan: string;
  detail?: Record<string, unknown>;
  actor?: EntityAuditActor | null;
}) {
  await prisma.riwayatPerubahan.create({
    data: {
      entitas: input.entitas,
      entitasId: input.entitasId,
      aksi: input.aksi,
      ringkasan: input.ringkasan.slice(0, 500),
      detailJson: input.detail ? JSON.stringify(input.detail) : null,
      userEmail: input.actor?.email ?? null,
      userNama: input.actor?.nama ?? null,
    },
  });
}

export async function listEntityChanges(entitas: string, entitasId: number, limit = 30) {
  return prisma.riwayatPerubahan.findMany({
    where: { entitas, entitasId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export function formatAuditWaktu(d: Date) {
  return waktu.format(d);
}
