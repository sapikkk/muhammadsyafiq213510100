/** Parse error message from JSON API (new `{ ok, error }` or legacy `{ error: string }`). */
export function parseApiErrorMessage(data: unknown, fallback = "Permintaan gagal."): string {
  if (data && typeof data === "object") {
    const body = data as Record<string, unknown>;
    if (body.ok === false && body.error && typeof body.error === "object") {
      const err = body.error as { message?: string };
      if (err.message) return err.message;
    }
    if (typeof body.error === "string") return body.error;
  }
  return fallback;
}

export function isApiFailure(data: unknown, resOk: boolean): boolean {
  if (!resOk) return true;
  if (data && typeof data === "object" && (data as { ok?: boolean }).ok === false) {
    return true;
  }
  return false;
}
