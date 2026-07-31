import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";

export function ProjectCard({
  project,
  index = 0,
  size = "md",
}: {
  project: ProjectRow;
  index?: number;
  size?: "lg" | "md";
}) {
  const reduce = useReducedMotion();
  const locked = !!(project as { locked?: boolean }).locked;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`${project.title} — case study`}
        className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[var(--elevation-2)]"
      >
        <div
          className={`relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-elevated)] ${
            size === "lg" ? "aspect-[16/10]" : "aspect-[16/9]"
          }`}
        >
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--color-accent) 11%, var(--color-elevated)), var(--color-surface))",
              }}
            >
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] md:inset-x-8 md:top-8">
                <span>{project.company ?? "Product design"}</span>
                <span>{project.timeline ?? number}</span>
              </div>
              <span className="absolute bottom-[-0.12em] right-5 font-serif text-[clamp(7rem,17vw,13rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] md:right-8">
                {number}
              </span>
              <div className="absolute bottom-7 left-6 max-w-[14rem] md:bottom-8 md:left-8">
                <span className="eyebrow text-[var(--color-accent)]">
                  {project.category ?? "Case study"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Case study {number}</p>
              <h3 className="mt-3 text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.12] tracking-[-0.03em]">
                {project.title}
              </h3>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-text)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
              <ArrowUpRight size={16} />
            </span>
          </div>

          {project.short_description && (
            <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.65] text-[var(--color-muted)] md:text-[15px]">
              {project.short_description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 pt-7 text-[12px] text-[var(--color-subtle)]">
            <span>{project.role?.split("·")[0]?.trim() ?? "Product design"}</span>
            {locked && (
              <span className="inline-flex items-center gap-1.5">
                <Lock size={11} /> Under NDA
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
