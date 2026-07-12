import { motion, useReducedMotion } from "framer-motion";

/**
 * Wordmark marquee — sits above/below hero.
 * Big kinetic type ticker with coral asterisk dividers.
 */
const WORDS = [
  "Product Designer",
  "Design Systems",
  "0→1 Experiments",
  "AI Interfaces",
  "Fintech",
  "Design Leadership",
];

function Track({ direction = 1 }: { direction?: 1 | -1 }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14">
      {WORDS.map((w, i) => (
        <div key={i} className="flex items-center gap-8 md:gap-14">
          <span
            className="font-heavy uppercase leading-none tracking-[-0.02em] text-[var(--color-text)] whitespace-nowrap"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 5rem)",
              WebkitTextStroke: direction === -1 ? "1.5px currentColor" : undefined,
              color: direction === -1 ? "transparent" : undefined,
            }}
          >
            {w}
          </span>
          <span
            aria-hidden
            className="text-[var(--color-accent)]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
          >
            ✱
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroMarquee({ direction = 1 }: { direction?: 1 | -1 }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden py-3 md:py-4">
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <Track direction={direction} />
        <Track direction={direction} />
      </motion.div>
    </div>
  );
}
