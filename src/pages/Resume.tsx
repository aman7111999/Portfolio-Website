import { useEffect } from "react";
import { Download, MapPin, Mail, ArrowUpRight, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import {
  useSite,
  useExperience,
  useEducation,
  useSkills,
  useContent,
} from "@/lib/cms";
import { Reveal } from "@/components/Reveal";

type ResumePage = {
  eyebrow: string;
  heading: string;
  subline: string;
  download_label: string;
  experience_heading: string;
  education_heading: string;
  skills_heading: string;
};

const FALLBACK: ResumePage = {
  eyebrow: "Résumé",
  heading: "Experience, in one page.",
  subline:
    "A quick read of my roles, education and toolkit. Grab the PDF for the printable version.",
  download_label: "Download PDF",
  experience_heading: "Experience",
  education_heading: "Education",
  skills_heading: "Skills & toolkit",
};

function fmtPeriod(s?: string | null, e?: string | null) {
  const a = (s ?? "").trim();
  const b = (e ?? "").trim() || "Present";
  return [a, b].filter(Boolean).join(" — ");
}

export default function Resume() {
  const { data: site } = useSite();
  const { data: experience } = useExperience();
  const { data: education } = useEducation();
  const { data: skills } = useSkills();
  const { data: c } = useContent<ResumePage>("resume_page", FALLBACK);
  const d = c ?? FALLBACK;

  useEffect(() => {
    document.title = `Résumé — ${site?.name ?? "Aman Mishra"}`;
  }, [site?.name]);

  const resumeUrl = site?.resume_url ?? null;

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 pb-14 md:pt-24 md:pb-20">
        <Reveal>
          <span className="glass-pill">
            <Sparkles size={12} className="text-[var(--color-accent)]" />
            {d.eyebrow}
          </span>
        </Reveal>
        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={0.05}>
            <h1 className="text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl">
              {d.heading}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-[var(--color-muted)]">
              {d.subline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[14px] text-[var(--color-muted)]">
              {site?.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} /> {site.location}
                </span>
              )}
              {site?.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--color-accent)]"
                >
                  <Mail size={13} /> {site.email}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary !py-2 !pr-5 !text-[14px]"
                  style={{ minHeight: 44 }}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-accent-contrast)] text-[var(--color-accent)]">
                    <Download size={15} />
                  </span>
                  <span>{d.download_label}</span>
                </a>
              ) : (
                <span className="rounded-full border border-[var(--color-hairline-strong)] px-4 py-2 text-[13px] text-[var(--color-muted)]">
                  PDF coming soon
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="container-page py-14 md:py-20">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-hairline)] pb-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl">
              <Briefcase size={18} className="text-[var(--color-accent)]" />
              {d.experience_heading}
            </h2>
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {(experience ?? []).length} roles
            </span>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4">
          {(experience ?? []).map((r: any, i: number) => (
            <Reveal key={r.id} delay={i * 0.04}>
              <article className="liquid-glass p-6 md:p-7">
                <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {fmtPeriod(r.start_date, r.end_date)}
                    </p>
                    <p className="mt-2 text-[19px] font-semibold text-[var(--color-text)]">
                      {r.company}
                    </p>
                    {r.location && (
                      <p className="mt-1 text-[13px] text-[var(--color-muted)]">{r.location}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[var(--color-accent)]">{r.role}</p>
                    {r.description && (
                      <p className="mt-2 text-[15px] leading-[1.65] text-[var(--color-muted)]">
                        {r.description}
                      </p>
                    )}
                    {(r.highlights?.length ?? 0) > 0 && (
                      <ul className="mt-3 space-y-1.5 text-[14px] text-[var(--color-text)]">
                        {r.highlights.map((t: string, k: number) => (
                          <li key={k} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="container-page py-14 md:py-20">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-hairline)] pb-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl">
              <GraduationCap size={18} className="text-[var(--color-accent)]" />
              {d.education_heading}
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {(education ?? []).map((e: any) => (
            <div key={e.id} className="liquid-glass p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {fmtPeriod(e.start_date, e.end_date)}
              </p>
              <p className="mt-2 text-[17px] font-semibold text-[var(--color-text)]">{e.school}</p>
              <p className="mt-1 text-[14px] text-[var(--color-accent)]">{e.degree}</p>
              {e.field_of_study && (
                <p className="mt-0.5 text-[13px] text-[var(--color-muted)]">{e.field_of_study}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container-page py-14 md:py-20">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-hairline)] pb-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl">
              <Sparkles size={18} className="text-[var(--color-accent)]" />
              {d.skills_heading}
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(skills ?? []).map((g) => (
            <div key={g.group} className="liquid-glass p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {g.group}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--color-hairline-strong)] px-2.5 py-1 text-[12px] text-[var(--color-text)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24 pt-8">
        <div className="liquid-glass flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Want the printable version?
            </p>
            <p className="mt-1 text-[18px] text-[var(--color-text)]">
              Grab the full résumé as a PDF.
            </p>
          </div>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !py-2 !pr-5 !text-[14px]"
              style={{ minHeight: 44 }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-accent-contrast)] text-[var(--color-accent)]">
                <ArrowUpRight size={15} />
              </span>
              <span>{d.download_label}</span>
            </a>
          )}
        </div>
      </section>
    </>
  );
}
