import { motion, useReducedMotion } from "framer-motion";

/**
 * Impact metrics marquee — auto-scrolling ticker of hiring-manager signals.
 * Coral asterisks between items. Two duplicated tracks for seamless loop.
 */
const METRICS = [
  { value: "4M+", label: "Users impacted" },
  { value: "6", label: "Product teams unified" },
  { value: "0→1", label: "Products shipped" },
  { value: "40%", label: "Faster ship time" },
  { value: "800k+", label: "Merchants served" },
  { value: "7", label: "Countries launched in" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {METRICS.map((m, i) => (
        <div key={i} className="flex items-center gap-10 md:gap-14">
          <div className="flex items-baseline gap-3 whitespace-nowrap">
            <span
              className="font-heavy leading-none text-[var(--color-text)]"
              style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {m.value}
            </span>
            <span className="font-heavy text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)] md:text-[13px]">
              {m.label}
            </span>
          </div>
          <span
            aria-hidden
            className="text-[var(--color-accent)]"
            style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)" }}
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );
}

export function MetricsMarquee() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-label="Impact metrics"
      className="relative overflow-hidden border-y border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-8 md:py-10"
    >
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <Track />
        <Track />
      </motion.div>
    </section>
  );
}
