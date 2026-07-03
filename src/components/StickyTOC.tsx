import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type Item = { id: string; label: string };

export function StickyTOC({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
          Chapters
        </p>
        <ul className="space-y-2">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={clsx(
                    "group flex items-center gap-3 text-sm transition-colors duration-300",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  <span className="relative flex h-px w-6 items-center">
                    <span className="absolute inset-0 bg-[var(--color-hairline)]" />
                    <motion.span
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0.5 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "0% 50%" }}
                      className="absolute inset-0 bg-[var(--color-ink)]"
                    />
                  </span>
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
