import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { verifyAccessToken } from "../_shared/token.ts";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const secret = Deno.env.get("PROJECT_ACCESS_TOKEN_SECRET");
  if (!secret) return json({ error: "Server misconfigured" }, 500);

  let body: { slug?: string; token?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const accessToken = req.headers.get("x-project-access-token") ?? body.token ?? "";
  if (!slug) return json({ error: "Slug required" }, 400);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: settings } = await admin
    .from("project_access_settings")
    .select("enabled, password_version")
    .eq("id", 1)
    .maybeSingle();

  const protectionOn = !!settings?.enabled;

  if (protectionOn) {
    if (!accessToken) return json({ error: "unauthorized" }, 401);
    const payload = await verifyAccessToken(accessToken, secret);
    if (!payload) return json({ error: "invalid_token" }, 401);
    if (payload.pv !== settings!.password_version) return json({ error: "invalid_token" }, 401);
  }

  const { data: project, error } = await admin
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) return json({ error: "Service unavailable" }, 503);
  if (!project) return json({ error: "not_found" }, 404);

  return json({ project });
});
