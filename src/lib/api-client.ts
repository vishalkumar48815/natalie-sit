import type { ApiResult } from "@/types";

/**
 * POST JSON with a timeout and normalised error handling, so forms always
 * get an ApiResult back (never an unhandled throw).
 */
export async function postJson<T = undefined>(url: string, body: unknown, timeoutMs = 12_000): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = (await res.json().catch(() => null)) as ApiResult<T> | null;
    if (data && typeof data.ok === "boolean") return data;
    return { ok: false, message: res.ok ? "Unexpected response from server." : `Request failed (${res.status}).` };
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    return {
      ok: false,
      message: timedOut ? "The request timed out. Please try again." : "Network error. Check your connection and try again.",
    };
  }
}
