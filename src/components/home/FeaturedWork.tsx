import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useContent, useProjects } from "@/lib/cms";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

type Data = {
  eyebrow: string;
  heading_line1: string;
  heading_line2: string;
  view_all_label: string;
  view_all_to: string;
};

const FALLBACK: Data = {
  eyebrow: "Selected work",
  heading_line1: "Complex product work,",
  heading_line2: "explained with clarity.",
  view_all_label: "View all work",
  view_all_to: "/work",
};

export function FeaturedWork() {
  const { data: projects } = useProjects({ publishedOnly: true });
  const { data: content } = useContent<Data>("home_featured", FALLBACK);
  const allProjects = projects ?? [];
  const items = allProjects.slice(0, 4);
  const copy = content ?? FALLBACK;

  return (
    <section className="border-t border-[var(--color-hairline)] py-16 sm:py-20 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2.15rem,10vw,2.6rem)] leading-[1.05] tracking-[-0.04em] sm:text-[clamp(2.5rem,4.8vw,4.25rem)] sm:leading-[1.02] sm:tracking-[-0.045em]">
                {copy.heading_line1}{" "}
                <span className="font-serif font-normal italic text-[var(--color-accent)]">
                  {copy.heading_line2}
                </span>
              </h2>
            </div>
            <Link
              to={copy.view_all_to}
              className="story-link inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold"
            >
              {copy.view_all_label} <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {items.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} size="compact" />
          ))}
          {items.length === 0 && <p className="text-[var(--color-muted)]">No projects yet.</p>}
        </div>
      </div>
    </section>
  );
}
