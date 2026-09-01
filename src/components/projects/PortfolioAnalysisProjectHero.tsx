import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectRow } from "@/lib/cms";
import type { ProjectPresentation } from "@/lib/projectPresentation";
import { PortfolioAnalysisCardVisual } from "@/components/projects/PortfolioAnalysisCardVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PortfolioAnalysisProjectHero({
  project,
  presentation,
  backHref,
  backLabel,
}: {
  project: ProjectRow;
  presentation: ProjectPresentation;
  backHref?: string;
  backLabel?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="case-study-hero container-page pb-12 pt-8 sm:pb-14 sm:pt-10 md:pb-20 md:pt-16"
    >
      {backHref && (
        <Link
          to={backHref}
          className="inline-flex min-h-11 items-center gap-2 text-[12px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft size={12} /> {backLabel ?? presentation.labels.back_to_work}
        </Link>
      )}

      <motion.header
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
        className={backHref ? "mt-9 max-w-[1040px] sm:mt-14" : "max-w-[1040px]"}
      >
        <p className="eyebrow text-[var(--color-accent)]">
          {[project.company, "Portfolio analysis"].filter(Boolean).join(" · ")}
        </p>
        <h1 className="case-study-title mt-4 max-w-[16ch] text-[clamp(2.55rem,12vw,3.4rem)] font-medium leading-[1] tracking-[-0.045em] text-[var(--color-text)] sm:mt-5 sm:text-[clamp(3rem,6.5vw,5.6rem)] sm:leading-[0.98] sm:tracking-[-0.052em]">
          {project.title}
        </h1>
        {project.short_description && (
          <p className="case-hero-summary mt-5 max-w-[62ch] text-[16px] leading-[1.65] text-[var(--color-muted)] sm:mt-7 sm:text-[18px] md:text-[20px]">
            {project.short_description}
          </p>
        )}

        <dl className="case-hero-meta mt-8 grid max-w-[960px] gap-4 border-t border-[var(--color-hairline)] pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:pt-6">
          <HeroMeta label={presentation.labels.role} value={project.role} />
          <HeroMeta label={presentation.labels.duration} value={project.duration} />
          <HeroMeta label={presentation.labels.timeline} value={project.timeline} />
        </dl>
      </motion.header>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        className="case-hero-visual project-visual relative mt-9 aspect-[4/3] min-h-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] sm:mt-12 sm:aspect-[16/9] sm:rounded-[var(--radius-lg)] md:mt-14 md:aspect-[16/8] md:min-h-[260px]"
      >
        <PortfolioAnalysisCardVisual variant="hero" />
      </motion.div>
    </section>
  );
}

function HeroMeta({ label, value }: { label: string; value?: string | null }) {
  if (!value) return <div />;
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
        {label}
      </dt>
      <dd className="mt-2 text-[13px] leading-5 text-[var(--color-muted)] sm:text-[14px]">
        {value}
      </dd>
    </div>
  );
}
