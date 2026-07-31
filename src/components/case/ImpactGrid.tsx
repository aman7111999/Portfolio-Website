import { motion, useReducedMotion } from "framer-motion";

export function ImpactGrid({
  items,
}: {
  items: { label: string; value: string; hint?: string }[];
}) {
  const reduce = useReducedMotion();
  if (!items.length) return null;

  return (
    <div className="grid border-y border-[var(--color-hairline-strong)] md:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={`${item.label}-${index}`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[var(--color-hairline)] py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
        >
          <p className="eyebrow">{item.label}</p>
          <p className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.05em] text-[var(--color-accent)]">
            {item.value}
          </p>
          {item.hint && (
            <p className="mt-4 max-w-[28ch] text-[13px] leading-[1.55] text-[var(--color-muted)]">
              {item.hint}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
