"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import type { LandingBagian } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { isLandingBagian, type LandingBagianId } from "@/lib/landing-bagian";
import { getLandingKontenForEdit, listLandingKartuAll, nextUrutan } from "@/lib/landing";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import { isRoleAllowed } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

type FormState = { error?: string; ok?: string };

class LandingError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function requireLandingWrite() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new LandingError("Belum masuk.", 401);
  if (!isRoleAllowed(session.user.role, ["ADMIN", "OWNER"])) {
    throw new LandingError("Hanya admin atau owner.", 403);
  }
  return session;
}

function toState(error: unknown): FormState {
  if (error instanceof LandingError) return { error: error.message };
  throw error;
}

function revalidateLanding() {
  revalidatePath("/");
  revalidatePath("/pengaturan");
}

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function optionalStr(formData: FormData, key: string): string | null {
  const s = str(formData, key);
  return s.length ? s : null;
}

export async function saveLandingKonten(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await requireLandingWrite();
    await getLandingKontenForEdit();

    const data = {
      heroJudul: str(formData, "heroJudul"),
      heroLead: str(formData, "heroLead"),
      heroCta: str(formData, "heroCta"),
      heroGambarLatar: str(formData, "heroGambarLatar"),
      heroGambarPratinjau: str(formData, "heroGambarPratinjau"),
      athleteJudul: str(formData, "athleteJudul"),
      athleteTeks: str(formData, "athleteTeks"),
      athleteGambar: str(formData, "athleteGambar"),
      verificationJudul: str(formData, "verificationJudul"),
      footerJudul: str(formData, "footerJudul"),
      footerTeks: str(formData, "footerTeks"),
      fundraisingStat: str(formData, "fundraisingStat"),
      fundraisingCatatan: str(formData, "fundraisingCatatan"),
      fundraisingJudulGelap: str(formData, "fundraisingJudulGelap"),
      fundraisingTeksGelap: str(formData, "fundraisingTeksGelap"),
      fundraisingTombol: str(formData, "fundraisingTombol"),
      fundraisingGambarGelap: str(formData, "fundraisingGambarGelap"),
    };

    if (!data.heroJudul || !data.heroGambarLatar) {
      return { error: "Judul hero dan gambar latar wajib." };
    }

    await prisma.landing_Konten.update({ where: { id: 1 }, data });
    await logEntityChange({
      entitas: "Landing_Konten",
      entitasId: 1,
      aksi: "UPDATE",
      ringkasan: "Teks landing diperbarui",
      actor: actorFromSession(session),
    });
    revalidateLanding();
    return { ok: "Teks landing disimpan." };
  } catch (e) {
    return toState(e);
  }
}

export async function saveLandingKartu(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await requireLandingWrite();
    const idRaw = str(formData, "id");
    const bagianRaw = str(formData, "bagian");
    if (!isLandingBagian(bagianRaw)) return { error: "Bagian tidak dikenali." };

    const judul = str(formData, "judul");
    const gambar = str(formData, "gambar");
    if (!gambar) return { error: "Alamat gambar wajib." };

    const payload = {
      bagian: bagianRaw as LandingBagian,
      judul: judul || "—",
      meta: optionalStr(formData, "meta"),
      teks: optionalStr(formData, "teks"),
      label: optionalStr(formData, "label"),
      gambar,
      aktif: formData.get("aktif") === "on" || formData.get("aktif") === "true",
    };

    if (idRaw) {
      const id = Number(idRaw);
      if (!Number.isFinite(id)) return { error: "ID kartu tidak valid." };
      await prisma.landing_Kartu.update({ where: { id }, data: payload });
      await logEntityChange({
        entitas: "Landing_Kartu",
        entitasId: id,
        aksi: "UPDATE",
        ringkasan: `Kartu landing ${bagianRaw}: ${payload.judul}`,
        actor: actorFromSession(session),
      });
    } else {
      const siblings = await listLandingKartuAll(bagianRaw);
      const created = await prisma.landing_Kartu.create({
        data: { ...payload, urutan: nextUrutan(siblings) },
      });
      await logEntityChange({
        entitas: "Landing_Kartu",
        entitasId: created.id,
        aksi: "CREATE",
        ringkasan: `Kartu landing baru ${bagianRaw}`,
        actor: actorFromSession(session),
      });
    }

    revalidateLanding();
    return { ok: "Kartu disimpan." };
  } catch (e) {
    return toState(e);
  }
}

export async function deleteLandingKartu(formData: FormData): Promise<FormState> {
  try {
    const session = await requireLandingWrite();
    const id = Number(str(formData, "id"));
    if (!Number.isFinite(id)) return { error: "ID tidak valid." };
    await prisma.landing_Kartu.delete({ where: { id } });
    await logEntityChange({
      entitas: "Landing_Kartu",
      entitasId: id,
      aksi: "DELETE",
      ringkasan: "Kartu landing dihapus",
      actor: actorFromSession(session),
    });
    revalidateLanding();
    return { ok: "Kartu dihapus." };
  } catch (e) {
    return toState(e);
  }
}

export async function moveLandingKartu(formData: FormData): Promise<FormState> {
  try {
    await requireLandingWrite();
    const id = Number(str(formData, "id"));
    const dir = str(formData, "dir");
    if (!Number.isFinite(id) || (dir !== "up" && dir !== "down")) {
      return { error: "Permintaan urutan tidak valid." };
    }
    const row = await prisma.landing_Kartu.findUnique({ where: { id } });
    if (!row) return { error: "Kartu tidak ditemukan." };

    const siblings = await prisma.landing_Kartu.findMany({
      where: { bagian: row.bagian },
      orderBy: { urutan: "asc" },
    });
    const idx = siblings.findIndex((s) => s.id === id);
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return { ok: "Urutan sudah di ujung." };

    const a = siblings[idx];
    const b = siblings[swapIdx];
    await prisma.$transaction([
      prisma.landing_Kartu.update({ where: { id: a.id }, data: { urutan: b.urutan } }),
      prisma.landing_Kartu.update({ where: { id: b.id }, data: { urutan: a.urutan } }),
    ]);
    revalidateLanding();
    return { ok: "Urutan diubah." };
  } catch (e) {
    return toState(e);
  }
}
