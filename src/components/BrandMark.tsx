type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className = "h-9 w-9", title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <rect width="40" height="40" rx="10" fill="var(--brand-mark-bg, #171915)" />
      <path
        d="M7.5 29 13.8 11l6.5 18M10.5 21h7.2"
        fill="none"
        stroke="var(--brand-mark-primary, #f3f2ed)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 29V12l5.7 11 5.8-11v17"
        fill="none"
        stroke="var(--brand-mark-secondary, #a9cab7)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="8.5" r="2.2" fill="var(--brand-mark-signal, #96a3ff)" />
    </svg>
  );
}
