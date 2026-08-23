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

      <section className="container-page pb-12 pt-8 sm:pb-16 sm:pt-12 md:pb-20 md:pt-20">
        <Reveal>
          <p className="eyebrow">Selected case studies</p>
          <h1 className="mt-4 max-w-[14ch] text-[clamp(2.5rem,12vw,3.15rem)] font-medium leading-[1] tracking-[-0.045em] sm:mt-5 sm:text-[clamp(3rem,6vw,5.5rem)] sm:leading-[0.98] sm:tracking-[-0.05em]">
            Case studies from{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              real product work.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-[var(--color-muted)] md:text-lg">
            Each one covers the brief, the decisions, the screens, and the result. Where a metric is
            available, I’ve included it. Where it isn’t, I’ve said so.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-16 sm:pb-24 md:pb-32">
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
