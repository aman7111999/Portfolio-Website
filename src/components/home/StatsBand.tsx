import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { useContent, useSite } from "@/lib/cms";

type Data = {
  eyebrow: string;
  heading_line1: string;
  heading_accent: string;
  items: { v: string; l: string }[];
  body: string;
};

const FALLBACK: Data = {
  eyebrow: "Evidence",
  heading_line1: "Product work with",
  heading_accent: "real scale and outcomes",
  items: [
    { v: "4.5+", l: "Years in product design" },
    { v: "890K+", l: "Active clients on the current platform" },
    { v: "2M+", l: "Portfolio data points designed for" },
    { v: "9×", l: "Portfolio import growth" },
  ],
  body: "I’m {name}, a Senior Product Designer focused on fintech, AI-assisted experiences, personalisation, and scalable product systems. These figures come from shipped work and the product scale documented in my résumé.",
};

export function StatsBand() {
  const { data: site } = useSite();
  const { data: content } = useContent<Data>("home_stats", FALLBACK);
  const copy = content ?? FALLBACK;
  const body = copy.body.replace("{name}", site?.name ?? "Aman");

  return (
    <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-24 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.4rem,4.2vw,3.7rem)] leading-[1.04] tracking-[-0.04em]">
            {copy.heading_line1}{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              {copy.heading_accent}
            </span>
          </h2>
          <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.75] text-[var(--color-muted-fg)]">
            {body}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4">
            {copy.items.map((metric) => (
              <div
                key={metric.l}
                className="border-b border-[var(--color-hairline)] py-7 sm:px-6 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.05em] text-[var(--color-text)]">
                  <CountUp value={metric.v} />
                </p>
                <p className="mt-3 text-[12px] leading-[1.45] text-[var(--color-muted-fg)]">
                  {metric.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
