import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
  if (claimsErr || !claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Verify admin role
  const { data: roleRow } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", claims.claims.sub)
    .eq("role", "admin")
    .maybeSingle();
  if (!roleRow) return json({ error: "Forbidden" }, 403);

  let body: { password?: string; enabled?: boolean; session_duration_hours?: number } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
    updated_by: claims.claims.sub,
  };

  if (typeof body.enabled === "boolean") patch.enabled = body.enabled;
  if (typeof body.session_duration_hours === "number" && [1, 8, 24, 72].includes(body.session_duration_hours)) {
    patch.session_duration_hours = body.session_duration_hours;
  }

  if (typeof body.password === "string" && body.password.length > 0) {
    if (body.password.length < 8) return json({ error: "Password must be at least 8 characters" }, 400);
    const bcrypt = await import("npm:bcryptjs@2.4.3");
    const hash = await bcrypt.default.hash(body.password, 10);
    patch.password_hash = hash;
    // Increment password_version to invalidate old tokens
    const { data: current } = await admin
      .from("project_access_settings")
      .select("password_version")
      .eq("id", 1)
      .maybeSingle();
    patch.password_version = (current?.password_version ?? 1) + 1;
  }

  const { error } = await admin.from("project_access_settings").update(patch).eq("id", 1);
  if (error) return json({ error: "Failed to update settings" }, 500);

  return json({ ok: true });
});
