import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Global cursor: solid accent-red dot with a soft trailing delay.
// Scales up over interactive elements. Hidden on touch / reduced motion.
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Softer spring => visible trailing delay.
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.9 });
  const raf = useRef(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pointerFine || reduce) return;
    setEnabled(true);

    const flush = () => {
      if (pending.current) {
        x.set(pending.current.x);
        y.set(pending.current.y);
        pending.current = null;
      }
      raf.current = 0;
    };
    const onMove = (e: PointerEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) raf.current = requestAnimationFrame(flush);

      const target = e.target as HTMLElement | null;
      const clickable = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor], .group"
      );
      setActive(clickable);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: active ? 1.5 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--color-accent)" }}
        />
      </motion.div>
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          html, body { cursor: none; }
          a, button, [role='button'], input, textarea, select, label { cursor: none; }
        }
      `}</style>
    </>
  );
}
