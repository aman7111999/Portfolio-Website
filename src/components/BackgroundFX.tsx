import { clsx } from "clsx";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Subtle blueprint-style dot grid with slow scroll parallax drift.
export function DotGrid({
  className,
  size = 24,
  opacity = 0.28,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 1200], [-6, 6]);
  const y = useSpring(rawY, { stiffness: 40, damping: 20, mass: 0.6 });

  return (
    <motion.div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0", className)}
      style={{
        y: reduce ? 0 : y,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)",
        backgroundSize: `${size}px ${size}px`,
        opacity,
        maskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 100%)",
      }}
    />
  );
}

// Static SVG noise texture. Fixed layer, no scroll listener — keeps compositing cheap.
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        opacity: 0.035,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
