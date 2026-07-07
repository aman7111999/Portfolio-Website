import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/design/Button";
import { useSite } from "@/lib/cms";

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const HEADLINE = "Designing products that help people make confident financial decisions.";

const CHIPS = ["Fintech", "AI Products", "Design Systems"];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Hero — calm, editorial, single focal composition                          */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { data: site } = useSite();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const previewY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-32 md:pt-40"
    >
      {/* ============ Ambient background — extremely restrained ============ */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Grain only. No gradients, no glows, no grid. */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "180px 180px",
          }}
        />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-page relative flex flex-1 flex-col items-center"
      >
        {/* ============ Editorial text block ============ */}
        <div className="mx-auto w-full max-w-[680px] text-center">
          {/* Availability meta */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mono inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            Available for senior roles · 2026
          </motion.div>

          {/* Headline */}
          <h1
            className="display-hero mt-10 text-balance"
            style={{
              fontSize: "clamp(2.15rem, 5.4vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                initial={reduce ? false : { y: "104%", opacity: 0, filter: "blur(12px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                className="block"
              >
                {HEADLINE}
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mx-auto mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-muted)] md:text-[17px]"
          >
            Senior Product Designer with 4.5+ years of experience designing fintech
            products, AI-powered experiences and scalable design systems. Currently
            building investment experiences at{" "}
            <span className="text-[var(--color-text)]">Motilal Oswal</span>.
          </motion.p>

          {/* Chips */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } },
            }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {CHIPS.map((c) => (
              <motion.li
                key={c}
                variants={{
                  hidden: reduce ? {} : { opacity: 0, y: 6 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="mono inline-flex items-center rounded-full border border-hairline px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-muted)]"
              >
                {c}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Button to="/work" variant="accent" size="md">
              View Case Studies <ArrowUpRight size={15} />
            </Button>
            {site?.resume_url && (
              <Button
                href={site.resume_url}
                variant="secondary"
                size="md"
                target="_blank"
                rel="noreferrer"
              >
                <Download size={14} /> Download Resume
              </Button>
            )}
          </motion.div>
        </div>

        {/* ============ Single product preview ============ */}
        <motion.div
          style={{ y: previewY }}
          initial={reduce ? false : { opacity: 0, y: 32, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          className="relative mx-auto mt-24 w-full max-w-5xl md:mt-32"
        >
          <ProductPreview />
        </motion.div>

        <div className="h-24 md:h-32" />
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product preview — a single, refined browser-frame mockup                  */
/* -------------------------------------------------------------------------- */

function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 80, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * 4);
    rx.set(-y * 3);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1400,
      }}
      className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-[var(--color-card)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-[var(--color-elevated)]/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline-strong)]" />
        <div className="mx-auto flex h-6 max-w-md flex-1 items-center justify-center rounded-md border border-hairline bg-[var(--color-bg)] px-3 text-[10px] tracking-wide text-[var(--color-subtle)]">
          motilaloswal · investments
        </div>
        <span className="h-2.5 w-8" />
      </div>

      {/* App body */}
      <div className="grid grid-cols-12 gap-0">
        {/* Sidebar */}
        <div className="col-span-3 hidden flex-col gap-3 border-r border-hairline p-5 md:flex">
          <div className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
            Portfolio
          </div>
          {["Overview", "Holdings", "Insights", "Watchlist", "Orders"].map((l, i) => (
            <div
              key={l}
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] ${
                i === 0
                  ? "bg-[var(--color-elevated)] text-[var(--color-text)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-current opacity-60" />
              {l}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="col-span-12 p-6 md:col-span-9 md:p-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                Total value
              </div>
              <div className="mt-2 font-display text-3xl tracking-tight text-[var(--color-text)] md:text-4xl">
                ₹ 24,86,410
              </div>
              <div className="mt-1 text-[12px] text-emerald-500">+ 2.14 % today</div>
            </div>
            <div className="hidden gap-1 md:flex">
              {["1D", "1W", "1M", "1Y", "All"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] ${
                    i === 2
                      ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Chart */}
          <svg viewBox="0 0 400 120" className="mt-6 h-32 w-full">
            <defs>
              <linearGradient id="ph-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 88 L40 82 L80 90 L120 70 L160 74 L200 58 L240 62 L280 44 L320 48 L360 30 L400 22 L400 120 L0 120 Z"
              fill="url(#ph-grad)"
            />
            <path
              d="M0 88 L40 82 L80 90 L120 70 L160 74 L200 58 L240 62 L280 44 L320 48 L360 30 L400 22"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Rows */}
          <div className="mt-6 divide-y divide-[var(--color-hairline)] border-t border-hairline">
            {[
              ["HDFC Bank", "Banking", "+0.82%"],
              ["Reliance", "Energy", "+1.24%"],
              ["Infosys", "Technology", "−0.31%"],
            ].map(([name, sector, chg]) => (
              <div key={name} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-[13px] text-[var(--color-text)]">{name}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                    {sector}
                  </div>
                </div>
                <div
                  className={`mono text-[12px] ${
                    chg.startsWith("−") ? "text-[var(--color-muted)]" : "text-emerald-500"
                  }`}
                >
                  {chg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
