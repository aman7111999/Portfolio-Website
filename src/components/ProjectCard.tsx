import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";
import { PortfolioAnalysisVisual } from "@/components/case/PortfolioAnalysisStory";

export function ProjectCard({
  project,
  index = 0,
  size = "md",
}: {
  project: ProjectRow;
  index?: number;
  size?: "lg" | "md" | "compact";
}) {
  const reduce = useReducedMotion();
  const locked = !!(project as { locked?: boolean }).locked;
  const number = String(index + 1).padStart(2, "0");
  const compact = size === "compact";
  const visualIndex = index % 4;
  const signalPaths = [
    "M4 126C52 126 60 54 112 54S174 112 220 112 284 36 354 36",
    "M4 46C58 46 72 132 126 132S194 72 242 72 292 126 354 126",
    "M4 112C64 112 72 28 138 28S208 142 270 142 312 72 354 72",
    "M4 142C70 142 72 82 132 82S196 28 246 28 290 104 354 104",
  ];
  const signalNodes = [
    [
      { x: 112, y: 54 },
      { x: 220, y: 112 },
      { x: 354, y: 36 },
    ],
    [
      { x: 126, y: 132 },
      { x: 242, y: 72 },
      { x: 354, y: 126 },
    ],
    [
      { x: 138, y: 28 },
      { x: 270, y: 142 },
      { x: 354, y: 72 },
    ],
    [
      { x: 132, y: 82 },
      { x: 246, y: 28 },
      { x: 354, y: 104 },
    ],
  ];
  const orbitPositions = [
    "bottom-9 left-[32%]",
    "bottom-11 left-[46%]",
    "bottom-7 left-[24%]",
    "bottom-12 left-[39%]",
  ];
  const nodes = signalNodes[visualIndex];

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
          className={`project-visual relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-elevated)] ${
            size === "lg" ? "aspect-[16/10]" : compact ? "aspect-[2/1]" : "aspect-[16/9]"
          }`}
        >
          {project.slug === "portfolio-analysis" ? (
            <PortfolioAnalysisVisual mode="card" />
          ) : project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden
              className="system-frame absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--color-accent) 11%, var(--color-elevated)), var(--color-surface))",
              }}
            >
              <div aria-hidden className="tech-grid absolute inset-0 opacity-75" />
              <div className="absolute inset-x-6 top-6 z-[2] flex items-center justify-between text-[var(--color-muted)] md:inset-x-8 md:top-8">
                <span>{project.company ?? "Product design"}</span>
                <span className="system-label flex items-center gap-2">
                  <span className="system-dot" /> {project.timeline ?? number}
                </span>
              </div>
              <div
                aria-hidden
                className={`signal-orbit ${orbitPositions[visualIndex]} opacity-65 transition-transform duration-700 group-hover:rotate-[28deg] group-hover:scale-110`}
              />
              <svg
                aria-hidden
                viewBox="0 0 360 180"
                className="absolute left-8 top-1/2 z-[1] h-[45%] w-[58%] -translate-y-1/2 overflow-visible text-[var(--color-accent)] opacity-55"
                fill="none"
              >
                <path d={signalPaths[visualIndex]} stroke="currentColor" strokeWidth="1" />
                <path d="M4 146H178M242 16H354" stroke="currentColor" strokeOpacity=".35" />
                <circle cx={nodes[0].x} cy={nodes[0].y} r="5" fill="var(--color-signal)" />
                <circle
                  cx={nodes[1].x}
                  cy={nodes[1].y}
                  r="4"
                  fill="var(--color-elevated)"
                  stroke="currentColor"
                />
                <circle cx={nodes[2].x} cy={nodes[2].y} r="4" fill="currentColor" />
              </svg>
              <span className="absolute bottom-[-0.12em] right-5 font-serif text-[clamp(7rem,17vw,13rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_22%,transparent)] md:right-8">
                {number}
              </span>
              <div className="absolute bottom-7 left-6 max-w-[14rem] md:bottom-8 md:left-8">
                <span className="system-label text-[var(--color-accent)]">
                  {project.category ?? "Case study"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={`flex flex-1 flex-col ${compact ? "p-5 md:p-6" : "p-6 md:p-8"}`}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Case study {number}</p>
              <h3
                className={`mt-3 leading-[1.12] tracking-[-0.03em] ${
                  compact ? "text-[clamp(1.3rem,2vw,1.7rem)]" : "text-[clamp(1.45rem,2.4vw,2rem)]"
                }`}
              >
                {project.title}
              </h3>
            </div>
            <span
              className={`grid shrink-0 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-text)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] ${
                compact ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <ArrowUpRight size={16} />
            </span>
          </div>

          {project.short_description && (
            <p
              className={`mt-4 max-w-[48ch] text-[14px] leading-[1.65] text-[var(--color-muted)] md:text-[15px] ${
                compact ? "line-clamp-2" : ""
              }`}
            >
              {project.short_description}
            </p>
          )}

          <div
            className={`mt-auto flex items-center justify-between gap-4 text-[12px] text-[var(--color-subtle)] ${
              compact ? "pt-5" : "pt-7"
            }`}
          >
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
