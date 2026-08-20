import { createClient } from "@supabase/supabase-js";

// Public fallback values for build environments that don't inject a .env file (e.g. Vercel).
const DEFAULT_SUPABASE_URL = "https://phsbpngyfobtieyekewp.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JMQ5V0ZTb1Pme0tX-wOSDQ_9QDOcdw8";

type DenoRuntime = {
  env: { get(name: string): string | undefined };
};

type PublicProjectIndexRow = {
  slug: string;
  title: string;
  company: string | null;
  role: string | null;
  timeline: string | null;
  category: string | null;
  short_description: string | null;
  featured: boolean;
};

const deno = (globalThis as typeof globalThis & { Deno?: DenoRuntime }).Deno;

// Runtime Supabase client. In the MCP edge function these are available via Deno.env.
// In the local Vite bundle, they come from import.meta.env.
const SUPABASE_URL =
  deno?.env.get("SUPABASE_URL") || import.meta.env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_KEY =
  deno?.env.get("SUPABASE_ANON_KEY") ||
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

export type ProjectSummary = {
  slug: string;
  title: string;
  company: string | null;
  role: string | null;
  timeline: string | null;
  category: string | null;
  summary: string | null;
  featured: boolean;
  url: string;
};

export async function fetchProjects(
  opts: { featuredOnly?: boolean } = {},
): Promise<ProjectSummary[]> {
  let q = sb
    .from("public_projects_index")
    .select("slug,title,company,role,timeline,category,short_description,featured")
    .order("sort_order");
  if (opts.featuredOnly) q = q.eq("featured", true);
  const { data, error } = await q;
  if (error) throw error;
  const projects = (data ?? []) as PublicProjectIndexRow[];
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    company: p.company,
    role: p.role,
    timeline: p.timeline,
    category: p.category,
    summary: p.short_description,
    featured: p.featured,
    url: `/projects/${p.slug}`,
  }));
}

export async function fetchSiteInfo() {
  const { data } = await sb.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data ?? {};
}

export async function fetchExperience() {
  const { data } = await sb
    .from("experience")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  return data ?? [];
}

export async function fetchSkills() {
  const { data } = await sb.from("skills").select("*").order("sort_order");
  const groups: Record<string, string[]> = {};
  for (const row of data ?? []) (groups[row.group_name] ??= []).push(row.name);
  return Object.entries(groups).map(([group, items]) => ({ group, items }));
}
