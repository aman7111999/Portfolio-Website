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

      <section className="container-page pb-16 pt-12 md:pb-20 md:pt-20">
        <Reveal>
          <p className="eyebrow">Selected case studies</p>
          <h1 className="mt-5 max-w-[14ch] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            Product decisions,{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              not screen galleries.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-[var(--color-muted)] md:text-lg">
            Four stories showing how I frame complex problems, navigate constraints, align teams,
            and move from concept to shipped or build-ready outcomes.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
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
