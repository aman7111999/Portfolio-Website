import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Seo } from "@/lib/seo";
import { useProjects, useSite, type ProjectRow } from "@/lib/cms";
import { Skeleton } from "@/components/ui/skeleton";
import { ReadingProgress } from "@/components/case/ReadingProgress";
import { ProjectCaseStudyBody, ProjectCaseStudyHero } from "@/components/case/ProjectCaseStudy";
import { ProjectPasswordGate } from "@/components/projects/ProjectPasswordGate";
import { fetchProtectedProject, clearAccessToken } from "@/lib/projectAccess";
import { getProjectPresentation, resolveHeroVisual } from "@/lib/projectPresentation";
import { applyPortfolioAnalysisVisualCorrection } from "@/data/portfolioAnalysisVisualCorrection";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { data: siblings } = useProjects({});
  const { data: site } = useSite();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(true);
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
        setProject(applyPortfolioAnalysisVisualCorrection(res.project));
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
  const projectIndex = list.findIndex((item) => item.slug === slug);
  const next =
    list.length > 1 && projectIndex >= 0 ? list[(projectIndex + 1) % list.length] : undefined;
  const presentation = getProjectPresentation(project);
  const heroVisual = resolveHeroVisual(project);
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
        title={presentation.seo.title}
        description={presentation.seo.description}
        path={`/projects/${project.slug}`}
        ogType="article"
        jsonLd={jsonLd}
        siteName={site?.name ?? "Portfolio"}
        image={heroVisual.imageUrl ?? project.thumbnail_url}
      />

      <ReadingProgress />

      <article>
        <ProjectCaseStudyHero
          project={project}
          presentation={presentation}
          backHref="/work"
          backLabel={presentation.labels.back_to_work}
          projectNumber={projectIndex + 1}
        />

        <ProjectCaseStudyBody project={project} presentation={presentation} />

        {next && <NextProject project={next} label={presentation.labels.next_project} />}

        <section className="container-page pb-20 pt-8 md:pb-24 md:pt-12">
          <div className="mx-auto flex max-w-[1040px] flex-col items-start justify-between gap-7 border-t border-[var(--color-hairline)] pt-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{presentation.cta.eyebrow}</p>
              <h2 className="mt-4 max-w-[22ch] text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                {presentation.cta.title}
              </h2>
            </div>
            <Link to={presentation.cta.url} className="btn-primary w-full sm:w-auto">
              {presentation.cta.label} <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

function NextProject({ project, label }: { project: ProjectRow; label: string }) {
  return (
    <section className="container-page pt-20 md:pt-28">
      <Link
        to={`/projects/${project.slug}`}
        className="group mx-auto flex max-w-[1040px] items-end justify-between gap-4 border-t border-[var(--color-hairline-strong)] pt-8 sm:gap-8 sm:pt-10"
      >
        <div>
          <p className="text-[12px] text-[var(--color-muted)]">{label}</p>
          <h2 className="mt-3 text-[clamp(1.75rem,8vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.035em] transition-colors group-hover:text-[var(--color-accent)] sm:text-[clamp(2rem,4vw,3.5rem)] sm:leading-[1.05] sm:tracking-[-0.04em]">
            {project.title}
          </h2>
          <p className="mt-3 text-[13px] text-[var(--color-muted)]">
            {project.category ?? "Case study"}
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] sm:h-12 sm:w-12">
          <ArrowRight size={17} />
        </span>
      </Link>
    </section>
  );
}
