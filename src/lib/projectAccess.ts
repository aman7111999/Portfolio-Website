import { supabase } from "@/integrations/supabase/client";
import type { ProjectRow } from "@/lib/cms";

const TOKEN_KEY = "portfolio_project_access_token";
const EXP_KEY = "portfolio_project_access_expires";

export function getStoredAccessToken(): string | null {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const exp = Number(sessionStorage.getItem(EXP_KEY) ?? 0);
    if (!token || !exp) return null;
    if (Date.now() >= exp) {
      clearAccessToken();
      return null;
    }
    return token;
  } catch {
    return null;
  }
}

export function storeAccessToken(token: string, expiresAt: number) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXP_KEY, String(expiresAt));
  } catch {
    /* ignore */
  }
}

export function clearAccessToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXP_KEY);
  } catch {
    /* ignore */
  }
}

export type AccessStatus = {
  enabled: boolean;
  configured: boolean;
  session_duration_hours: number;
  password_version: number;
  updated_at: string | null;
};

export async function fetchAccessStatus(): Promise<AccessStatus | null> {
  const { data, error } = await supabase.rpc("get_project_access_status");
  if (error) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return (row as AccessStatus) ?? null;
}

export async function verifyPassword(
  password: string,
): Promise<
  | { ok: true; token: string; expiresAt: number; disabled?: boolean }
  | { ok: false; error: "invalid_password" | "rate_limited" | "not_configured" | "network" }
> {
  try {
    const { data, error } = await supabase.rpc("verify_project_password", {
      _password: password,
    });
    if (error || !data) return { ok: false, error: "network" };
    const result = data as {
      token?: string;
      expires_at?: number;
      disabled?: boolean;
      error?: string;
    };
    if (result.error === "rate_limited") return { ok: false, error: "rate_limited" };
    if (result.error === "invalid_password") return { ok: false, error: "invalid_password" };
    if (result.error === "not_configured") return { ok: false, error: "not_configured" };
    if (!result.token || !result.expires_at) return { ok: false, error: "network" };
    return {
      ok: true,
      token: result.token,
      expiresAt: result.expires_at,
      disabled: result.disabled,
    };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function fetchProtectedProject(
  slug: string,
): Promise<
  { ok: true; project: ProjectRow } | { ok: false; error: "unauthorized" | "not_found" | "network" }
> {
  const token = getStoredAccessToken();
  try {
    const { data, error } = await supabase.rpc("get_protected_project", {
      _slug: slug,
      _token: token,
    });
    if (error || !data) return { ok: false, error: "network" };
    const result = data as { project?: ProjectRow; error?: string };
    if (result.error === "unauthorized") return { ok: false, error: "unauthorized" };
    if (result.error === "not_found") return { ok: false, error: "not_found" };
    if (!result.project) return { ok: false, error: "network" };
    return { ok: true, project: result.project };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function setProjectPassword(input: {
  password?: string;
  enabled?: boolean;
  session_duration_hours?: number;
}): Promise<{ ok: boolean; error?: string }> {
  const { data, error } = await supabase.rpc("set_project_password", {
    _password: input.password ?? null,
    _enabled: input.enabled ?? null,
    _session_duration_hours: input.session_duration_hours ?? null,
  });
  if (error) return { ok: false, error: error.message };
  const result = data as { ok?: boolean; error?: string } | null;
  return result?.ok ? { ok: true } : { ok: false, error: result?.error ?? "Failed to update" };
}
