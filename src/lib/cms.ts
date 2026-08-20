import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  PORTFOLIO_CONTENT,
  PORTFOLIO_EDUCATION,
  PORTFOLIO_EXPERIENCE,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SITE,
  PORTFOLIO_SKILLS,
} from "@/data/portfolio";
import type { ProjectPresentation } from "@/lib/projectPresentation";

const CONTENT_REVISION = Date.parse("2026-08-20T00:00:00.000Z");

function isReviewed(updatedAt?: string | null) {
  return updatedAt ? Date.parse(updatedAt) >= CONTENT_REVISION : false;
}

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  overview: string | null;
  problem_statement: string | null;
  research: string | null;
  design_process: string | null;
  solution: string | null;
  outcome: string | null;
  learnings: string | null;
  role: string | null;
  duration: string | null;
  company: string | null;
  tools: string[];
  tags: string[];
  category: string | null;
  timeline: string | null;
  thumbnail_url: string | null;
  presentation: ProjectPresentation;
  gallery: { url: string; caption?: string }[];
  links: { label: string; url: string }[];
  metrics: { label: string; value: string; hint?: string }[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  name: string | null;
  tagline: string | null;
  bio: string | null;
  email: string | null;
  location: string | null;
  profile_image_url: string | null;
  resume_url: string | null;
  socials: { label: string; url: string }[];
  updated_at?: string;
};

export function canonicalizeProject<T extends { slug?: string | null; updated_at?: string | null }>(
  project: T,
): T {
  const local = PORTFOLIO_PROJECTS.find((item) => item.slug === project.slug);
  const source = local && !isReviewed(project.updated_at) ? { ...project, ...local } : project;
  const normalized = { ...source } as Record<string, unknown>;
  const copyFields = [
    "title",
    "short_description",
    "overview",
    "problem_statement",
    "research",
    "design_process",
    "solution",
    "outcome",
    "learnings",
  ];
  for (const field of copyFields) {
    if (typeof normalized[field] === "string") {
      normalized[field] = (normalized[field] as string).replaceAll("Riise", "RIISE");
    }
  }
  if (normalized.slug === "portfolio-analysis" && "links" in normalized) {
    normalized.links = [];
  }
  return normalized as T;
}

// ─────────────────────── Editable content blocks ───────────────────────
export type ContentKey =
  | "nav"
  | "footer"
  | "hero"
  | "home_featured"
  | "home_experience"
  | "home_stats"
  | "home_testimonials"
  | "home_faq"
  | "home_cta"
  | "about_hero"
  | "about_timeline"
  | "about_experience"
  | "about_education"
  | "about_tools"
  | "about_philosophy"
  | "about_working_style"
  | "about_books"
  | "about_values"
  | "about_fun_facts"
  | "contact_page"
  | "resume_page"
  | "project_access_content";

export function useContent<T = unknown>(key: ContentKey, fallback?: T) {
  const q = useQuery({
    queryKey: ["content_block", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("data,updated_at")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return data as { data: T; updated_at: string } | null;
    },
  });
  const local = (PORTFOLIO_CONTENT as Partial<Record<ContentKey, unknown>>)[key] as T | undefined;
  const reviewed = q.data && isReviewed(q.data.updated_at) ? q.data.data : null;
  return { ...q, data: (reviewed ?? local ?? fallback ?? q.data?.data ?? null) as T };
}

export function useAllContent() {
  return useQuery({
    queryKey: ["content_blocks_all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content_blocks").select("*");
      if (error) throw error;
      const map: Record<string, unknown> = {};
      for (const row of data ?? []) {
        const local = (PORTFOLIO_CONTENT as Record<string, unknown>)[row.key];
        map[row.key] = isReviewed(row.updated_at) ? row.data : (local ?? row.data);
      }
      return { ...PORTFOLIO_CONTENT, ...map };
    },
  });
}

export function useSite() {
  const q = useQuery({
    queryKey: ["site"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("name,tagline,bio,email,location,profile_image_url,resume_url,socials,updated_at")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
  });
  return {
    ...q,
    data: q.data && isReviewed(q.data.updated_at) ? q.data : (PORTFOLIO_SITE as SiteSettings),
  };
}

/**
 * Public project list. Uses the `public_projects_index` view which only exposes
 * preview fields (title, category, thumbnail, short description, tags). Full
 * case-study content is served through the `get-protected-project` edge function
 * after password verification.
 */
export function useProjects(
  opts: { publishedOnly?: boolean; featuredOnly?: boolean; admin?: boolean } = {},
) {
  const q = useQuery({
    queryKey: ["projects", opts],
    queryFn: async () => {
      if (opts.admin) {
        let q = supabase.from("projects").select("*").order("sort_order", { ascending: true });
        if (opts.publishedOnly) q = q.eq("published", true);
        if (opts.featuredOnly) q = q.eq("featured", true);
        const { data, error } = await q;
        if (error) throw error;
        return (data ?? []).map((project) =>
          canonicalizeProject(project),
        ) as unknown as ProjectRow[];
      }
      let q = supabase
        .from("public_projects_index")
        .select("*")
        .order("sort_order", { ascending: true });
      if (opts.featuredOnly) q = q.eq("featured", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []).map((project) => canonicalizeProject(project)) as unknown as ProjectRow[];
    },
  });

  if (opts.admin) return q;

  let fallbackProjects = [...PORTFOLIO_PROJECTS] as unknown as ProjectRow[];
  if (opts.publishedOnly) fallbackProjects = fallbackProjects.filter((p) => p.published);
  if (opts.featuredOnly) fallbackProjects = fallbackProjects.filter((p) => p.featured);
  fallbackProjects.sort((a, b) => a.sort_order - b.sort_order);

  return { ...q, data: q.data?.map((project) => canonicalizeProject(project)) ?? fallbackProjects };
}

/** Admin-only: fetch full project row directly (requires admin auth). */
export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project-admin", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as ProjectRow | null;
    },
    enabled: !!slug,
  });
}

export function useExperience() {
  const q = useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  const localById = new Map(PORTFOLIO_EXPERIENCE.map((row) => [row.id, row]));
  const reviewed = q.data?.map((row) =>
    isReviewed(row.updated_at) ? row : (localById.get(row.id) ?? row),
  );
  return { ...q, data: reviewed ?? PORTFOLIO_EXPERIENCE };
}

export function useEducation() {
  const q = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  const localById = new Map(PORTFOLIO_EDUCATION.map((row) => [row.id, row]));
  const reviewed = q.data?.map((row) =>
    isReviewed(row.updated_at) ? row : (localById.get(row.id) ?? row),
  );
  return { ...q, data: reviewed ?? PORTFOLIO_EDUCATION };
}

export function useSkills() {
  const q = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("group_name,name,sort_order,updated_at")
        .order("sort_order", { ascending: true });
      if (error) throw error;

      const groups = new Map<string, string[]>();
      for (const row of data ?? []) {
        const items = groups.get(row.group_name) ?? [];
        items.push(row.name);
        groups.set(row.group_name, items);
      }
      return {
        groups: Array.from(groups, ([group, items]) => ({ group, items })),
        reviewed: (data ?? []).some((row) => isReviewed(row.updated_at)),
      };
    },
  });
  return { ...q, data: q.data?.reviewed ? q.data.groups : PORTFOLIO_SKILLS };
}

export function useTestimonials() {
  const q = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  return { ...q, data: q.data ?? [] };
}

export function useBlogs(publishedOnly = true) {
  return useQuery({
    queryKey: ["blogs", publishedOnly],
    queryFn: async () => {
      let q = supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false });
      if (publishedOnly) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });
}

// Storage: create a long-lived signed URL. Buckets are private per workspace policy.
export async function signedUrl(bucket: string, path: string, expiresIn = 60 * 60 * 24 * 365) {
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}

export async function uploadFile(bucket: string, file: File, prefix = "") {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${prefix}${prefix ? "/" : ""}${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const url = await signedUrl(bucket, path);
  return { path, url: url ?? "" };
}

// Fallback gradient for projects without a thumbnail
export const projectGradient = (seed: string) => {
  const gradients = [
    // Warm sand → clay
    "radial-gradient(120% 100% at 12% 8%, #F5EFE3 0%, #D8C4A5 45%, #8A6B47 100%)",
    // Terracotta → rust
    "linear-gradient(135deg, #F2D7C4 0%, #C97B5A 55%, #6B2E1F 100%)",
    // Sage → forest
    "radial-gradient(130% 100% at 78% 18%, #E3EBE0 0%, #9AB3A2 45%, #2F4A3F 100%)",
    // Indigo → deep navy
    "linear-gradient(155deg, #E4E1EE 0%, #7C7CAE 50%, #1F2247 100%)",
    // Ochre → oxblood
    "radial-gradient(120% 100% at 25% 85%, #F0DDB5 0%, #C89A4A 45%, #5B2A1E 100%)",
    // Slate → charcoal
    "linear-gradient(140deg, #E8E6E0 0%, #7A7B78 50%, #1A1A1A 100%)",
    // Mauve → plum
    "radial-gradient(120% 100% at 68% 25%, #F0E4EA 0%, #B58AA0 45%, #4A2540 100%)",
    // Ink teal
    "linear-gradient(145deg, #DCE7E6 0%, #4E7A78 55%, #123032 100%)",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
};
