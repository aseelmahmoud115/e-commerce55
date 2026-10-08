import { getMyToken } from "./getMyToken.utilites";

export interface ApiResult<T> {
  ok: boolean;
  message: string;
  data: T | null;
}

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  version?: "v1" | "v2";
};

function baseUrl(version: "v1" | "v2") {
  const base = process.env.BASE_URL ?? "https://ecommerce.routemisr.com/api/v1";
  return version === "v2" ? base.replace(/\/v1$/, "/v2") : base;
}

function extractMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const p = payload as Record<string, unknown>;
    const errors = p.errors as { msg?: string } | undefined;
    if (errors?.msg) return errors.msg;
    if (typeof p.message === "string" && p.message !== "fail") return p.message;
  }
  return fallback;
}

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, auth = true, version = "v1" }: Options = {},
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = {};

  if (auth) {
    const token = await getMyToken();
    if (!token) {
      return { ok: false, message: "Please login first", data: null };
    }
    headers.token = token;
  }
  if (body !== undefined) headers["content-type"] = "application/json";

  try {
    const response = await fetch(`${baseUrl(version)}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: extractMessage(payload, "Something went wrong, please try again"),
        data: payload as T,
      };
    }
    return {
      ok: true,
      message: extractMessage(payload, "success"),
      data: payload as T,
    };
  } catch {
    return {
      ok: false,
      message: "Network error, please check your connection",
      data: null,
    };
  }
}
