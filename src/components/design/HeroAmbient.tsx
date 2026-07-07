import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "framer-motion";

/**
 * Restrained ambient hero background: single gradient mesh that
 * follows the cursor slowly, dot grid, and a soft vignette.
 * No fake product screenshots — the UI should disappear.
 */
export function HeroAmbient() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 40, damping: 25, mass: 1 });
  const smy = useSpring(my, { stiffness: 40, damping: 25, mass: 1 });

  const glow = useTransform<number, string>([smx, smy] as never, ([x, y]: number[]) =>
    `radial-gradient(600px circle at ${x}% ${y}%, var(--color-accent-glow) 0%, transparent 55%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      aria-hidden
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      {/* Base gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px circle at 15% -10%, var(--color-accent-wash) 0%, transparent 40%), " +
            "radial-gradient(900px circle at 85% 110%, var(--color-accent-wash) 0%, transparent 45%)",
        }}
      />

      {/* Cursor-reactive glow */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at center, black 40%, transparent 100%)",
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </div>
  );
}
