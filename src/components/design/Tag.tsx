import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export function Tag({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-hairline bg-[var(--color-elevated)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-[var(--color-muted)]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export function Badge({ tone = "muted", children, className }: { tone?: "muted" | "accent"; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase",
        tone === "accent"
          ? "border border-[var(--color-accent)]/30 bg-[var(--color-accent-wash)] text-[var(--color-accent)]"
          : "border border-hairline bg-[var(--color-elevated)] text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
