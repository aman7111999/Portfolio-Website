import type { ComponentType } from "react";
import site from "../../content/site.json";
import experience from "../../content/experience.json";
import skills from "../../content/skills.json";
import testimonials from "../../content/testimonials.json";

export type Metric = { label: string; value: string; hint?: string };
export type SectionRef = { id: string; label: string };

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  company: string;
  role: string;
  duration: string;
  category: string;
  cover: string;
  summary: string;
  team: string[];
  timeline: string;
  constraints: string[];
  metrics: Metric[];
  sections?: SectionRef[];
  featured?: boolean;
  order?: number;
};

export type Project = ProjectFrontmatter & {
  Body: ComponentType<Record<string, unknown>>;
};

type MdxModule = {
  default: ComponentType<Record<string, unknown>>;
  frontmatter: ProjectFrontmatter;
};

// Eagerly load every project's index.mdx at build time.
const projectFiles = import.meta.glob<MdxModule>(
  "../../content/projects/*/index.mdx",
  { eager: true },
);

export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, mod]) => {
    // Fallback slug from folder name
    const folderMatch = path.match(/\/projects\/([^/]+)\/index\.mdx$/);
    const folderSlug = folderMatch?.[1];
    const fm = mod.frontmatter;
    if (!fm) {
      throw new Error(`MDX file missing frontmatter: ${path}`);
    }
    return {
      ...fm,
      slug: fm.slug ?? folderSlug ?? "",
      Body: mod.default,
    };
  })
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

// About page MDX (single file)
const aboutModule = import.meta.glob<MdxModule>("../../content/about.mdx", {
  eager: true,
});
const aboutEntry = Object.values(aboutModule)[0];
export const About: ComponentType<Record<string, unknown>> | null =
  aboutEntry?.default ?? null;
export const aboutFrontmatter = aboutEntry?.frontmatter ?? {};

export { site, experience, skills, testimonials };
export type Experience = (typeof experience)[number];
export type Skill = (typeof skills)[number];
export type Testimonial = (typeof testimonials)[number];
