import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type {
  ProjectComparisonPresentation,
  ProjectComparisonStage,
} from "@/lib/projectPresentation";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectComparisonStory({
  comparison,
}: {
  comparison: ProjectComparisonPresentation;
}) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(comparison.stages.length - 1);
  const stages = comparison.stages.slice(0, 3);

  useEffect(() => {
    setActiveIndex(Math.max(stages.length - 1, 0));
  }, [stages.length]);

  if (stages.length < 2) return null;

  const active = stages[Math.min(activeIndex, stages.length - 1)];

  return (
    <section id="evolution" className="container-page scroll-mt-24 py-14 sm:scroll-mt-28 md:py-24">
      <div className="mx-auto max-w-[1120px] border-t border-[var(--color-hairline)] pt-10 md:pt-16">
        <div className="comparison-header-grid grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">{comparison.eyebrow}</p>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(2.05rem,4vw,3.4rem)] leading-[1.06] tracking-[-0.038em]">
              {comparison.title}
            </h2>
          </div>
          <p className="max-w-[50ch] text-[15px] leading-7 text-[var(--color-muted)]">
            {comparison.description}
          </p>
        </div>

        <div className="comparison-mobile mt-9 md:hidden">
          <div
            className="grid rounded-[10px] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-1"
            style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
            aria-label="Choose a design version"
          >
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={`min-h-11 min-w-0 rounded-[7px] px-2 text-[11px] font-semibold transition-colors ${
                  index === activeIndex
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                <span className="block truncate">{stage.label}</span>
                {stage.timeframe && (
                  <span className="mt-0.5 block truncate text-[9px] font-normal opacity-70">
                    {stage.timeframe}
                  </span>
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-4"
          >
            <ComparisonCard
              stage={active}
              index={activeIndex}
              current={activeIndex === stages.length - 1}
            />
          </motion.div>
        </div>

        <ol
          className={`comparison-desktop mt-12 hidden gap-4 md:grid lg:gap-5 ${
            stages.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {stages.map((stage, index) => (
            <motion.li
              key={stage.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
              className="relative min-w-0"
            >
              <ComparisonCard stage={stage} index={index} current={index === stages.length - 1} />
              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[18px] top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-bg)] text-[var(--color-subtle)] lg:grid"
                >
                  <ArrowRight size={14} />
                </span>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="mt-8 flex items-center justify-between gap-5 border-b border-[var(--color-hairline)] pb-5 text-[11px] text-[var(--color-subtle)] md:mt-10">
          <span>Oldest design</span>
          <span className="h-px flex-1 bg-[var(--color-hairline-strong)]" />
          <span className="font-medium text-[var(--color-accent)]">Best improved revamp</span>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  stage,
  index,
  current,
}: {
  stage: ProjectComparisonStage;
  index: number;
  current: boolean;
}) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)] ${
        current
          ? "border-[color-mix(in_oklab,var(--color-accent)_55%,var(--color-hairline-strong))] shadow-[var(--elevation-2)]"
          : "border-[var(--color-hairline-strong)]"
      }`}
    >
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-[var(--color-hairline)] px-4 py-3">
        <div className="min-w-0">
          <p className="system-label truncate text-[var(--color-accent)]">
            {String(index + 1).padStart(2, "0")} / {stage.label}
          </p>
          {stage.timeframe && (
            <p className="mt-1 truncate text-[11px] text-[var(--color-subtle)]">
              {stage.timeframe}
            </p>
          )}
        </div>
        {current && (
          <span className="shrink-0 rounded-full bg-[var(--color-accent-wash)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-accent)]">
            Best version
          </span>
        )}
      </div>

      <div className="relative aspect-[4/5] overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-elevated)] sm:aspect-[16/11] md:aspect-[4/5]">
        {stage.image_url ? (
          <img
            src={stage.image_url}
            alt={stage.image_alt}
            loading="lazy"
            className="h-full w-full object-contain p-2 sm:p-3"
          />
        ) : (
          <div className="system-frame absolute inset-0 grid place-items-center">
            <div aria-hidden className="tech-grid absolute inset-0 opacity-50" />
            <span className="relative font-serif text-[clamp(5rem,18vw,9rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_22%,transparent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.16] tracking-[-0.025em]">
          {stage.title}
        </h3>
        {stage.description && (
          <p className="mt-3 text-[14px] leading-6 text-[var(--color-muted)]">
            {stage.description}
          </p>
        )}
        {stage.highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5 border-t border-[var(--color-hairline)] pt-5">
            {stage.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[12px] leading-5 text-[var(--color-text)]"
              >
                <Check size={13} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
