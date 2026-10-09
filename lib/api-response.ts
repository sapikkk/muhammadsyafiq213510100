import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export type ApiErrorBody = {
  ok: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
};

export type ApiSuccessBody<T> = {
  ok: true;
  data: T;
};

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data } satisfies ApiSuccessBody<T>, init);
}

export function apiFail(
  code: string,
  message: string,
  status: number,
  fields?: Record<string, string>,
) {
  return NextResponse.json(
    {
      ok: false,
      error: { code, message, fields },
    } satisfies ApiErrorBody,
    { status },
  );
}

export function withApiHandler(
  handler: (request: Request, context?: unknown) => Promise<Response>,
) {
  return async (request: Request, context?: unknown) => {
    try {
      return await handler(request, context);
    } catch (error) {
      logger.error("API handler error", error);
      return apiFail("INTERNAL_ERROR", "Terjadi kesalahan server.", 500);
    }
  };
}
