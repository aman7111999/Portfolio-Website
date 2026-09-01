import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { useEducation, useExperience, useSite, useSkills } from "@/lib/cms";
import { Reveal } from "@/components/Reveal";
import { PortraitFrame } from "@/components/about/PortraitFrame";
import type { PortfolioEducation, PortfolioExperience } from "@/data/portfolio";

const portraitImg = "/aman-mishra-portfolio-portrait.png";

const WORKING_WITH_ME = [
  {
    title: "I ask a lot of why.",
    body: "Not to slow things down. Usually to stop us from solving the wrong problem quickly.",
  },
  {
    title: "I simplify before I decorate.",
    body: "If a product feels complicated, I would rather fix the hierarchy and decisions before polishing the pixels.",
  },
  {
    title: "I care about what ships.",
    body: "The Figma file matters, but the experience people actually use matters more. I stay close to engineering for that reason.",
  },
  {
    title: "I can change my mind.",
    body: "A stronger idea is more useful than defending my first one. Good collaboration should make the work better, not louder.",
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

  const roles = (experience ?? []) as PortfolioExperience[];
  const schools = (education ?? []) as PortfolioEducation[];

  return (
    <>
      <Seo
        title="About"
        description={
          site?.bio ??
          "How Aman Mishra thinks, collaborates and turns complex product problems into simple experiences."
        }
        path="/about"
        siteName={site?.name ?? "Aman Mishra"}
      />

      <section className="container-page pb-14 pt-12 sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
        <Reveal>
          <p className="eyebrow">About / a little more than the résumé</p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,13vw,4.35rem)] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[clamp(4.2rem,8vw,7.4rem)] sm:leading-[0.93] sm:tracking-[-0.06em]">
            I like complicated problems.
            <span className="mt-2 block font-serif font-normal italic text-[var(--color-accent)]">
              I just don’t like complicated products.
            </span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-[var(--color-hairline-strong)] pt-8 sm:mt-16 sm:pt-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="max-w-[34ch] text-[clamp(1.5rem,2.7vw,2.2rem)] leading-[1.28] tracking-[-0.025em] text-[var(--color-text)]">
              I didn’t get into design because I wanted to make screens. I stayed because I liked
              figuring out why something felt harder than it needed to be.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[55ch] text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-[16px]">
              Today, a lot of my work sits inside investing and financial products, where one screen
              can carry numbers, decisions, risk and a little anxiety too. My favourite part is
              getting into that complexity, finding what actually matters and making the next step
              feel obvious without making the product feel empty.
            </p>
            <p className="mt-5 max-w-[55ch] text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-[16px]">
              That is the thread through most of my work: less noise, clearer decisions and products
              that make people feel more in control.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-24 md:pb-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <PortraitFrame
              src={site?.profile_image_url || portraitImg}
              alt={site?.name ?? "Aman Mishra"}
            />
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7 lg:flex lg:items-end">
            <div className="w-full border-y border-[var(--color-hairline-strong)] py-8 sm:py-10">
              <p className="system-label text-[var(--color-subtle)]">A small design confession</p>
              <blockquote className="mt-6 max-w-[24ch] font-serif text-[clamp(2rem,4vw,3.7rem)] italic leading-[1.12] tracking-[-0.03em] text-[var(--color-text)]">
                “I notice products even when I’m not trying to.”
              </blockquote>
              <p className="mt-6 max-w-[52ch] text-[14px] leading-[1.75] text-[var(--color-muted)] sm:text-[15px]">
                Why did that app ask the same thing twice? Why does one financial product feel calm
                while another feels intimidating? Why is that button there? Curiosity has a habit of
                following me outside work too.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-16 sm:py-20 md:py-28">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Chapter 01 / The messy part</p>
              <h2 className="mt-5 max-w-[11ch] text-[clamp(2.35rem,9vw,3rem)] leading-[1.03] tracking-[-0.045em] sm:text-[clamp(3rem,5vw,4.7rem)] sm:leading-[0.99]">
                I usually start where things are
                <span className="font-serif font-normal italic text-[var(--color-accent)]"> unclear.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
              <p className="text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-[16px]">
                A vague requirement. Too much information. Five priorities fighting for the same
                screen. An old flow everyone has learned to work around. That part does not scare me.
                It is usually where the interesting work starts.
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-[16px]">
                I try to understand why something exists before deciding what it should look like. I
                talk to product and engineering, map what is actually happening, challenge the parts
                that do not make sense and keep simplifying until the experience has a clear point of
                view.
              </p>
              <p className="mt-7 border-l border-[var(--color-accent)] pl-5 font-serif text-[1.45rem] italic leading-[1.35] text-[var(--color-text)]">
                Sometimes the answer is a new experience. Sometimes it is removing half of the old
                one. Both are design.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 md:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">Chapter 02 / What finance taught me</p>
            <h2 className="mt-5 max-w-[10ch] text-[clamp(2.35rem,9vw,3rem)] leading-[1.03] tracking-[-0.045em] sm:text-[clamp(3rem,4.8vw,4.5rem)] sm:leading-[1]">
              “Simple” is actually
              <span className="font-serif font-normal italic text-[var(--color-accent)]"> hard.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-[58ch] text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.42] tracking-[-0.02em] text-[var(--color-text)]">
              In financial products, clean UI is not enough. People are trying to understand their
              money, recognise risk, compare information and make a decision they can trust.
            </p>
            <div className="mt-8 grid gap-6 border-t border-[var(--color-hairline-strong)] pt-7 sm:grid-cols-2 sm:gap-8">
              <p className="text-[14px] leading-[1.75] text-[var(--color-muted)] sm:text-[15px]">
                Working on investing products made me think much more deeply about information
                hierarchy, behaviour, edge cases and trust. Every extra number needs a reason to be
                there. Every hidden detail needs a reason to stay hidden.
              </p>
              <p className="text-[14px] leading-[1.75] text-[var(--color-muted)] sm:text-[15px]">
                The interesting part is rarely the number of screens. It is finding the one decision
                that makes all of those screens easier to understand.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-text)] py-16 text-[var(--color-bg)] sm:py-20 md:py-28">
        <div className="container-page">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                Chapter 03 / Shipping changes the design
              </p>
              <h2 className="mt-5 max-w-[11ch] text-[clamp(2.4rem,9vw,3.1rem)] leading-[1.02] tracking-[-0.045em] sm:text-[clamp(3rem,5vw,4.7rem)] sm:leading-[0.99]">
                A Figma file isn’t the
                <span className="font-serif font-normal italic opacity-75"> finish line.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">
              <p className="text-[15px] leading-[1.82] opacity-70 sm:text-[16px]">
                I like staying close to engineering. Not because every pixel needs policing, but
                because the real product always teaches you something the file could not.
              </p>
              <p className="mt-5 text-[15px] leading-[1.82] opacity-70 sm:text-[16px]">
                That is also why design systems became a meaningful part of how I work. Clearer
                patterns, reusable decisions and fewer one-off fixes give teams more time to solve
                the problems that actually deserve thought.
              </p>
              <p className="mt-8 max-w-[30ch] font-serif text-[clamp(1.75rem,3vw,2.6rem)] italic leading-[1.22] opacity-95">
                The goal is not a perfect file. It is a better product in someone’s hands.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 md:py-32">
        <Reveal>
          <p className="eyebrow">Chapter 04 / Working with me</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <h2 className="max-w-[11ch] text-[clamp(2.4rem,9vw,3rem)] leading-[1.03] tracking-[-0.045em] sm:text-[clamp(3rem,5vw,4.7rem)] sm:leading-[1] lg:col-span-5">
              Good work should feel like a
              <span className="font-serif font-normal italic text-[var(--color-accent)]"> conversation.</span>
            </h2>
            <p className="max-w-[48ch] text-[15px] leading-[1.8] text-[var(--color-muted)] sm:text-[16px] lg:col-span-5 lg:col-start-8 lg:pt-5">
              I do my best work with people who are comfortable putting half-formed ideas on the
              table, disagreeing without drama and improving the thing together.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:mt-16">
          {WORKING_WITH_ME.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="h-full border-b border-[var(--color-hairline)] p-6 first:pl-0 sm:min-h-[220px] sm:border-r sm:p-8 sm:odd:pl-0 sm:even:border-r-0 sm:even:pr-0 sm:nth-last-[-n+2]:border-b-0">
                <span className="system-label text-[var(--color-subtle)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-[clamp(1.4rem,2.5vw,2rem)] tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.7] text-[var(--color-muted)]">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-16 sm:py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">The journey so far</p>
            <h2 className="mt-5 max-w-[10ch] text-[clamp(2.25rem,8vw,2.9rem)] leading-[1.04] tracking-[-0.04em] sm:text-[clamp(2.8rem,4.3vw,4rem)]">
              Places that shaped how I think.
            </h2>
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

      <section className="container-page py-16 sm:py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">What I bring to the table</p>
            <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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

          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">Before product design</p>
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
            <p className="mt-7 max-w-[46ch] font-serif text-[1.35rem] italic leading-[1.45] text-[var(--color-muted)]">
              Different path, same habit: understand how things work, then figure out how they could
              work better.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-16 pt-4 sm:pb-24 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden border-y border-[var(--color-hairline-strong)] py-12 sm:py-16 md:py-20">
            <p className="system-label text-[var(--color-subtle)]">One last thing</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="max-w-[12ch] text-[clamp(2.5rem,9vw,3.4rem)] leading-[1.01] tracking-[-0.045em] sm:text-[clamp(3.4rem,5.5vw,5.4rem)] sm:leading-[0.98]">
                  Have a difficult product problem?
                  <span className="block font-serif font-normal italic text-[var(--color-accent)]">
                    Those are usually the interesting ones.
                  </span>
                </h2>
              </div>
              <div className="flex flex-col items-start justify-end gap-5 lg:col-span-4 lg:col-start-9">
                <p className="max-w-[42ch] text-[14px] leading-[1.75] text-[var(--color-muted)] sm:text-[15px]">
                  If you’re building something useful, complicated or still a little unclear, I’d
                  enjoy hearing about it.
                </p>
                <div className="flex flex-wrap gap-5">
                  <Link to="/contact" className="btn-primary">
                    Let’s talk <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    to="/work"
                    className="story-link inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold"
                  >
                    See my work <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
