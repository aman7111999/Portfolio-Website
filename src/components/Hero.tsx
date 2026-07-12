import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "@/lib/cms";

/* -------------------------------------------------------------------------- */
/*  Editorial magazine hero — Warm Sand, Instrument Serif                     */
/* -------------------------------------------------------------------------- */

const HEADLINE_LEAD = "Designing digital financial experiences";
const HEADLINE_ITALIC = "with quiet clarity";
const HEADLINE_TAIL = "& lasting confidence.";

const STATS = [
  { value: "4.5+", label: "Years shipping" },
  { value: "12", label: "Products launched" },
  { value: "03", label: "Design systems" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { data: site } = useSite();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-28 md:pt-36"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <motion.div
        style={{ y, opacity }}
        className="container-page relative"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* -------- Left vertical rail -------- */}
          <aside
            aria-hidden
            className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:gap-24 lg:pt-6 lg:border-r lg:border-hairline"
          >
            <span
              className="rotate-180 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-subtle)]"
              style={{ writingMode: "vertical-lr" }}
            >
              Senior Product Designer
            </span>
            <span
              className="rotate-180 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-subtle)]"
              style={{ writingMode: "vertical-lr" }}
            >
              Portfolio · 2026
            </span>
          </aside>

          {/* -------- Main editorial column -------- */}
          <div className="col-span-12 lg:col-span-11">
            {/* Status line */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]"
            >
              <span className="h-px w-10 bg-[var(--color-hairline-strong)]" />
              <span className="relative inline-flex h-1.5 w-1.5">
                <span
                  className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-70"
                  style={{ animation: "ring-pulse 2s cubic-bezier(0.22,1,0.36,1) infinite" }}
                />
                <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span>Available for senior roles · 2026</span>
              {site?.location && (
                <>
                  <span className="hidden h-px w-6 bg-[var(--color-hairline-strong)] md:inline-block" />
                  <span className="hidden md:inline">{site.location}</span>
                </>
              )}
            </motion.div>

            {/* Editorial headline */}
            <h1
              className="mt-10 max-w-[16ch] font-display leading-[0.92] tracking-[-0.015em] text-[var(--color-text)] md:mt-14"
              style={{
                fontSize: "clamp(2.75rem, 8.6vw, 7rem)",
              }}
            >
              <RevealLine delay={0.15} reduce={reduce}>
                {HEADLINE_LEAD}
              </RevealLine>{" "}
              <RevealLine delay={0.32} reduce={reduce}>
                <span className="italic text-[var(--color-subtle)]">
                  {HEADLINE_ITALIC}
                </span>
              </RevealLine>{" "}
              <RevealLine delay={0.5} reduce={reduce}>
                {HEADLINE_TAIL}
              </RevealLine>
            </h1>

            {/* Meta grid: paragraph + inline stats */}
            <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                className="md:col-span-6 max-w-[52ch] text-[17px] leading-[1.65] text-[var(--color-muted)]"
              >
                <span className="text-[var(--color-text)]">Senior Product Designer</span>{" "}
                with <span className="text-[var(--color-text)]">4.5+ years</span> simplifying
                complex financial environments through rigorous design systems, AI-powered
                interfaces, and human-centred product thinking.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
                className="md:col-span-6 md:pl-10 md:border-l md:border-hairline"
              >
                <dl className="grid grid-cols-3 gap-6">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <dd
                        className="font-display text-4xl leading-none italic text-[var(--color-text)]"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                      >
                        {s.value}
                      </dd>
                      <dt className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                        {s.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>

            {/* CTAs — quiet editorial */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-16"
            >
              <Link
                to="/work"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-text)] px-6 py-3 text-[13px] uppercase tracking-[0.18em] text-[var(--color-inverse)] transition-colors duration-300 hover:bg-[var(--color-accent)]"
              >
                View Case Studies
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              {site?.resume_url && (
                <a
                  href={site.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
                >
                  <Download size={14} />
                  <span className="border-b border-[var(--color-hairline-strong)] pb-1 transition-colors group-hover:border-[var(--color-text)]">
                    Download Resume
                  </span>
                </a>
              )}

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
              >
                <Mail size={14} />
                <span className="border-b border-[var(--color-hairline-strong)] pb-1 transition-colors group-hover:border-[var(--color-text)]">
                  Let's connect
                </span>
              </Link>
            </motion.div>

            {/* Currently / previously — compact */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
              className="mt-20 grid max-w-2xl grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-2"
            >
              <CompanyRow label="Currently" name="Motilal Oswal" sub="Financial Services" active />
              <CompanyRow label="Previously" name="Trinkerr" sub="AI · Social Investing" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function RevealLine({
  children,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-baseline">
      <motion.span
        initial={reduce ? false : { y: "108%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay, ease: EASE }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function CompanyRow({
  label,
  name,
  sub,
  active = false,
}: {
  label: string;
  name: string;
  sub: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-[var(--color-success)]" : "bg-[var(--color-subtle)]"
          }`}
        />
        {label}
      </span>
      <span className="flex-1">
        <span className="block font-display text-xl leading-none text-[var(--color-text)]">
          {name}
        </span>
        <span className="mt-1 block text-[12px] text-[var(--color-muted)]">{sub}</span>
      </span>
    </div>
  );
}
