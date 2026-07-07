import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";
import { projectGradient } from "@/lib/cms";
import { Tag } from "@/components/design/Tag";

export function ProjectCard({ project, index = 0 }: { project: ProjectRow; index?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.4 });

  const bg = project.thumbnail_url
    ? `center/cover no-repeat url(${project.thumbnail_url})`
    : projectGradient(project.slug);

  const tags = (project.tags ?? []).slice(0, 3);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block"
      aria-label={`${project.title} — case study${project.company ? ", " + project.company : ""}`}
      data-cursor="View case"
    >
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-[var(--color-card)] transition-all duration-500 group-hover:border-[var(--color-hairline-strong)] group-hover:shadow-[0_40px_100px_-40px_var(--color-accent-glow)]"
      >
        <motion.div
          aria-hidden
          style={{ y: reduce ? undefined : y, background: bg }}
          className="absolute -inset-6 transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Bottom gradient to seat text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.category && <Tag className="border-white/20 bg-black/40 text-white/85 backdrop-blur-sm">{project.category}</Tag>}
            </div>
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45"
            >
              <ArrowUpRight size={16} />
            </span>
          </div>

          <div className="text-white">
            {project.company && (
              <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
                {project.company}
                {project.timeline ? ` · ${project.timeline}` : ""}
              </p>
            )}
            <p className="mt-2 font-display text-2xl leading-tight md:text-3xl">
              {project.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Meta strip under card */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          {project.short_description && (
            <p className="text-[15px] text-[var(--color-muted)] line-clamp-2 max-w-xl">
              {project.short_description}
            </p>
          )}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-text)]">
          Read case
          <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
