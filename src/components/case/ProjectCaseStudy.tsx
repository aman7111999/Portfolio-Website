import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectRow } from "@/lib/cms";
import {
  getProjectPresentation,
  resolveHeroVisual,
  type ProjectComparisonStage,
  type ProjectPresentation,
  type ProjectSectionKey,
} from "@/lib/projectPresentation";
import { CaseGallery } from "@/components/case/CaseGallery";
import {
  PortfolioAnalysisCaseVisuals,
  PortfolioAnalysisVisual,
} from "@/components/case/PortfolioAnalysisStory";
import { ProseHtml } from "@/components/case/ProseHtml";
import { PrototypeEmbed, isPrototypeLink } from "@/components/case/PrototypeEmbed";
import { ProjectComparisonStory } from "@/components/case/ProjectComparisonStory";
import { PortfolioRevampVisual } from "@/components/projects/PortfolioRevampVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

type StoryPart = {
  id: ProjectSectionKey;
  html: string;
  eyebrow: string;
  title: string;
};

type StoryGroup = {
  id: string;
  number: string;
  label: string;
  descriptor: string;
  parts: StoryPart[];
};

const GROUPS: Array<{
  id: string;
  label: string;
  descriptor: string;
  keys: ProjectSectionKey[];
}> = [
  {
    id: "context",
    label: "Context",
    descriptor: "The opportunity and stakes",
    keys: ["overview", "problem"],
  },
  {
    id: "approach",
    label: "Approach",
    descriptor: "Evidence, constraints, and direction",
    keys: ["research", "process"],
  },
  {
    id: "solution",
    label: "Solution",
    descriptor: "The decisions behind the work",
    keys: ["solution"],
  },
  {
    id: "outcome",
    label: "Outcome",
    descriptor: "Impact and reflection",
    keys: ["impact", "reflection"],
  },
];

export function ProjectCaseStudyHero({
  project,
  presentation = getProjectPresentation(project),
  backHref,
  backLabel,
  projectNumber = 1,
}: {
  project: ProjectRow;
  presentation?: ProjectPresentation;
  backHref?: string;
  backLabel?: string;
  projectNumber?: number;
}) {
  const reduce = useReducedMotion();
  const hero = resolveHeroVisual(project);
  const comparisonHeroStages = presentation.comparison.stages
    .filter((stage) => !!stage.image_url)
    .slice(0, 3);

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
          {[project.company, project.category].filter(Boolean).join(" · ") || "Case study"}
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
        {project.slug === "riise-portfolio-revamp" ? (
          <PortfolioRevampVisual variant="hero" />
        ) : presentation.type === "revamp_comparison" && comparisonHeroStages.length >= 2 ? (
          <ComparisonHeroVisual stages={comparisonHeroStages} />
        ) : hero.kind === "image" && hero.imageUrl ? (
          <img
            src={hero.imageUrl}
            alt={presentation.hero.image_alt}
            className="h-full w-full object-contain md:object-cover"
          />
        ) : hero.kind === "signature" ? (
          <PortfolioAnalysisVisual mode="hero" />
        ) : (
          <GeneratedHero project={project} projectNumber={projectNumber} />
        )}
      </motion.div>
    </section>
  );
}

function ComparisonHeroVisual({ stages }: { stages: ProjectComparisonStage[] }) {
  const currentStage = stages[stages.length - 1];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(145deg,var(--color-elevated),var(--color-surface))]">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute -right-[8%] top-[16%] h-[74%] w-[38%] rounded-full bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] blur-[80px]"
      />
      <div className="comparison-hero-status absolute inset-x-0 top-0 z-[2] flex min-h-12 items-center justify-between gap-4 border-b border-[var(--color-hairline)] bg-[color-mix(in_oklab,var(--color-surface)_58%,transparent)] px-4 backdrop-blur-sm sm:min-h-16 sm:px-7 md:px-9">
        <p className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--color-muted)] sm:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          Portfolio evolution
        </p>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[var(--color-subtle)] sm:gap-3 sm:text-[10px]">
          <span>01</span>
          <span className="h-px w-7 bg-[var(--color-hairline-strong)] sm:w-12" />
          <span className="text-[var(--color-accent)]">03</span>
        </div>
      </div>

      <div className="comparison-hero-mobile relative z-[1] flex h-full items-end justify-center px-5 pt-14 sm:hidden">
        <figure className="flex h-[79%] w-[64%] max-w-[210px] min-w-0 flex-col overflow-hidden rounded-t-[12px] border border-[color-mix(in_oklab,var(--color-accent)_60%,var(--color-hairline-strong))] bg-[var(--color-surface)] shadow-[0_14px_40px_color-mix(in_oklab,var(--color-accent)_16%,transparent)]">
          <figcaption className="flex min-h-9 items-center justify-between gap-2 border-b border-[var(--color-hairline)] px-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <span className="font-mono text-[var(--color-subtle)]">03</span>
              <span className="truncate">{currentStage.label}</span>
            </span>
            <span className="shrink-0 text-[var(--color-accent)]">Current</span>
          </figcaption>
          <img
            src={currentStage.image_url ?? ""}
            alt={currentStage.image_alt}
            className="min-h-0 w-full flex-1 object-cover object-top"
          />
        </figure>
      </div>

      <div className="comparison-hero-desktop relative z-[1] hidden h-full items-end justify-center gap-4 px-8 pt-20 sm:flex md:gap-7 md:px-14">
        {stages.map((stage, index) => {
          const current = index === stages.length - 1;
          return (
            <figure
              key={stage.id}
              className={`flex h-[84%] min-w-0 max-w-[300px] flex-1 flex-col overflow-hidden rounded-t-[14px] border bg-[var(--color-surface)] transition-[border-color,box-shadow,opacity] duration-500 ${
                current
                  ? "border-[color-mix(in_oklab,var(--color-accent)_65%,var(--color-hairline-strong))] shadow-[0_18px_60px_color-mix(in_oklab,var(--color-accent)_16%,transparent)]"
                  : "border-[var(--color-hairline-strong)] opacity-72 shadow-[var(--elevation-1)]"
              }`}
            >
              <figcaption className="flex min-h-11 items-center justify-between gap-2 border-b border-[var(--color-hairline)] px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                <span className="inline-flex min-w-0 items-center gap-2">
                  <span className="font-mono text-[var(--color-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{stage.label}</span>
                </span>
                {current && <span className="shrink-0 text-[var(--color-accent)]">Current</span>}
              </figcaption>
              <img
                src={stage.image_url ?? ""}
                alt={stage.image_alt}
                className="h-full min-h-0 w-full flex-1 object-cover object-top"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectCaseStudyBody({
  project,
  presentation = getProjectPresentation(project),
}: {
  project: ProjectRow;
  presentation?: ProjectPresentation;
}) {
  const groups = buildGroups(project, presentation);
  const prototypeLink = (project.links ?? []).find((link) => isPrototypeLink(link.url));
  const externalLinks = (project.links ?? []).filter((link) => !isPrototypeLink(link.url));
  const hasExperience = presentation.story.enabled;
  const hasArtifacts = !!prototypeLink || project.gallery.length > 0 || externalLinks.length > 0;
  const isComparison = presentation.type === "revamp_comparison";

  const context = groups.find((group) => group.id === "context");
  const approach = groups.find((group) => group.id === "approach");
  const solution = groups.find((group) => group.id === "solution");
  const outcome = groups.find((group) => group.id === "outcome");
  const storyLinks = isComparison
    ? [
        context && { id: context.id, label: context.label },
        approach && { id: approach.id, label: approach.label },
        { id: "evolution", label: presentation.comparison.eyebrow || "Design evolution" },
        solution && { id: solution.id, label: solution.label },
        outcome && { id: outcome.id, label: outcome.label },
      ]
        .filter((item): item is { id: string; label: string } => !!item)
        .map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") }))
    : groups.map((group) => ({
        id: group.id,
        label: group.label,
        number: group.number,
      }));
  const displayNumberFor = (group: StoryGroup) =>
    storyLinks.find((item) => item.id === group.id)?.number ?? group.number;

  return (
    <>
      {project.metrics.length > 0 && <EvidenceStrip items={project.metrics.slice(0, 3)} />}

      {storyLinks.length > 1 && (
        <nav aria-label="Case study outline" className="container-page pb-10 md:pb-14">
          <div className="case-outline mx-auto flex max-w-[1040px] flex-col gap-4 border-y border-[var(--color-hairline)] py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-[13px] font-medium text-[var(--color-text)]">The story in brief</p>
            <ol className="flex max-w-full gap-x-5 gap-y-3 overflow-x-auto pb-1">
              {storyLinks.map((item) => (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 text-[12px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-subtle)]">
                      {item.number}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {context && <NarrativeGroup group={context} displayNumber={displayNumberFor(context)} />}
      {approach && <NarrativeGroup group={approach} displayNumber={displayNumberFor(approach)} />}

      {isComparison && <ProjectComparisonStory comparison={presentation.comparison} />}

      {solution && <NarrativeGroup group={solution} displayNumber={displayNumberFor(solution)} />}

      {hasExperience && (
        <div id="experience" className="scroll-mt-28">
          <PortfolioAnalysisCaseVisuals story={presentation.story} />
        </div>
      )}

      {hasArtifacts && (
        <ProjectArtifacts
          id="artifacts"
          project={project}
          presentation={presentation}
          prototypeLink={prototypeLink}
          externalLinks={externalLinks}
        />
      )}

      {outcome && <NarrativeGroup group={outcome} displayNumber={displayNumberFor(outcome)} />}
    </>
  );
}

function buildGroups(project: ProjectRow, presentation: ProjectPresentation): StoryGroup[] {
  const content: Record<ProjectSectionKey, string | null> = {
    overview: project.overview,
    problem: project.problem_statement,
    research: project.research,
    process: project.design_process,
    solution: project.solution,
    impact: project.outcome,
    reflection: project.learnings,
  };

  return GROUPS.map((group) => ({
    ...group,
    parts: group.keys.flatMap((key) => {
      const html = content[key]?.trim();
      const section = presentation.sections[key];
      if (!section.visible || !html) return [];
      return [{ id: key, html, eyebrow: section.eyebrow, title: section.title }];
    }),
  }))
    .filter((group) => group.parts.length > 0)
    .map((group, index) => ({ ...group, number: String(index + 1).padStart(2, "0") }));
}

function NarrativeGroup({
  group,
  displayNumber = group.number,
}: {
  group: StoryGroup;
  displayNumber?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id={group.id}
      className="case-narrative-section container-page scroll-mt-24 py-14 sm:scroll-mt-28 md:py-24"
    >
      <div className="case-narrative-grid mx-auto grid max-w-[1040px] gap-7 border-t border-[var(--color-hairline)] pt-10 md:grid-cols-[150px_minmax(0,1fr)] md:gap-14 md:pt-16">
        <aside>
          <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-accent)]">
            {displayNumber}
          </p>
          <p className="mt-3 text-[14px] font-medium text-[var(--color-text)]">{group.label}</p>
          <p className="mt-2 max-w-[18ch] text-[12px] leading-5 text-[var(--color-subtle)]">
            {group.descriptor}
          </p>
        </aside>

        <div className="min-w-0">
          {group.parts.map((part, index) => (
            <motion.div
              key={part.id}
              id={part.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: EASE }}
              className={index > 0 ? "mt-14 border-t border-[var(--color-hairline)] pt-14" : ""}
            >
              <p className="eyebrow text-[var(--color-accent)]">{part.eyebrow}</p>
              {index === 0 ? (
                <h2 className="mt-4 max-w-[20ch] text-[clamp(2rem,8vw,2.5rem)] leading-[1.08] tracking-[-0.035em] sm:text-[clamp(2.25rem,4vw,3.35rem)] sm:leading-[1.06] sm:tracking-[-0.038em]">
                  {part.title}
                </h2>
              ) : (
                <h3 className="mt-4 max-w-[24ch] text-[clamp(1.6rem,2.7vw,2.15rem)] leading-[1.15] tracking-[-0.025em]">
                  {part.title}
                </h3>
              )}
              <ProseHtml html={part.html} className="mt-7" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EvidenceStrip({ items }: { items: ProjectRow["metrics"] }) {
  return (
    <section aria-label="Project evidence" className="container-page pb-14 md:pb-20">
      <div className="case-evidence-grid mx-auto grid max-w-[1040px] border-y border-[var(--color-hairline-strong)] sm:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="border-b border-[var(--color-hairline)] py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:py-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
          >
            <p className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]">
              {item.value}
            </p>
            <p className="mt-3 text-[13px] font-medium text-[var(--color-text)]">{item.label}</p>
            {item.hint && (
              <p className="mt-1 max-w-[30ch] text-[12px] leading-5 text-[var(--color-muted)]">
                {item.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectArtifacts({
  id,
  project,
  presentation,
  prototypeLink,
  externalLinks,
}: {
  id: string;
  project: ProjectRow;
  presentation: ProjectPresentation;
  prototypeLink?: { label: string; url: string };
  externalLinks: Array<{ label: string; url: string }>;
}) {
  const title = project.gallery.length
    ? presentation.gallery.title
    : prototypeLink
      ? presentation.prototype.title
      : presentation.labels.external_links;
  const description = project.gallery.length
    ? presentation.gallery.description
    : prototypeLink
      ? presentation.prototype.description
      : null;

  return (
    <section id={id} className="container-page scroll-mt-24 py-14 sm:scroll-mt-28 md:py-24">
      <div className="mx-auto max-w-[1040px] border-t border-[var(--color-hairline)] pt-10 md:pt-16">
        <div className="case-artifact-heading grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">Selected work</p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(2.25rem,4vw,3.35rem)] leading-[1.06] tracking-[-0.038em]">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-[var(--color-muted)]">
                {description}
              </p>
            )}
          </div>
          {externalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-3 md:justify-end">
              {externalLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text)] underline decoration-[var(--color-hairline-strong)] underline-offset-4 hover:decoration-[var(--color-accent)]"
                  >
                    {link.label} <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {prototypeLink && (
          <div className="mt-10">
            <PrototypeEmbed url={prototypeLink.url} label={prototypeLink.label} />
          </div>
        )}
        {project.gallery.length > 0 && (
          <div className={prototypeLink ? "mt-12" : "mt-10"}>
            <CaseGallery images={project.gallery} />
          </div>
        )}
      </div>
    </section>
  );
}

function HeroMeta({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-subtle)]">
        {label}
      </dt>
      <dd className="mt-2 max-w-[32ch] text-[14px] leading-6 text-[var(--color-text)]">{value}</dd>
    </div>
  );
}

function GeneratedHero({ project, projectNumber }: { project: ProjectRow; projectNumber: number }) {
  return (
    <div
      aria-hidden
      className="system-frame absolute inset-0"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklab, var(--color-accent) 10%, var(--color-elevated)), var(--color-surface))",
      }}
    >
      <div aria-hidden className="tech-grid absolute inset-0 opacity-50" />
      <span className="system-label absolute left-7 top-7 z-[2] text-[var(--color-muted)] md:left-10 md:top-10">
        {project.role?.split("·")[0]?.trim() || "Product design"}
      </span>
      <span className="absolute bottom-[-0.15em] right-7 font-serif text-[clamp(8rem,24vw,19rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_16%,transparent)] md:right-12">
        {String(Math.max(projectNumber, 1)).padStart(2, "0")}
      </span>
    </div>
  );
}
