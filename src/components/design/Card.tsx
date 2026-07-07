import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  interactive,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-[var(--radius-lg)] border border-hairline bg-[var(--color-card)] transition-all duration-300",
        interactive &&
          "hover:border-[var(--color-hairline-strong)] hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-40px_var(--color-accent-glow)]",
        className,
      )}
      {...rest}
    />
  );
}
