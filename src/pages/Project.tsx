import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Seo } from "@/lib/seo";
import { useProjects, useSite, type ProjectRow } from "@/lib/cms";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, Badge } from "@/components/design";
import { CaseSection } from "@/components/case/CaseSection";
import { CaseGallery } from "@/components/case/CaseGallery";
import { ReadingProgress } from "@/components/case/ReadingProgress";
import { ImpactGrid } from "@/components/case/ImpactGrid";
import { PrototypeEmbed, isPrototypeLink } from "@/components/case/PrototypeEmbed";
import { ProseHtml } from "@/components/case/ProseHtml";
import { ProjectPasswordGate } from "@/components/projects/ProjectPasswordGate";
import { fetchProtectedProject, clearAccessToken } from "@/lib/projectAccess";
import NotFound from "./NotFound";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { data: siblings } = useProjects({});
  const { data: site } = useSite();
  const reduce = useReducedMotion();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessRequired, setAccessRequired] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    if (!slug) return;
    setLoading(true);
    setProject(null);
    setNotFound(false);
    setLoadError(false);
    setAccessRequired(false);
    fetchProtectedProject(slug).then((res) => {
      if (!alive) return;
      setLoading(false);
      if (res.ok) {
        setProject(res.project);
      } else if (res.error === "unauthorized") {
        clearAccessToken();
        setAccessRequired(true);
      } else if (res.error === "not_found") {
        setNotFound(true);
      } else {
        setLoadError(true);
      }
    });
    return () => {
      alive = false;
    };
  }, [slug, reloadKey]);

  const prototypeLink = useMemo(
    () => (project?.links ?? []).find((l) => isPrototypeLink(l.url)),
    [project],
  );

  if (accessRequired) {
    return (
      <>
        <Seo
          title="Protected case studies"
          description="Password required to view portfolio case studies."
          path={`/projects/${slug}`}
          noindex
        />
        <ProjectPasswordGate
          onUnlocked={() => {
            setAccessRequired(false);
            setReloadKey((key) => key + 1);
          }}
        />
      </>
    );
  }

  if (loading) {
    return (
      <div className="container-page py-40">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }
  if (loadError) {
    return (
      <div className="container-page grid min-h-[60vh] place-items-center py-28 text-center">
        <div>
          <p className="eyebrow">Connection issue</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3.5rem)]">The case study could not load.</h1>
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            className="mt-7 inline-flex min-h-11 items-center rounded-[8px] bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-contrast)]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
  if (notFound || !project) return <NotFound />;

  const list = siblings ?? [];
  const i = list.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? list[i - 1] : list[list.length - 1];
  const next = i < list.length - 1 ? list[i + 1] : list[0];

  const chapters = [
    {
      id: "overview",
      chapter: "01",
      label: "Overview",
      eyebrow: "The context",
      title: "Overview",
      html: project.overview,
    },
    {
      id: "problem",
      chapter: "02",
      label: "Problem",
      eyebrow: "What we faced",
      title: "Problem & business goal",
      html: project.problem_statement,
    },
    {
      id: "research",
      chapter: "03",
      label: "Research",
      eyebrow: "What we learned",
      title: "Research & insights",
      html: project.research,
    },
    {
      id: "process",
      chapter: "04",
      label: "Process",
      eyebrow: "How we built it",
      title: "Design process",
      html: project.design_process,
    },
    {
      id: "solution",
      chapter: "05",
      label: "Solution",
      eyebrow: "High fidelity",
      title: "The solution",
      html: project.solution,
    },
    {
      id: "impact",
      chapter: "06",
      label: "Impact",
      eyebrow: "The outcome",
      title: "Impact",
      html: project.outcome,
    },
    {
      id: "reflection",
      chapter: "07",
      label: "Reflection",
      eyebrow: "In hindsight",
      title: "Reflection & learnings",
      html: project.learnings,
    },
  ] as const;

  const activeChapters = chapters.filter((c) => c.html && c.html.trim().length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    author: { "@type": "Person", name: site?.name ?? "" },
    about: project.category,
    creator: project.company,
  };

  return (
    <>
      <Seo
        title={project.title}
        description={project.short_description ?? ""}
        path={`/projects/${project.slug}`}
        ogType="article"
        jsonLd={jsonLd}
        siteName={site?.name ?? "Portfolio"}
      />

      <ReadingProgress />

      <article>
        {/* ==================== EDITORIAL HERO ==================== */}
        <section id="hero" className="container-page pb-16 pt-12 md:pb-24 md:pt-20">
          <div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <ArrowLeft size={12} /> Back to work
            </Link>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-8"
            >
              <p className="eyebrow text-[var(--color-accent)]">
                {project.category ?? "Case study"}
              </p>
              <h1 className="mt-5 max-w-[14ch] text-[clamp(3.2rem,7vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[var(--color-text)]">
                {project.title}
              </h1>
              {project.short_description && (
                <p className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-[var(--color-muted)] md:text-[19px]">
                  {project.short_description}
                </p>
              )}
            </motion.div>
            <div className="border-t border-[var(--color-hairline-strong)] pt-5 lg:col-span-3 lg:col-start-10">
              <Meta label="Company" value={project.company} />
              <div className="mt-5">
                <Meta label="Timeline" value={project.timeline} />
              </div>
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
            className="project-visual relative mt-16 aspect-[16/7] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)]"
          >
            {project.thumbnail_url ? (
              <img src={project.thumbnail_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                aria-hidden
                className="system-frame absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, color-mix(in oklab, var(--color-accent) 12%, var(--color-elevated)), var(--color-surface))",
                }}
              >
                <div aria-hidden className="tech-grid absolute inset-0 opacity-75" />
                <span className="system-label absolute left-7 top-7 z-[2] text-[var(--color-muted)] md:left-10 md:top-10">
                  {project.role?.split("·")[0]?.trim()}
                </span>
                <span className="system-label absolute right-7 top-7 z-[2] flex items-center gap-2 text-[var(--color-muted)] md:right-10 md:top-10">
                  <span className="system-dot" /> Case file / active
                </span>
                <div
                  aria-hidden
                  className="signal-orbit left-[18%] top-1/2 -translate-y-1/2 scale-125 opacity-70"
                />
                <svg
                  aria-hidden
                  viewBox="0 0 660 220"
                  className="absolute left-[12%] top-1/2 z-[1] h-[52%] w-[60%] -translate-y-1/2 overflow-visible text-[var(--color-accent)] opacity-55"
                  fill="none"
                >
                  <path
                    d="M4 166C82 166 96 60 182 60s100 88 178 88S470 34 656 34"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path d="M4 194H322M424 8H656" stroke="currentColor" strokeOpacity=".35" />
                  <circle cx="182" cy="60" r="6" fill="var(--color-signal)" />
                  <circle
                    cx="360"
                    cy="148"
                    r="5"
                    fill="var(--color-elevated)"
                    stroke="currentColor"
                  />
                  <circle cx="656" cy="34" r="5" fill="currentColor" />
                </svg>
                <span className="absolute bottom-[-0.15em] right-7 font-serif text-[clamp(8rem,24vw,19rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_20%,transparent)] md:right-12">
                  {String(Math.max(i, 0) + 1).padStart(2, "0")}
                </span>
              </div>
            )}
          </motion.div>
        </section>

        {/* ==================== META STRIP ==================== */}
        <section className="container-page pt-[var(--space-16)] md:pt-[var(--space-20)]">
          <div className="grid gap-[var(--space-8)] border-y border-hairline py-[var(--space-8)] md:grid-cols-4">
            <Meta label="Role" value={project.role} />
            <Meta label="Timeline" value={project.timeline} />
            <Meta label="Duration" value={project.duration} />
            <Meta label="Category" value={project.category} />
          </div>

          <nav
            aria-label="Case study sections"
            className="mt-8 border-b border-[var(--color-hairline)] pb-6"
          >
            <p className="system-label text-[var(--color-subtle)]">Case map</p>
            <ol className="mt-4 flex gap-x-6 gap-y-3 overflow-x-auto pb-1">
              {activeChapters.map((chapter) => (
                <li key={chapter.id} className="shrink-0">
                  <a
                    href={`#${chapter.id}`}
                    className="story-link system-label inline-flex min-h-8 items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                  >
                    <span className="text-[var(--color-subtle)]">{chapter.chapter}</span>
                    {chapter.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {(project.tools.length > 0 || project.tags.length > 0) && (
            <div className="mt-[var(--space-8)] flex flex-wrap items-start gap-[var(--space-8)]">
              {project.tools.length > 0 && (
                <div>
                  <p className="eyebrow mb-[var(--space-3)]">Technology</p>
                  <div className="flex flex-wrap gap-[var(--space-2)]">
                    {project.tools.map((t) => (
                      <Badge key={t} tone="accent" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {project.tags.length > 0 && (
                <div>
                  <p className="eyebrow mb-[var(--space-3)]">Tags</p>
                  <div className="flex flex-wrap gap-[var(--space-2)]">
                    {project.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ==================== STICKY METRIC RIBBON ==================== */}
        {project.metrics.length > 0 && (
          <section className="relative py-[var(--space-16)]">
            <div className="container-page">
              <div className="grid border-y border-[var(--color-hairline-strong)] md:grid-cols-3">
                {project.metrics.slice(0, 3).map((m, idx) => (
                  <motion.div
                    key={`${m.label}-${idx}`}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE }}
                    className="flex items-baseline gap-4 border-b border-[var(--color-hairline)] py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[var(--tracking-tightest)] text-[var(--color-accent)]">
                      {m.value}
                    </p>
                    <div>
                      <p className="eyebrow">{m.label}</p>
                      {m.hint && (
                        <p className="mt-1 text-[12px] text-[var(--color-muted)]">{m.hint}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================== CHAPTER SECTIONS ==================== */}
        {activeChapters.map((c) => {
          return (
            <CaseSection
              key={c.id}
              id={c.id}
              chapter={c.chapter}
              eyebrow={c.eyebrow}
              title={c.title}
              variant="rail"
              tone={c.id === "impact" ? "surface" : "default"}
            >
              {c.id === "impact" && project.metrics.length > 0 && (
                <div className="mb-[var(--space-10)]">
                  <ImpactGrid items={project.metrics} />
                </div>
              )}
              <ProseHtml html={c.html!} />
            </CaseSection>
          );
        })}

        {/* ==================== PROTOTYPE ==================== */}
        {prototypeLink && (
          <CaseSection
            id="prototype"
            chapter={String(activeChapters.length + 1).padStart(2, "0")}
            eyebrow="Try it live"
            title="Interactive prototype"
            variant="wide"
            intro={
              <>
                A working prototype of the flow — click through the way a user would. Best
                experienced on desktop. Tap the expand icon for fullscreen.
              </>
            }
          >
            <PrototypeEmbed url={prototypeLink.url} label={prototypeLink.label} />
          </CaseSection>
        )}

        {/* ==================== GALLERY ==================== */}
        {project.gallery.length > 0 && (
          <CaseSection
            id="gallery"
            chapter={String(activeChapters.length + (prototypeLink ? 2 : 1)).padStart(2, "0")}
            eyebrow="Visual archive"
            title="Selected artifacts"
            variant="wide"
            tone="surface"
            intro="Screens, flows, and moments from the design process — tap any image to expand."
          >
            <CaseGallery images={project.gallery} />
          </CaseSection>
        )}

        {/* ==================== IMPACT FALLBACK ==================== */}
        {!activeChapters.find((c) => c.id === "impact") && project.metrics.length > 0 && (
          <CaseSection
            id="impact"
            chapter={String(activeChapters.length + 3).padStart(2, "0")}
            eyebrow="The outcome"
            title="Impact"
            variant="split"
          >
            <ImpactGrid items={project.metrics} />
          </CaseSection>
        )}

        {/* ==================== LINKS ==================== */}
        {project.links.filter((l) => !isPrototypeLink(l.url)).length > 0 && (
          <section className="container-page py-[var(--space-16)]">
            <p className="eyebrow">External links</p>
            <ul className="mt-[var(--space-4)] flex flex-wrap gap-[var(--space-3)]">
              {project.links
                .filter((l) => !isPrototypeLink(l.url))
                .map((l, idx) => (
                  <li key={idx}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-hairline bg-[var(--color-elevated)] px-[var(--space-4)] py-[var(--space-2)] text-[13px] text-[var(--color-text)] transition-colors hover:border-[var(--color-hairline-strong)]"
                    >
                      {l.label} <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* ==================== NEXT / PREV ==================== */}
        {(prev || next) && (
          <section className="container-page mt-[var(--space-24)] border-t border-hairline pt-[var(--space-16)]">
            <div className="grid gap-[var(--space-10)] md:grid-cols-2">
              {prev && <NavCase project={prev} label="Previous" side="prev" />}
              {next && <NavCase project={next} label="Next" side="next" />}
            </div>
          </section>
        )}

        {/* ==================== CTA ==================== */}
        <section className="container-page mt-[var(--space-24)] pb-[var(--space-20)]">
          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-[var(--color-hairline-strong)] pt-10 md:pt-14">
            <div>
              <p className="eyebrow">Let's build together</p>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.04em]">
                Have a problem worth solving?
              </h2>
            </div>
            <Link to="/contact" className="btn-primary">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-[var(--space-2)] text-[15px] text-[var(--color-text)]">{value}</p>
    </div>
  );
}

function NavCase({
  project,
  label,
  side,
}: {
  project: ProjectRow;
  label: string;
  side: "prev" | "next";
}) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block border-t border-[var(--color-hairline-strong)] pt-6 ${
        side === "next" ? "md:text-right" : ""
      }`}
    >
      <p
        className={`flex items-center gap-[var(--space-2)] font-mono text-[11px] uppercase tracking-[var(--tracking-widest)] text-[var(--color-muted)] ${
          side === "next" ? "md:justify-end" : ""
        }`}
      >
        {side === "prev" ? (
          <>
            <ArrowLeft size={12} /> {label}
          </>
        ) : (
          <>
            {label} <ArrowRight size={12} />
          </>
        )}
      </p>
      <div
        className={`mt-5 flex items-start gap-5 ${side === "next" ? "md:flex-row-reverse" : ""}`}
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
          {side === "prev" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </span>
        <div>
          <p className="text-[clamp(1.45rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text)]">
            {project.title}
          </p>
          <p className="mt-2 text-[12px] text-[var(--color-muted)]">
            {project.category ?? "Case study"}
          </p>
        </div>
      </div>
    </Link>
  );
}
