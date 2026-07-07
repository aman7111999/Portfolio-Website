import { CountUp } from "@/components/CountUp";
import { clsx } from "clsx";

export function Metric({
  value,
  label,
  hint,
  align = "left",
  size = "md",
  className,
}: {
  value: string;
  label: string;
  hint?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-5xl",
    lg: "text-4xl md:text-6xl",
  } as const;
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      <p className="eyebrow">{label}</p>
      <p className={clsx("font-display mt-2 leading-none tracking-tight", sizes[size])}>
        <CountUp value={value} />
      </p>
      {hint && <p className="mt-2 text-[13px] text-[var(--color-muted)]">{hint}</p>}
    </div>
  );
}
