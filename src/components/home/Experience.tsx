import { Reveal } from "@/components/Reveal";
import { useContent, useExperience } from "@/lib/cms";
import type { PortfolioExperience } from "@/data/portfolio";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Data = { eyebrow: string; heading_line1: string; heading_line2: string };

const FALLBACK: Data = {
  eyebrow: "Experience",
  heading_line1: "Product ownership across",
  heading_line2: "complex financial journeys.",
};

function formatPeriod(start?: string | null, end?: string | null) {
  return [start?.trim(), end?.trim() || "Present"].filter(Boolean).join(" — ");
}

export function Experience() {
  const { data: rows } = useExperience();
  const { data: content } = useContent<Data>("home_experience", FALLBACK);
  const copy = content ?? FALLBACK;
  const allRoles = rows ?? [];

  return (
    <section className="container-page py-24 md:py-32">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.04] tracking-[-0.04em]">
              {copy.heading_line1}{" "}
              <span className="font-serif font-normal italic text-[var(--color-accent)]">
                {copy.heading_line2}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.65] text-[var(--color-muted)] lg:col-span-4 lg:justify-self-end">
            A progression from hands-on execution to leading ambiguous, cross-functional product
            work.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 border-b border-[var(--color-hairline-strong)]">
        {allRoles.map((role: PortfolioExperience, index: number) => (
          <Reveal key={role.id} delay={index * 0.05}>
            <article className="grid gap-6 border-t border-[var(--color-hairline-strong)] py-8 md:grid-cols-[190px_1fr] md:gap-10">
              <div>
                <p className="eyebrow">{formatPeriod(role.start_date, role.end_date)}</p>
                <p className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                  {role.company}
                </p>
                {role.location && (
                  <p className="mt-1 text-[12px] text-[var(--color-subtle)]">{role.location}</p>
                )}
              </div>
              <div>
                <h3 className="text-[20px] font-medium tracking-[-0.02em] text-[var(--color-accent)] md:text-[22px]">
                  {role.role}
                </h3>
                {role.description && (
                  <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.7] text-[var(--color-muted)]">
                    {role.description}
                  </p>
                )}
                {role.highlights.length > 0 && (
                  <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                    {role.highlights.slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[13px] leading-[1.55] text-[var(--color-text)]"
                      >
                        <span className="mt-[0.6em] h-px w-4 shrink-0 bg-[var(--color-accent)]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-7 flex justify-end">
        <Link
          to="/resume"
          className="story-link inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold"
        >
          View full experience <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
