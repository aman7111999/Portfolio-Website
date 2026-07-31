import { Seo } from "@/lib/seo";
import { useProjects, useSite } from "@/lib/cms";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Work() {
  const { data: projects, isLoading } = useProjects({ publishedOnly: true });
  const { data: site } = useSite();
  return (
    <>
      <Seo
        title="Selected Product Design Work"
        description="Case studies across fintech, 0-to-1 products, hyper-personalisation, portfolio insights, and design systems."
        path="/work"
        siteName={site?.name ?? "Portfolio"}
      />

      <section className="container-page pt-8 pb-12 md:pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Selected case studies</p>
          <h1 className="display-hero mt-4 text-5xl md:text-8xl">
            Product decisions, not screen galleries.
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-[var(--color-muted)] md:text-lg">
            Four stories showing how I frame complex problems, navigate constraints, align teams,
            and move from concept to shipped or build-ready outcomes.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-20 md:pb-40">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
          {isLoading &&
            [1, 2, 3, 4].map((i) => <Skeleton key={i} className="aspect-[4/3] w-full" />)}
          {projects?.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
