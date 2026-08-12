import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";
import { getProjectPresentation, resolveHeroVisual } from "@/lib/projectPresentation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectCard } from "@/components/ProjectCard";
import { ProseHtml } from "@/components/case/ProseHtml";
import {
  PortfolioAnalysisCaseVisuals,
  PortfolioAnalysisVisual,
} from "@/components/case/PortfolioAnalysisStory";

type Viewport = "desktop" | "mobile";
type Surface = "page" | "card";

export function ProjectPreviewDialog({
  open,
  onOpenChange,
  project,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectRow;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [surface, setSurface] = useState<Surface>("page");
  const presentation = getProjectPresentation(project);
  const hero = resolveHeroVisual(project);
  const chapters = [
    ["overview", project.overview],
    ["problem", project.problem_statement],
    ["research", project.research],
    ["process", project.design_process],
    ["solution", project.solution],
    ["impact", project.outcome],
    ["reflection", project.learnings],
  ]
    .map(([key, html], index) => ({
      key: key as keyof typeof presentation.sections,
      html,
      number: String(index + 1).padStart(2, "0"),
    }))
    .filter(({ key, html }) => presentation.sections[key].visible && html);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-3 top-3 flex h-[calc(100vh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-0 bg-neutral-100 p-0 sm:rounded-xl">
        <DialogTitle className="sr-only">Project preview</DialogTitle>
        <DialogDescription className="sr-only">
          Preview the current unsaved CMS project on desktop or mobile.
        </DialogDescription>

        <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 pr-14">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Unsaved live preview</p>
            <p className="text-[11px] text-neutral-500">Updates as you edit the CMS form</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-neutral-200 p-0.5">
              <Button
                type="button"
                variant={surface === "page" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSurface("page")}
              >
                Case study
              </Button>
              <Button
                type="button"
                variant={surface === "card" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSurface("card")}
              >
                Project card
              </Button>
            </div>
            <div className="flex rounded-md border border-neutral-200 p-0.5">
              <Button
                type="button"
                aria-label="Desktop preview"
                variant={viewport === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewport("desktop")}
              >
                <Monitor size={14} />
              </Button>
              <Button
                type="button"
                aria-label="Mobile preview"
                variant={viewport === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewport("mobile")}
              >
                <Smartphone size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-7">
          <div
            data-theme="light"
            className={`mx-auto overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)] shadow-2xl transition-[width] duration-300 ${
              viewport === "mobile"
                ? "w-[390px] max-w-full rounded-[28px]"
                : "w-full max-w-[1280px] rounded-xl"
            }`}
          >
            {surface === "card" ? (
              <div className="mx-auto max-w-3xl p-6 md:p-12">
                <div className="pointer-events-none">
                  <ProjectCard project={project} size="lg" />
                </div>
              </div>
            ) : (
              <article className={viewport === "mobile" ? "text-[95%]" : undefined}>
                <section className="container-page pb-16 pt-12 md:pb-24 md:pt-20">
                  <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                      <p className="eyebrow text-[var(--color-accent)]">
                        {project.category || "Case study"}
                      </p>
                      <h1 className="mt-5 max-w-[14ch] text-[clamp(2.8rem,7vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.055em]">
                        {project.title || "Untitled project"}
                      </h1>
                      {project.short_description && (
                        <p className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-[var(--color-muted)] md:text-[19px]">
                          {project.short_description}
                        </p>
                      )}
                    </div>
                    <div className="border-t border-[var(--color-hairline-strong)] pt-5 lg:col-span-3 lg:col-start-10">
                      <PreviewMeta label={presentation.labels.company} value={project.company} />
                      <div className="mt-5">
                        <PreviewMeta
                          label={presentation.labels.timeline}
                          value={project.timeline}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="project-visual relative mt-16 aspect-[16/7] min-h-[210px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)]">
                    {hero.kind === "image" && hero.imageUrl ? (
                      <img
                        src={hero.imageUrl}
                        alt={presentation.hero.image_alt}
                        className="h-full w-full object-cover"
                      />
                    ) : hero.kind === "signature" ? (
                      <PortfolioAnalysisVisual mode="hero" />
                    ) : (
                      <GeneratedHero project={project} />
                    )}
                  </div>
                </section>

                <section className="container-page pb-12">
                  <div className="grid gap-6 border-y border-[var(--color-hairline)] py-7 md:grid-cols-4">
                    <PreviewMeta label={presentation.labels.role} value={project.role} />
                    <PreviewMeta label={presentation.labels.timeline} value={project.timeline} />
                    <PreviewMeta label={presentation.labels.duration} value={project.duration} />
                    <PreviewMeta label={presentation.labels.category} value={project.category} />
                  </div>
                </section>

                {(project.metrics ?? []).length > 0 && (
                  <section className="container-page pb-16">
                    <div className="grid border-y border-[var(--color-hairline-strong)] md:grid-cols-3">
                      {project.metrics.slice(0, 3).map((metric, index) => (
                        <div
                          key={`${metric.label}-${index}`}
                          className="border-b border-[var(--color-hairline)] py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                        >
                          <p className="text-3xl text-[var(--color-accent)]">{metric.value}</p>
                          <p className="eyebrow mt-2">{metric.label}</p>
                          {metric.hint && (
                            <p className="mt-1 text-xs text-[var(--color-muted)]">{metric.hint}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {presentation.story.enabled && (
                  <PortfolioAnalysisCaseVisuals story={presentation.story} />
                )}

                {chapters.map(({ key, html, number }) => {
                  const section = presentation.sections[key];
                  return (
                    <section
                      key={key}
                      className="container-page border-t border-[var(--color-hairline)] py-14 md:py-20"
                    >
                      <p className="font-mono text-[11px] text-[var(--color-accent)]">
                        {number} · {section.eyebrow}
                      </p>
                      <h2 className="mt-5 text-[clamp(2rem,4vw,3.6rem)] leading-none tracking-[-0.04em]">
                        {section.title}
                      </h2>
                      <div className="mt-8 max-w-3xl">
                        <ProseHtml html={html!} />
                      </div>
                    </section>
                  );
                })}

                {(project.gallery ?? []).length > 0 && (
                  <section className="border-y border-[var(--color-hairline)] bg-[var(--color-surface)] py-16">
                    <div className="container-page">
                      <p className="eyebrow text-[var(--color-accent)]">
                        {presentation.gallery.eyebrow}
                      </p>
                      <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)]">
                        {presentation.gallery.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
                        {presentation.gallery.description}
                      </p>
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {project.gallery.map((image, index) => (
                          <figure key={`${image.url}-${index}`}>
                            <img
                              src={image.url}
                              alt={image.caption || `Gallery image ${index + 1}`}
                              className="aspect-video w-full rounded-xl object-cover"
                            />
                            {image.caption && (
                              <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
                                {image.caption}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                <section className="container-page py-16">
                  <div className="border-t border-[var(--color-hairline-strong)] pt-10">
                    <p className="eyebrow">{presentation.cta.eyebrow}</p>
                    <h2 className="mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)] leading-[1.04]">
                      {presentation.cta.title}
                    </h2>
                    <span className="btn-primary mt-7 inline-flex">{presentation.cta.label}</span>
                  </div>
                </section>
              </article>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreviewMeta({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-[15px]">{value}</p>
    </div>
  );
}

function GeneratedHero({ project }: { project: ProjectRow }) {
  return (
    <div
      aria-hidden
      className="system-frame absolute inset-0"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklab, var(--color-accent) 12%, var(--color-elevated)), var(--color-surface))",
      }}
    >
      <div className="tech-grid absolute inset-0 opacity-75" />
      <span className="system-label absolute left-7 top-7 text-[var(--color-muted)]">
        {project.role?.split("·")[0]?.trim() || "Product design"}
      </span>
      <span className="absolute bottom-[-0.15em] right-8 font-serif text-[clamp(8rem,24vw,19rem)] leading-none text-[color-mix(in_oklab,var(--color-accent)_20%,transparent)]">
        01
      </span>
    </div>
  );
}
