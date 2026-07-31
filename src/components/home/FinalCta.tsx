import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useContent, useSite } from "@/lib/cms";

type Data = {
  heading_line1: string;
  heading_accent: string;
  heading_line2: string;
  subline: string;
  cta_label: string;
};

const FALLBACK: Data = {
  heading_line1: "Let’s make",
  heading_accent: "complexity",
  heading_line2: "feel simple.",
  subline:
    "I’m exploring Senior Product Designer roles across fintech, AI, consumer products, and product platforms.",
  cta_label: "Start a conversation",
};

export function FinalCta() {
  const { data: site } = useSite();
  const { data: content } = useContent<Data>("home_cta", FALLBACK);
  const copy = content ?? FALLBACK;

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <div className="grid gap-10 rounded-[var(--radius-xl)] bg-[var(--color-text)] p-8 text-[var(--color-bg)] md:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-60">
              Available for the right team
            </p>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.045em] !text-[var(--color-bg)]">
              {copy.heading_line1}{" "}
              <span className="font-serif font-normal italic text-[var(--color-accent)]">
                {copy.heading_accent}
              </span>{" "}
              {copy.heading_line2}
            </h2>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.7] opacity-70">{copy.subline}</p>
          </div>

          {site?.email && (
            <div className="lg:col-span-4 lg:justify-self-end">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[var(--color-bg)] px-5 text-[14px] font-semibold text-[var(--color-text)] transition-transform hover:-translate-y-0.5"
              >
                {copy.cta_label} <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
