import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Seo } from "@/lib/seo";
import { getProject, getAdjacentProjects, site } from "@/lib/content";
import { StickyTOC } from "@/components/StickyTOC";
import { mdxComponents, coverBackground, MetricGrid } from "@/components/mdx";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  const reduce = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(coverProgress, [0, 1], ["0%", "20%"]);
  const coverScale = useTransform(coverProgress, [0, 1], [1, 1.08]);

  if (!project) return <NotFound />;
  const { prev, next } = getAdjacentProjects(slug);
  const { Body } = project;

  // Default TOC — merge project.sections with baked-in anchors we always render.
  const tocItems = [
    { id: "overview", label: "Overview" },
    ...(project.sections ?? []),
    { id: "impact", label: "Impact" },
    { id: "reflection", label: "Reflection" },
  ].filter(
    (item, i, arr) => arr.findIndex((x) => x.id === item.id) === i,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    author: { "@type": "Person", name: site.name },
    about: project.category,
    creator: project.company,
  };

  return (
    <>
      <Seo
        title={project.title}
        description={project.summary}
        path={`/projects/${project.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <article>
        {/* Cinematic hero */}
        <section className="relative">
          <div className="container-page pt-24 pb-14 md:pt-36 md:pb-20">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)] link-underline"
            >
              <ArrowLeft size={12} /> Back to work
            </Link>
            <p className="mt-10 text-xs uppercase tracking-widest text-[var(--color-muted)]">
              {project.company} · {project.category}
            </p>
            <h1 className="display-hero mt-6 max-w-5xl text-4xl md:text-[5.5rem] md:leading-[0.98]">
              {project.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
              {project.summary}
            </p>
          </div>

          <div className="container-page">
            <motion.div
              ref={coverRef}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-hairline"
              aria-hidden
            >
              <motion.div
                className="absolute -inset-8"
                style={{
                  background: coverBackground(project.cover),
                  y: reduce ? undefined : coverY,
                  scale: reduce ? undefined : coverScale,
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Meta strip */}
        <section className="container-page mt-20 grid gap-8 border-y border-hairline py-10 md:grid-cols-4">
          <Meta label="Role" value={project.role} />
          <Meta label="Timeline" value={project.timeline} />
          <Meta label="Duration" value={project.duration} />
          <Meta label="Category" value={project.category} />
        </section>

        <section className="container-page mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Team
            </p>
            <ul className="mt-4 space-y-1.5 text-[15px]">
              {project.team.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Constraints
            </p>
            <ul className="mt-4 space-y-1.5 text-[15px]">
              {project.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Body — MDX with sticky TOC */}
        <section className="container-page mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <StickyTOC items={tocItems} />
          </div>
          <div className="lg:col-span-9">
            <MDXProvider components={mdxComponents}>
              {/* Baked overview section from summary + metrics */}
              <section id="overview" className="scroll-mt-32 pb-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Overview
                </p>
                <p className="mt-4 font-display text-2xl leading-[1.35] md:text-[2rem] md:leading-[1.25]">
                  {project.summary}
                </p>
                <MetricGrid items={project.metrics} />
              </section>
              <Body />
            </MDXProvider>
          </div>
        </section>

        {/* Next project */}
        <section className="container-page mt-32 hairline-t pt-16">
          <div className="grid gap-10 md:grid-cols-2">
            {prev && (
              <Link
                to={`/projects/${prev.slug}`}
                className="group block"
                data-cursor="Previous"
              >
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)]">
                  <ArrowLeft size={12} /> Previous
                </p>
                <p className="mt-4 font-display text-3xl md:text-4xl link-underline">
                  {prev.title}
                </p>
              </Link>
            )}
            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="group block md:text-right"
                data-cursor="Next case"
              >
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)] md:justify-end">
                  Next <ArrowRight size={12} />
                </p>
                <div
                  className="mt-4 relative aspect-[21/9] overflow-hidden rounded-lg border border-hairline"
                  style={{ background: coverBackground(next.cover) }}
                >
                  <div className="absolute inset-0 flex items-end p-6 md:p-10">
                    <p className="font-display text-3xl md:text-5xl text-[var(--color-ink)]">
                      {next.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section className="container-page mt-24 pb-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 link-underline"
            data-cursor="Get in touch"
          >
            Want to work together? <ArrowUpRight size={16} />
          </Link>
        </section>
      </article>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 text-[15px]">{value}</p>
    </div>
  );
}
