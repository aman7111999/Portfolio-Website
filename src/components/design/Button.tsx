import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90",
  secondary:
    "border border-[var(--color-hairline-strong)] text-[var(--color-text)] hover:bg-[var(--color-elevated)]",
  ghost:
    "text-[var(--color-text)] hover:bg-[var(--color-elevated)]",
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-[0_10px_40px_-15px_var(--color-accent-glow)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsLink = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; href?: undefined };
type AsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined };

type Props = AsButton | AsLink | AsAnchor;

export const Button = forwardRef<HTMLElement, Props>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref,
) {
  const cls = clsx(base, sizes[size], variants[variant], className);
  if ("to" in rest && rest.to !== undefined) {
    const { to, ...anchorRest } = rest as AsLink;
    return (
      <Link ref={ref as never} to={to} className={cls} {...(anchorRest as object)}>
        {children}
      </Link>
    );
  }
  if ("href" in rest && rest.href !== undefined) {
    return (
      <a ref={ref as never} className={cls} {...(rest as AsAnchor)}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as never} type="button" className={cls} {...(rest as AsButton)}>
      {children}
    </button>
  );
});
