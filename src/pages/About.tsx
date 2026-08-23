import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { useAllContent, useEducation, useExperience, useSite, useSkills } from "@/lib/cms";
import { Reveal } from "@/components/Reveal";
import { BrandMark } from "@/components/BrandMark";
import { PortraitFrame } from "@/components/about/PortraitFrame";
import type { PortfolioEducation, PortfolioExperience } from "@/data/portfolio";

const portraitImg = "/aman-mishra-portfolio-portrait.png";

const PRINCIPLES = [
  {
    title: "Understand the problem",
    body: "I ask what the user is trying to do, what the business needs, and which constraints are real before I commit to screens.",
  },
  {
    title: "Make the page easier to read",
    body: "I decide what belongs first, what can wait, and what needs an explanation when the information gets dense.",
  },
  {
    title: "Think past one release",
    body: "I look for patterns that can survive new states, products, and teams instead of solving only the screen in front of me.",
  },
];

function formatPeriod(start?: string | null, end?: string | null) {
  return [start?.trim(), end?.trim() || "Present"].filter(Boolean).join("–");
}

export default function About() {
  const { data: site } = useSite();
  const { data: experience } = useExperience();
  const { data: education } = useEducation();
  const { data: skills } = useSkills();
  const { data: content } = useAllContent();

  const hero = (content?.about_hero ?? {}) as {
    heading_before?: string;
    heading_accent?: string;
    heading_after?: string;
  };
  const roles = (experience ?? []) as PortfolioExperience[];
  const schools = (education ?? []) as PortfolioEducation[];
  const bio = (site?.bio ?? "")
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <Seo
        title="About"
        description={site?.bio ?? site?.tagline ?? ""}
        path="/about"
        siteName={site?.name ?? "Portfolio"}
      />

      <section className="container-page pb-12 pt-10 sm:pb-16 sm:pt-14 md:pb-24 md:pt-24">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <div>
                <p className="system-label text-[var(--color-accent)]">Profile / AM–01</p>
                <p className="mt-1 text-[12px] text-[var(--color-muted)]">
                  Product strategy · Interaction · Systems
                </p>
              </div>
            </div>
            <h1 className="mt-7 max-w-[11ch] text-[clamp(2.55rem,12vw,3.2rem)] font-medium leading-[1] tracking-[-0.047em] sm:mt-8 sm:text-[clamp(3.2rem,7vw,6rem)] sm:leading-[0.96] sm:tracking-[-0.055em]">
              {hero.heading_before ?? "A designer who"}{" "}
              <span className="font-serif font-normal italic text-[var(--color-accent)]">
                {hero.heading_accent ?? "listens"}
              </span>{" "}
              {hero.heading_after ?? "before he draws."}
            </h1>
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-10">
            <dl className="border-t border-[var(--color-hairline-strong)]">
              <ProfileMeta label="Current role" value={roles[0]?.role ?? "Product Designer"} />
              <ProfileMeta label="Experience" value="4.5+ years" />
              <ProfileMeta label="Base" value={site?.location ?? "Mumbai, India"} />
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-10 pb-16 sm:gap-12 sm:pb-24 md:pb-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <PortraitFrame
            src={site?.profile_image_url || portraitImg}
            alt={site?.name ?? "Aman Mishra"}
          />
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="system-label text-[var(--color-subtle)]">The short version</p>
          <div className="mt-6 space-y-6">
            {bio.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-[clamp(1.55rem,2.7vw,2.3rem)] leading-[1.3] tracking-[-0.025em] text-[var(--color-text)]"
                    : "max-w-[60ch] text-[15px] leading-[1.75] text-[var(--color-muted)] md:text-[16px]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-5 border-t border-[var(--color-hairline)] pt-6">
            <Link to="/work" className="btn-primary">
              View selected work <ArrowUpRight size={15} />
            </Link>
            <Link
              to="/resume"
              className="story-link inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold"
            >
              Read my résumé <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-16 sm:py-20 md:py-28">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">How I work</p>
              <h2 className="mt-4 max-w-[12ch] text-[clamp(2.1rem,9.5vw,2.55rem)] leading-[1.06] tracking-[-0.038em] sm:text-[clamp(2.5rem,4.5vw,4rem)] sm:leading-[1.02] sm:tracking-[-0.045em]">
                When the brief is{" "}
                <span className="font-serif font-normal italic text-[var(--color-accent)]">
                  still unclear.
                </span>
              </h2>
            </div>
            <p className="max-w-[48ch] text-[15px] leading-[1.7] text-[var(--color-muted)] lg:col-span-5 lg:col-start-8 lg:pt-8">
              I ask questions early, prototype the uncertain parts, and stay close enough to the
              build to see where the design needs to change.
            </p>
          </Reveal>

          <div className="mt-10 grid border-y border-[var(--color-hairline-strong)] sm:mt-14 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <article className="h-full border-b border-[var(--color-hairline)] py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <div className="flex items-center justify-between">
                    <span className="system-label text-[var(--color-subtle)]">
                      Principle / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="system-dot" />
                  </div>
                  <h3 className="mt-8 text-[22px] tracking-[-0.025em]">{principle.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-muted)]">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 md:py-32">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Career snapshot</p>
            <h2 className="mt-4 max-w-[12ch] text-[clamp(2.05rem,9vw,2.45rem)] leading-[1.06] tracking-[-0.038em] sm:text-[clamp(2.35rem,4vw,3.6rem)] sm:leading-[1.04] sm:tracking-[-0.04em]">
              Where I’ve worked.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.7] text-[var(--color-muted)]">
              This is the short version. The résumé has the responsibilities and results behind each
              role.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="border-b border-[var(--color-hairline-strong)]">
              {roles.map((role, index) => (
                <article
                  key={role.id}
                  className="grid gap-3 border-t border-[var(--color-hairline-strong)] py-6 sm:grid-cols-[130px_1fr] sm:gap-8"
                >
                  <p className="system-label pt-1 text-[var(--color-subtle)]">
                    {formatPeriod(role.start_date, role.end_date)}
                  </p>
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="min-w-0 text-[19px] tracking-[-0.02em]">{role.role}</h3>
                      <span className="system-label shrink-0 text-[var(--color-subtle)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] text-[var(--color-accent)]">{role.company}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page border-t border-[var(--color-hairline-strong)] py-16 sm:py-20 md:py-24">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Education</p>
            <div className="mt-6 border-b border-[var(--color-hairline)]">
              {schools.map((school) => (
                <div key={school.id} className="border-t border-[var(--color-hairline)] py-5">
                  <p className="text-[17px] font-medium">{school.institution}</p>
                  <p className="mt-1 text-[13px] leading-[1.55] text-[var(--color-muted)]">
                    {[school.degree, school.field].filter(Boolean).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Capabilities</p>
            <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {(skills ?? []).map((group) => (
                <div key={group.group} className="border-t border-[var(--color-hairline)] pt-4">
                  <p className="system-label text-[var(--color-accent)]">{group.group}</p>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-muted)]">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-16 pt-6 sm:pb-24 sm:pt-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-[var(--color-hairline-strong)] pt-10">
            <div>
              <p className="system-label text-[var(--color-subtle)]">Next / Conversation</p>
              <p className="mt-4 max-w-[17ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.035em]">
                Have a complex product problem worth solving?
              </p>
            </div>
            <Link to="/contact" className="btn-primary">
              Let’s talk <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ProfileMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[var(--color-hairline)] py-4">
      <dt className="system-label text-[var(--color-subtle)]">{label}</dt>
      <dd className="mt-2 text-[14px] font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}
