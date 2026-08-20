import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { useContent, useSite } from "@/lib/cms";

type Data = {
  eyebrow: string;
  heading_line1: string;
  heading_accent: string;
  items: { v: string; l: string }[];
  body: string;
  quote: string;
};

const FALLBACK: Data = {
  eyebrow: "About",
  heading_line1: "From 0-to-1 launches",
  heading_accent: "to systems at scale",
  items: [
    { v: "4.5+", l: "Years in product design" },
    { v: "9×", l: "Portfolio import growth" },
    { v: "4", l: "Focused case studies" },
  ],
  body: "I’m {name}, a product designer focused on complex fintech products, AI-assisted experiences, and scalable product systems.",
  quote: "The strongest design decisions make complexity feel inevitable, not visible.",
};

export function StatsBand() {
  const { data: site } = useSite();
  const { data: content } = useContent<Data>("home_stats", FALLBACK);
  const copy = content ?? FALLBACK;
  const body = copy.body.replace("{name}", site?.name ?? "Aman");

  return (
    <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-16 sm:py-20 md:py-28">
      <div className="container-page grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.1rem,9.5vw,2.5rem)] leading-[1.06] tracking-[-0.038em] sm:text-[clamp(2.4rem,4.2vw,3.7rem)] sm:leading-[1.04] sm:tracking-[-0.04em]">
            {copy.heading_line1}{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              {copy.heading_accent}
            </span>
          </h2>
          <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.75] text-[var(--color-muted)]">
            {body}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-3">
            {copy.items.map((metric) => (
              <div
                key={metric.l}
                className="border-b border-[var(--color-hairline)] py-7 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:text-left sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <p className="text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.05em] text-[var(--color-text)]">
                  <CountUp value={metric.v} />
                </p>
                <p className="mt-3 text-[12px] leading-[1.45] text-[var(--color-muted)]">
                  {metric.l}
                </p>
              </div>
            ))}
          </div>
          <blockquote className="mt-10 max-w-[34ch] font-serif text-[clamp(1.75rem,3vw,2.5rem)] italic leading-[1.2] text-[var(--color-text)]">
            “{copy.quote}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
