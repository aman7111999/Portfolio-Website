import type { ReactNode } from "react";

export function QuoteBlock({
  children,
  author,
  meta,
}: {
  children: ReactNode;
  author?: string;
  meta?: string;
}) {
  return (
    <figure className="card-surface rounded-[var(--radius-lg)] p-8 md:p-10">
      <blockquote className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
        <span className="text-[var(--color-accent)]">“</span>
        {children}
        <span className="text-[var(--color-accent)]">”</span>
      </blockquote>
      {(author || meta) && (
        <figcaption className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-hairline-strong)]" />
          <span className="text-sm">
            {author && <span className="text-[var(--color-text)]">{author}</span>}
            {meta && <span className="ml-2 text-[var(--color-muted)]">{meta}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
