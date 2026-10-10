import type { ApiErrorBody, ApiSuccessBody } from "@/lib/api-response";

export class ApiClientError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) {
    throw new ApiClientError("EMPTY_BODY", "Respons server kosong.", res.status);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiClientError("INVALID_JSON", "Respons server tidak valid.", res.status);
  }
}

/** GET JSON API dengan kontrak `{ ok, data }` / `{ ok, error }`. */
export async function apiGet<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    method: init?.method ?? "GET",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });
  const body = await parseJson<ApiSuccessBody<T> | ApiErrorBody>(res);
  if (!body.ok) {
    throw new ApiClientError(
      body.error.code,
      body.error.message,
      res.status,
      body.error.fields,
    );
  }
  return body.data;
}
