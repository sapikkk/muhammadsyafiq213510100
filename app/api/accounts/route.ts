import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import {
  AkunError,
  createAkun,
  listAkun,
  parseAkunInput,
  setAkunAktif,
  updateAkun,
} from "@/lib/akun";
import type { Akun } from "@prisma/client";

function serializeAkun(row: Akun) {
  return {
    id: row.id,
    kode: row.kode,
    nama: row.nama,
    tipe: row.tipe,
    parentId: row.parentId,
    aktif: row.aktif,
    saldo: row.saldo.toString(),
  };
}

function handleError(error: unknown) {
  if (error instanceof AkunError) {
    return apiFail("AKUN_ERROR", error.message, error.status);
  }
  if (error instanceof SyntaxError) {
    return apiFail("INVALID_JSON", "Body bukan JSON.", 400);
  }
  throw error;
}

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const rows = await listAkun();
  return apiOk(rows.map(serializeAkun));
});

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const akun = await createAkun(parseAkunInput(await request.json()));
    return apiOk(serializeAkun(akun), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
});

export const PUT = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) {
      return apiFail("VALIDATION", "id wajib diisi.", 400);
    }
    if (typeof body.aktif === "boolean" && body.kode === undefined) {
      return apiOk(serializeAkun(await setAkunAktif(id, body.aktif)));
    }
    return apiOk(serializeAkun(await updateAkun(id, parseAkunInput(body))));
  } catch (error) {
    return handleError(error);
  }
});
