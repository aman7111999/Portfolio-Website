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
  heading_line1: "Have a product",
  heading_accent: "problem",
  heading_line2: "worth talking through?",
  subline:
    "I’m open to Senior Product Designer roles. If the work involves fintech, AI, or a product with a lot of moving parts, I’d be glad to hear about it.",
  cta_label: "Start a conversation",
};

export function FinalCta() {
  const { data: site } = useSite();
  const { data: content } = useContent<Data>("home_cta", FALLBACK);
  const copy = content ?? FALLBACK;

  return (
    <section className="border-t border-[var(--color-ending-border)] bg-[var(--color-ending)] py-14 sm:py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="premium-cta grid gap-8 rounded-[var(--radius-lg)] p-6 text-[var(--color-cta-text)] sm:gap-10 sm:rounded-[var(--radius-xl)] sm:p-8 md:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
            <div className="relative z-[1] lg:col-span-8">
              <p className="system-label flex items-center gap-2 text-[var(--color-cta-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cta-accent)] shadow-[0_0_0_4px_var(--color-cta-glow)]" />
                Open to senior product design roles
              </p>
              <h2 className="mt-5 max-w-[15ch] text-[clamp(2.15rem,10vw,2.7rem)] font-medium leading-[1.05] tracking-[-0.04em] !text-[var(--color-cta-text)] sm:text-[clamp(2.6rem,5vw,4.5rem)] sm:leading-[1.02] sm:tracking-[-0.045em]">
                {copy.heading_line1}{" "}
                <span className="font-serif font-normal italic text-[var(--color-cta-accent)]">
                  {copy.heading_accent}
                </span>{" "}
                {copy.heading_line2}
              </h2>
              <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.7] text-[var(--color-cta-muted)]">
                {copy.subline}
              </p>
            </div>

            {site?.email && (
              <div className="relative z-[1] lg:col-span-4 lg:justify-self-end">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-[10px] border border-white/20 bg-[var(--color-cta-button)] px-5 text-[14px] font-semibold text-[var(--color-cta-button-text)] shadow-[0_14px_34px_-20px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]"
                >
                  {copy.cta_label} <ArrowUpRight size={16} />
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
