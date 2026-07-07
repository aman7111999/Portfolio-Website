import { useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Seo } from "@/lib/seo";
import { useProject, useProjects, useSite, projectGradient, type ProjectRow } from "@/lib/cms";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, Badge, Button } from "@/components/design";
import { CaseSection } from "@/components/case/CaseSection";
import { CaseGallery } from "@/components/case/CaseGallery";
import { CaseToc } from "@/components/case/CaseToc";
import { ReadingProgress } from "@/components/case/ReadingProgress";
import { ImpactGrid } from "@/components/case/ImpactGrid";
import { PrototypeEmbed, isPrototypeLink } from "@/components/case/PrototypeEmbed";
import { ProseHtml } from "@/components/case/ProseHtml";
import NotFound from "./NotFound";

/**
 * Case-study page — editorial, sticky storytelling.
 * Sections map onto the CMS ProjectRow fields; empty fields skip.
 * No project data is modified — pure presentation layer.
 */
export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { data: project, isLoading } = useProject(slug);
  const { data: siblings } = useProjects({ publishedOnly: true });
  const { data: site } = useSite();
  const reduce = useReducedMotion();

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(coverProgress, [0, 1], ["0%", "18%"]);
  const coverScale = useTransform(coverProgress, [0, 1], [1, 1.08]);

  const prototypeLink = useMemo(
    () => (project?.links ?? []).find((l) => isPrototypeLink(l.url)),
    [project],
  );

  if (isLoading) {
    return (
      <div className="container-page py-40">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }
  if (!project) return <NotFound />;

  const list = siblings ?? [];
  const i = list.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? list[i - 1] : list[list.length - 1];
  const next = i < list.length - 1 ? list[i + 1] : list[0];

  const bg = project.thumbnail_url
    ? `center/cover url(${project.thumbnail_url})`
    : projectGradient(project.slug);

  // Section content mapping: requested taxonomy → CMS fields.
  // Sections without CMS content are skipped.
  const chapters = [
    { id: "overview",   chapter: "01", label: "Overview",     eyebrow: "The context",   title: "Overview",              html: project.overview },
    { id: "problem",    chapter: "02", label: "Problem",      eyebrow: "What we faced", title: "Problem & business goal", html: project.problem_statement },
    { id: "research",   chapter: "03", label: "Research",     eyebrow: "What we learned", title: "Research & insights",  html: project.research },
    { id: "process",    chapter: "04", label: "Process",      eyebrow: "How we built it", title: "Design process",       html: project.design_process },
    { id: "solution",   chapter: "05", label: "Solution",     eyebrow: "High fidelity",  title: "The solution",          html: project.solution },
    { id: "impact",     chapter: "06", label: "Impact",       eyebrow: "The outcome",    title: "Impact",                html: project.outcome },
    { id: "reflection", chapter: "07", label: "Reflection",   eyebrow: "In hindsight",   title: "Reflection & learnings", html: project.learnings },
  ] as const;

  const activeChapters = chapters.filter((c) => c.html && c.html.trim().length > 0);

  // TOC entries include the always-present sections that render (gallery, prototype)
  const tocEntries: { id: string; label: string; chapter: string }[] = [
    { id: "hero", label: "Intro", chapter: "00" },
    ...activeChapters.map((c) => ({ id: c.id, label: c.label, chapter: c.chapter })),
    ...(prototypeLink ? [{ id: "prototype", label: "Prototype", chapter: String(activeChapters.length + 1).padStart(2, "0") }] : []),
    ...(project.gallery.length > 0 ? [{ id: "gallery", label: "Gallery", chapter: String(activeChapters.length + (prototypeLink ? 2 : 1)).padStart(2, "0") }] : []),
  ];

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
      <CaseToc sections={tocEntries} />

      <article>
        {/* ==================== HERO ==================== */}
        <section id="hero" className="relative scroll-mt-32">
          <div className="container-page pt-24 pb-14 md:pt-36 md:pb-16">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[var(--tracking-widest)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <ArrowLeft size={12} /> Back to work
            </Link>

            <div className="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-2)]">
              {project.category && <Badge tone="accent">{project.category}</Badge>}
              {project.company && <Tag>{project.company}</Tag>}
              {project.timeline && <Tag>{project.timeline}</Tag>}
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="display-hero mt-[var(--space-8)] max-w-[16ch]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              {project.title}
            </motion.h1>

            {project.short_description && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-[var(--space-8)] max-w-[62ch] text-lg leading-[var(--leading-normal)] text-[var(--color-muted)] md:text-xl"
              >
                {project.short_description}
              </motion.p>
            )}
          </div>

          {/* Cover media */}
          <div className="container-page">
            <motion.div
              ref={coverRef}
              initial={reduce ? false : { opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-xl)] border border-hairline shadow-[var(--elevation-3)]"
              aria-hidden
            >
              <motion.div
                className="absolute -inset-10"
                style={{
                  background: bg,
                  y: reduce ? undefined : coverY,
                  scale: reduce ? undefined : coverScale,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
            </motion.div>
          </div>

          {/* Meta strip */}
          <div className="container-page mt-[var(--space-16)]">
            <div className="grid gap-[var(--space-8)] border-y border-hairline py-[var(--space-8)] md:grid-cols-4">
              <Meta label="Role" value={project.role} />
              <Meta label="Timeline" value={project.timeline} />
              <Meta label="Duration" value={project.duration} />
              <Meta label="Category" value={project.category} />
            </div>

            {(project.tools.length > 0 || project.tags.length > 0) && (
              <div className="mt-[var(--space-8)] flex flex-wrap items-start gap-[var(--space-8)]">
                {project.tools.length > 0 && (
                  <div>
                    <p className="eyebrow mb-[var(--space-3)]">Technology</p>
                    <div className="flex flex-wrap gap-[var(--space-2)]">
                      {project.tools.map((t) => (
                        <Badge key={t} tone="accent" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.tags.length > 0 && (
                  <div>
                    <p className="eyebrow mb-[var(--space-3)]">Tags</p>
                    <div className="flex flex-wrap gap-[var(--space-2)]">
                      {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ==================== CHAPTER SECTIONS ==================== */}
        {activeChapters.map((c) => (
          <CaseSection
            key={c.id}
            id={c.id}
            chapter={c.chapter}
            eyebrow={c.eyebrow}
            title={c.title}
          >
            {/* Impact chapter gets the metric grid above the prose */}
            {c.id === "impact" && project.metrics.length > 0 && (
              <div className="mb-[var(--space-10)]">
                <ImpactGrid items={project.metrics} />
              </div>
            )}
            <ProseHtml html={c.html!} />
          </CaseSection>
        ))}

        {/* ==================== PROTOTYPE ==================== */}
        {prototypeLink && (
          <CaseSection
            id="prototype"
            chapter={String(activeChapters.length + 1).padStart(2, "0")}
            eyebrow="Try it live"
            title="Interactive prototype"
            intro={
              <>
                A working prototype of the flow — click through the way a user would.
                Best experienced on desktop.
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
            intro="Screens, flows, and moments from the design process — tap any image to expand."
          >
            <CaseGallery images={project.gallery} />
          </CaseSection>
        )}

        {/* ==================== IMPACT FALLBACK (metrics only, no outcome copy) ==================== */}
        {!activeChapters.find((c) => c.id === "impact") && project.metrics.length > 0 && (
          <CaseSection
            id="impact"
            chapter={String(activeChapters.length + 3).padStart(2, "0")}
            eyebrow="The outcome"
            title="Impact"
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
        <section className="container-page mt-[var(--space-24)] pb-[var(--space-16)]">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-[var(--color-surface)] p-[var(--space-10)] md:p-[var(--space-16)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(600px circle at 20% 0%, var(--color-accent-wash), transparent 55%)," +
                  "radial-gradient(500px circle at 100% 100%, var(--color-accent-wash), transparent 45%)",
              }}
            />
            <div className="relative flex flex-wrap items-end justify-between gap-[var(--space-6)]">
              <div>
                <p className="eyebrow">Let's build together</p>
                <h2 className="display-2 mt-[var(--space-4)] max-w-[18ch]">
                  Have a problem worth solving?
                </h2>
              </div>
              <Button to="/contact" variant="accent" size="lg">
                Start a conversation <ArrowUpRight size={16} />
              </Button>
            </div>
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
  const bg = project.thumbnail_url
    ? `center/cover url(${project.thumbnail_url})`
    : projectGradient(project.slug);
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block ${side === "next" ? "md:text-right" : ""}`}
    >
      <p
        className={`flex items-center gap-[var(--space-2)] font-mono text-[11px] uppercase tracking-[var(--tracking-widest)] text-[var(--color-muted)] ${
          side === "next" ? "md:justify-end" : ""
        }`}
      >
        {side === "prev" ? (
          <><ArrowLeft size={12} /> {label}</>
        ) : (
          <>{label} <ArrowRight size={12} /></>
        )}
      </p>
      <div
        className="relative mt-[var(--space-4)] aspect-[21/9] overflow-hidden rounded-[var(--radius-lg)] border border-hairline shadow-[var(--elevation-1)] transition-shadow duration-[var(--dur-slow)] group-hover:shadow-[var(--elevation-3)]"
      >
        <div
          aria-hidden
          className="absolute -inset-6 transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
          style={{ background: bg }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 flex items-end p-[var(--space-8)] md:p-[var(--space-10)]">
          <p className="font-display text-3xl leading-tight text-white md:text-5xl">
            {project.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
