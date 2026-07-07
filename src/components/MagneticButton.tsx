import { useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

type Variant = "primary" | "ghost";

type Props = {
  variant?: Variant;
  to?: string;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90",
  ghost:
    "border border-[var(--color-hairline-strong)] text-[var(--color-text)] hover:bg-[var(--color-elevated)]",
};

export function MagneticButton({
  variant = "primary",
  to,
  href,
  external,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = clsx(
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-tight transition-colors duration-300",
    styles[variant],
    className,
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {to ? (
        <Link to={to} className={cls}>
          {children}
        </Link>
      ) : href ? (
        <a
          href={href}
          className={cls}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {children}
        </a>
      ) : (
        <button type="button" className={cls} {...rest}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
