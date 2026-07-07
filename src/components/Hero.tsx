import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/design/Button";
import { useSite } from "@/lib/cms";

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const HEADLINE_LINES = [
  { plain: "Designing digital", accent: null as string | null },
  { plain: "financial experiences", accent: null },
  { plain: "that transform complexity", accent: null },
  { plain: "into ", accent: "confidence." },
];

const CHIPS = [
  "4.5+ Years",
  "Fintech",
  "AI",
  "Design Systems",
  "0→1 Products",
  "Product Strategy",
  "Accessibility",
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { data: site } = useSite();

  /* --- Parallax on scroll -------------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);


  /* --- Render -------------------------------------------------------------- */
  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-28 md:pt-36"
    >
      {/* ============ Ambient background — calm, static ============ */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Single soft radial wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 700px at 78% 18%, var(--color-accent-wash) 0%, transparent 60%)",
          }}
        />

        {/* Very subtle grid, masked to fade at edges */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-hairline) 1px, transparent 1px)," +
              "linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 45%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 45%, black 30%, transparent 85%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-bg))",
          }}
        />
      </div>


      {/* ============ Content grid ============ */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-page relative flex flex-1 flex-col"
      >
        <div className="grid flex-1 grid-cols-12 items-center gap-x-8 gap-y-14 pb-24 pt-14 md:gap-y-20 md:pb-28 md:pt-24">
          {/* ---------- Left: editorial column ---------- */}
          <div className="col-span-12 lg:col-span-7">
            {/* Meta row */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mono flex items-center gap-3 text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
            >
              <span aria-hidden className="relative inline-flex h-2 w-2">
                <span
                  className="absolute inset-0 rounded-full border border-[var(--color-accent)] opacity-70"
                  style={{
                    animation: "ring-pulse 1.9s cubic-bezier(0.22,1,0.36,1) infinite",
                  }}
                />
                <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span>Available for senior roles · 2026</span>
              <span className="hidden h-px w-6 bg-[var(--color-hairline-strong)] md:inline-block" />
              <span className="hidden md:inline">{site?.location ?? "Mumbai, India"}</span>
            </motion.div>

            {/* Headline */}
            <h1
              className="display-hero mt-10 max-w-[16ch] md:mt-12"
              style={{ fontSize: "clamp(2.75rem, 8.4vw, 6.5rem)" }}
            >
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.18em]">
                  <motion.span
                    initial={reduce ? false : { y: "108%", opacity: 0, filter: "blur(14px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.11, ease: EASE }}
                    className="block"
                  >
                    {line.plain}
                    {line.accent && (
                      <span
                        className="italic"
                        style={{
                          background:
                            "linear-gradient(100deg, var(--color-accent) 0%, var(--color-accent-hover) 60%, var(--color-accent) 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {line.accent}
                      </span>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="mt-10 max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-muted)] md:mt-12 md:text-[19px]"
            >
              <span className="text-[var(--color-text)]">Senior Product Designer</span> with{" "}
              <span className="text-[var(--color-text)]">4.5+ years</span> of experience creating{" "}
              <span className="text-[var(--color-text)]">fintech products</span>,{" "}
              <span className="text-[var(--color-text)]">AI-powered experiences</span> and{" "}
              <span className="text-[var(--color-text)]">scalable design systems</span> used by
              thousands of investors.
            </motion.p>

            {/* Chips */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 1.0 } },
              }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {CHIPS.map((c) => (
                <motion.li
                  key={c}
                  variants={{
                    hidden: reduce ? {} : { opacity: 0, y: 8, filter: "blur(4px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                  className="mono inline-flex items-center rounded-full border border-hairline bg-[var(--color-elevated)]/60 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-hairline-strong)] hover:text-[var(--color-text)]"
                >
                  {c}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA cluster */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } },
              }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              {[
                <Button key="c1" to="/work" variant="accent" size="lg">
                  View Case Studies <ArrowUpRight size={16} />
                </Button>,
                site?.resume_url ? (
                  <Button
                    key="c2"
                    href={site.resume_url}
                    variant="secondary"
                    size="lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={15} /> Download Resume
                  </Button>
                ) : null,
                <Button key="c3" to="/contact" variant="ghost" size="lg">
                  <Mail size={15} /> Let's Connect
                </Button>,
              ]
                .filter(Boolean)
                .map((btn, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: reduce ? {} : { opacity: 0, y: 10, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.6, ease: EASE },
                      },
                    }}
                  >
                    {btn}
                  </motion.div>
                ))}
            </motion.div>

            {/* Company badges */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
              className="mt-16 grid max-w-xl grid-cols-2 gap-3 sm:gap-4"
            >
              <CompanyBadge label="Currently" name="Motilal Oswal" sub="Financial Services" dotClass="bg-emerald-400" />
              <CompanyBadge label="Previously" name="Trinkerr" sub="AI · Social Investing" dotClass="bg-[var(--color-subtle)]" />
            </motion.div>
          </div>

          {/* ---------- Right: visual stage ---------- */}
          <motion.div
            style={{ y: stageY }}
            className="col-span-12 lg:col-span-5"
          >
            <HeroStage />
          </motion.div>

        </div>

        {/* ============ Scroll indicator ============ */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center"
        >
          <div className="mono flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-subtle)]">
            <span className="h-px w-8 bg-[var(--color-hairline-strong)]" />
            Scroll
            <motion.span
              aria-hidden
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-6 w-6 place-items-center rounded-full border border-hairline text-[var(--color-muted)]"
            >
              <ArrowDown size={11} />
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Company badge                                                             */
/* -------------------------------------------------------------------------- */

function CompanyBadge({
  label,
  name,
  sub,
  dotClass,
}: {
  label: string;
  name: string;
  sub: string;
  dotClass: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-[var(--color-card)]/70 p-4 backdrop-blur-md transition-all duration-500 hover:border-[var(--color-hairline-strong)] hover:bg-[var(--color-card)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at 20% 0%, var(--color-accent-wash), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          {label}
        </span>
      </div>
      <p className="relative mt-2 font-display text-[17px] leading-tight tracking-tight text-[var(--color-text)]">
        {name}
      </p>
      <p className="relative mt-0.5 text-[12.5px] text-[var(--color-muted)]">{sub}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero stage — single sharp interface that assembles from blur              */
/*                                                                            */
/*  Signature interaction (Option A):                                         */
/*   The interface assembles from soft, blurred layers into a perfectly       */
/*   sharp product surface over ~1.4s. No parallax, no floating cards, no    */
/*   glow — just one confident, handcrafted resolve.                          */
/* -------------------------------------------------------------------------- */

const STAGE_EASE = [0.22, 1, 0.36, 1] as const;

function stageLayer(delay: number, blur = 18) {
  return {
    initial: { opacity: 0, filter: `blur(${blur}px)`, y: 6 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    transition: { duration: 1.2, delay, ease: STAGE_EASE },
  };
}

function HeroStage() {
  const reduce = useReducedMotion();

  // When reduced-motion is on, skip all blur/transform animations.
  const layer = (delay: number, blur = 18) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1 } }
      : stageLayer(delay, blur);

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[4/5] w-full max-w-[500px] select-none"
    >
      {/* Soft, static plate shadow — no glow, no animation */}
      <div
        className="absolute -inset-4 -z-10 rounded-[32px]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 40%, var(--color-accent-wash), transparent 70%)",
          opacity: 0.6,
        }}
      />

      {/* Card surface — the whole card resolves from a soft blur */}
      <motion.div
        {...layer(0.15, 24)}
        style={{ willChange: "filter, opacity, transform" }}
        className="absolute inset-0 rounded-[24px] border border-[var(--color-hairline-strong)] bg-[var(--color-card)]/90 p-6 shadow-[0_50px_100px_-45px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        {/* Top bar */}
        <motion.div
          {...layer(0.45, 10)}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--color-hairline-strong)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-hairline-strong)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </div>
          <span className="mono text-[9.5px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
            Portfolio · Live
          </span>
        </motion.div>

        {/* Balance */}
        <motion.div {...layer(0.6, 14)} className="mt-7">
          <p className="mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
            Net worth
          </p>
          <p className="mt-2 font-display text-[34px] leading-none tracking-[-0.03em] text-[var(--color-text)]">
            ₹ 24,86,340
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11.5px]">
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
              +12.4%
            </span>
            <span className="text-[var(--color-muted)]">this quarter</span>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div {...layer(0.75, 12)} className="mt-6">
          <svg viewBox="0 0 220 70" className="h-16 w-full">
            <defs>
              <linearGradient id="hero-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 50 L20 46 L40 48 L60 38 L80 42 L100 30 L120 34 L140 22 L160 26 L180 16 L200 20 L220 8"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 1.0, ease: STAGE_EASE }}
            />
            <motion.path
              d="M0 50 L20 46 L40 48 L60 38 L80 42 L100 30 L120 34 L140 22 L160 26 L180 16 L200 20 L220 8 L220 70 L0 70 Z"
              fill="url(#hero-chart)"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.9 }}
            />
          </svg>
        </motion.div>

        {/* Holdings */}
        <div className="mt-5 space-y-2">
          {[
            { t: "Index ETF", s: "NIFTY 50", v: "+2.3%" },
            { t: "AI Basket", s: "Curated", v: "+8.1%" },
            { t: "Bonds", s: "Sovereign", v: "+0.4%" },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              {...layer(0.9 + i * 0.08, 10)}
              className="flex items-center justify-between rounded-lg border border-hairline bg-[var(--color-elevated)]/60 px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-md border border-hairline bg-[var(--color-surface)] mono text-[9.5px] text-[var(--color-muted)]">
                  {r.t[0]}
                </span>
                <div className="leading-tight">
                  <p className="text-[11.5px] text-[var(--color-text)]">{r.t}</p>
                  <p className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                    {r.s}
                  </p>
                </div>
              </div>
              <span className="mono text-[11px] text-emerald-400">{r.v}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

