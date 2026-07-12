import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { useSite } from "@/lib/cms";
import { HeroMarquee } from "@/components/HeroMarquee";

/**
 * Salad-inspired hero.
 * - Kinetic wordmark marquees (top + bottom)
 * - Cursor-follow spotlight blob
 * - Floating sticker doodles
 * - HUGE punchy headline mixing bold uppercase sans + italic serif accents
 * - Coral starburst sticker over the key word
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { data: site } = useSite();

  const name = (site?.name ?? "Aman Mishra").toUpperCase();
  const avatar = site?.profile_image_url;
  const initials = (site?.name ?? "AM")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  // Cursor-follow spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bg = useTransform(
    [sx, sy] as never,
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,62,127,0.18), transparent 60%)`,
  );

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: bg }}
      />

      {/* Top marquee */}
      <div className="mb-10 md:mb-14">
        <HeroMarquee direction={1} />
      </div>

      {/* Swirly orbit — pure SVG, spans behind headline */}
      <svg
        aria-hidden
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-[560px] w-full max-w-6xl opacity-70"
      >
        <defs>
          <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff6ea" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ff3e7f" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <motion.path
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          d="M 80 460 C 120 200, 480 60, 780 130 C 1080 200, 1180 360, 1120 520 C 1060 680, 720 760, 460 700 C 200 640, 40 560, 80 460 Z"
          fill="none"
          stroke="url(#orbit)"
          strokeWidth="1.25"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
        {/* Sparkle at the end */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          transform="translate(1108 528)"
        >
          <path
            d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
            fill="#ff3e7f"
          />
        </motion.g>
      </svg>

      <div className="container-page relative">
        {/* Greeting sticker */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-fit items-center gap-3 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-card)] py-2 pl-2 pr-5 shadow-[var(--elevation-2)]"
        >
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[var(--color-accent)] text-[13px] font-black text-[var(--color-accent-contrast)]">
            {avatar ? (
              <img src={avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Hi there! I'm
            </span>
            <span className="font-heavy text-[13px] font-black uppercase tracking-[0.06em] text-[var(--color-text)]">
              {name}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="relative mx-auto mt-14 max-w-5xl text-center">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heavy uppercase leading-[0.94] tracking-[-0.02em] text-[var(--color-text)]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", fontWeight: 900 }}
          >
            <span className="font-heavy" style={{ fontWeight: 900 }}>
              A{" "}
            </span>
            <span
              className="italic text-[var(--color-sticker)]"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: 400,
                textTransform: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Product Designer
            </span>
            <br />
            <span className="font-heavy" style={{ fontWeight: 900 }}>
              OBSESSED WITH THE{" "}
            </span>
            {/* Starburst sticker around "WHY'S" */}
            <span className="relative inline-block align-baseline">
              <svg
                aria-hidden
                viewBox="0 0 200 160"
                className="absolute left-1/2 top-1/2 -z-10 h-[1.9em] w-[3.2em] -translate-x-1/2 -translate-y-1/2"
              >
                <motion.path
                  initial={reduce ? false : { rotate: -20, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  d="M100 8 L118 34 L150 22 L146 56 L180 66 L156 90 L182 116 L148 122 L154 156 L120 142 L102 168 L84 142 L50 156 L56 122 L22 116 L48 90 L24 66 L58 56 L54 22 L86 34 Z"
                  fill="#ff3e7f"
                  transform="translate(0 -4)"
                  style={{ transformOrigin: "100px 84px" }}
                />
              </svg>
              <span
                className="relative italic text-[var(--color-accent-contrast)]"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                Why's
              </span>
            </span>
            <span className="font-heavy" style={{ fontWeight: 900 }}>
              {" "}BEHIND
            </span>
            <br />
            <span className="font-heavy" style={{ fontWeight: 900 }}>
              EVERY PRODUCT.
            </span>
          </motion.h1>

          {/* Pill: "Merchant experiences at ..." */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 inline-flex items-center gap-3 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-card)] px-5 py-2 shadow-[var(--elevation-2)]"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Currently designing at
            </span>
            <span className="font-heavy text-[13px] font-black uppercase tracking-[0.04em] text-[var(--color-text)]">
              {"Fintech"}
            </span>
          </motion.div>

          {/* Email CTA below hero */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            {site?.email && (
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-heavy text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-contrast)] shadow-[var(--elevation-accent)] transition-transform hover:scale-[1.03]"
              >
                Email me
                <Mail size={15} />
              </a>
            )}
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline-strong)] px-6 py-3 font-heavy text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)]"
            >
              See the work
            </a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-14 flex justify-center"
          >
            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--color-hairline-strong)] p-1">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="block h-2 w-1 rounded-full bg-[var(--color-muted)]"
              />
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating sticker doodles */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[6%] top-[38%] hidden md:block"
            animate={{ y: [0, -14, 0], rotate: [-8, 4, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72">
              <path
                d="M36 4 L44 26 L68 30 L50 46 L56 68 L36 56 L16 68 L22 46 L4 30 L28 26 Z"
                fill="var(--color-accent)"
                opacity="0.9"
              />
            </svg>
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-[28%] hidden md:block"
            animate={{ y: [0, 16, 0], rotate: [6, -8, 6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
              <path
                d="M4 30 Q22 4, 45 30 T86 30"
                stroke="var(--color-sticker)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[14%] bottom-[18%] hidden md:block"
            animate={{ y: [0, -10, 0], rotate: [-4, 8, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="20" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeDasharray="4 6" />
              <circle cx="30" cy="30" r="4" fill="var(--color-accent)" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Bottom marquee */}
      <div className="mt-16 md:mt-20">
        <HeroMarquee direction={-1} />
      </div>
    </section>
  );
}

