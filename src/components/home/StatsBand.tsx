import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { useContent } from "@/lib/cms";

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
  heading_line1: "From first sketch",
  heading_accent: "to shipped product",
  items: [
    { v: "1.6M+", l: "Designed for real scale" },
    { v: "4.5+", l: "Years simplifying complexity" },
    { v: "1 obsession", l: "Make hard things obvious" },
  ],
  body: "Most of my work has been in investing products, where a screen can carry a lot of data and still needs to feel calm. I enjoy working through that mess with product and engineering until the next step feels obvious.",
  quote: "I enjoy the moment when a complicated flow finally feels obvious.",
};

export function StatsBand() {
  const { data: content } = useContent<Data>("home_stats", FALLBACK);
  const copy = content ?? FALLBACK;

  return (
    <section className="border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-16 sm:py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">About / the person behind the pixels</p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(2.55rem,9vw,4rem)] font-medium leading-[1.01] tracking-[-0.05em] sm:text-[clamp(3.35rem,5.6vw,5.4rem)] sm:leading-[0.98]">
                I like complicated problems.
                <span className="mt-1 block font-serif font-normal italic text-[var(--color-accent)]">
                  I just don’t like complicated products.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p className="max-w-[46ch] text-[15px] leading-[1.78] text-[var(--color-muted)] sm:text-[16px]">
                A lot of my work lives where money, data and decisions meet. Those products can get
                complicated fast. I enjoy getting into that mess, finding what actually matters and
                making the next step feel surprisingly obvious.
              </p>
              <Link
                to="/about"
                className="story-link mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold"
              >
                Read the story <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-hairline-strong)] pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-16 lg:pt-10">
          <Reveal className="lg:col-span-7">
            <div className="grid sm:grid-cols-3">
              {copy.items.slice(0, 3).map((metric, index) => (
                <div
                  key={metric.l}
                  className="border-b border-[var(--color-hairline)] py-5 first:pt-0 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:py-0 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <p className="text-[clamp(2.35rem,5vw,3.7rem)] font-medium leading-none tracking-[-0.055em] text-[var(--color-text)]">
                    <CountUp value={metric.v} />
                  </p>
                  <p className="mt-3 max-w-[18ch] text-[12px] leading-[1.5] text-[var(--color-muted)]">
                    {metric.l}
                  </p>
                  <span className="mt-5 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)] sm:block">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9">
            <blockquote className="max-w-[27ch] font-serif text-[clamp(1.75rem,3vw,2.45rem)] italic leading-[1.2] tracking-[-0.02em] text-[var(--color-text)]">
              “The part I enjoy most is when ‘this is complicated’ quietly becomes ‘of course it works like this.’”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
