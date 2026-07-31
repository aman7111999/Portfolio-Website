import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function PortraitFrame({ src, alt }: { src?: string | null; alt?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  // No image → render a quiet typographic card.
  if (!src) {
    return (
      <div
        ref={ref}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-[var(--color-surface)]"
      >
        <div className="absolute inset-0 flex flex-col justify-between p-[var(--space-6)]">
          <p className="eyebrow">Portrait</p>
          <div>
            <p className="font-display text-4xl italic leading-[1.05] text-[var(--color-text)]">
              {alt ?? "Aman Mishra"}
            </p>
            <p className="mt-[var(--space-2)] text-sm text-[var(--color-muted)]">
              Product Designer, Mumbai
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] border border-hairline"
      style={{ boxShadow: "var(--elevation-3)" }}
    >
      <motion.div
        style={{ y, background: `center/cover url(${src})` }}
        className="absolute inset-[-8%]"
        aria-label={alt}
        role="img"
      />
      <span
        aria-hidden
        className="tech-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_42%)]"
      />
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-[10px] border border-white/20 bg-black/40 px-4 py-3 text-white backdrop-blur-md">
        <p className="system-label flex items-center gap-2">
          <span className="system-dot" /> AM / Product design
        </p>
        <p className="system-label opacity-60">Mumbai / IST</p>
      </div>
    </div>
  );
}
