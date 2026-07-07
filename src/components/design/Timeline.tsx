import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type TimelineItem = {
  id: string;
  title: string;
  meta?: string;
  period?: string;
  body?: ReactNode;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const reduce = useReducedMotion();
  return (
    <ol className="relative">
      <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-hairline)]" />
      {items.map((it, i) => (
        <motion.li
          key={it.id}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-8 pb-10 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-hairline bg-[var(--color-bg)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="font-display text-xl md:text-2xl">{it.title}</p>
            {it.period && <p className="eyebrow">{it.period}</p>}
          </div>
          {it.meta && <p className="mt-1 text-sm text-[var(--color-muted)]">{it.meta}</p>}
          {it.body && <div className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted)]">{it.body}</div>}
        </motion.li>
      ))}
    </ol>
  );
}
