// Build-time content loader for MCP tools. `import.meta.glob` is transformed
// by Vite into inline literals when the mcp-js plugin bundles this module for
// the Deno edge function, so no filesystem I/O runs at cold start.
import matter from "gray-matter";
import site from "../../../content/site.json";
import experienceFile from "../../../content/experience.json";
import skillsFile from "../../../content/skills.json";

const rawProjects = import.meta.glob("../../../content/projects/*/index.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export type ProjectSummary = {
  slug: string;
  title: string;
  company: string;
  role: string;
  duration: string;
  timeline: string;
  category: string;
  summary: string;
  featured: boolean;
  order: number;
  metrics: Array<{ label: string; value: string }>;
  team: string[];
  constraints: string[];
  url: string;
};

export type ProjectFull = ProjectSummary & { body: string };

function slugFromPath(path: string) {
  return path.match(/\/projects\/([^/]+)\/index\.mdx$/)?.[1] ?? "";
}

const parsed = Object.entries(rawProjects).map(([path, raw]) => {
  const { data, content } = matter(raw);
  const slug = (data.slug as string) ?? slugFromPath(path);
  return {
    slug,
    title: (data.title as string) ?? slug,
    company: (data.company as string) ?? "",
    role: (data.role as string) ?? "",
    duration: (data.duration as string) ?? "",
    timeline: (data.timeline as string) ?? "",
    category: (data.category as string) ?? "",
    summary: (data.summary as string) ?? "",
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 99,
    metrics: Array.isArray(data.metrics) ? data.metrics : [],
    team: Array.isArray(data.team) ? data.team : [],
    constraints: Array.isArray(data.constraints) ? data.constraints : [],
    url: `https://amanmishra.design/projects/${slug}`,
    body: content.trim(),
  } as ProjectFull;
});

export const projects: ProjectFull[] = parsed.sort((a, b) => a.order - b.order);

export function toSummary(p: ProjectFull): ProjectSummary {
  const { body, ...rest } = p;
  void body;
  return rest;
}

export const siteInfo = site;
export const experience = experienceFile.roles;
export const skills = skillsFile.groups;
