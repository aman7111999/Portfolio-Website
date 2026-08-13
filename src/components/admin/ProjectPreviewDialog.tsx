import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";
import { getProjectPresentation } from "@/lib/projectPresentation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCaseStudyBody, ProjectCaseStudyHero } from "@/components/case/ProjectCaseStudy";

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
              <article className={viewport === "mobile" ? "project-preview-mobile" : undefined}>
                <ProjectCaseStudyHero project={project} presentation={presentation} />
                <ProjectCaseStudyBody project={project} presentation={presentation} />
                <section className="container-page py-16">
                  <div className="mx-auto max-w-[1040px] border-t border-[var(--color-hairline)] pt-10">
                    <p className="eyebrow">{presentation.cta.eyebrow}</p>
                    <h2 className="mt-4 max-w-[22ch] text-[clamp(2rem,3.5vw,3rem)] leading-[1.08] tracking-[-0.035em]">
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
