import { useEffect, useState, type ReactNode } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

// ---------- Cover / Figure primitives ----------

const gradients: Record<string, string> = {
  "gradient-1":
    "radial-gradient(120% 100% at 10% 0%, #F1EDE4 0%, #D9D3C4 45%, #B8AF9C 100%)",
  "gradient-2":
    "radial-gradient(120% 100% at 80% 20%, #F5E9E2 0%, #E5C7B8 40%, #8C6A5C 100%)",
  "gradient-3":
    "radial-gradient(120% 100% at 20% 80%, #E7EDE7 0%, #B6C5BE 40%, #3F5A55 100%)",
  "gradient-4":
    "radial-gradient(120% 100% at 60% 30%, #EDEAF3 0%, #C6BEDA 40%, #4E4570 100%)",
};

export function coverBackground(cover?: string) {
  if (!cover) return gradients["gradient-1"];
  if (cover.startsWith("gradient-")) return gradients[cover] ?? gradients["gradient-1"];
  return `url("${cover}") center/cover no-repeat`;
}

// ---------- Section anchor ----------

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-32 py-16 md:py-24 first:pt-0"
    >
      {(eyebrow || title) && (
        <div className="mb-10 md:mb-14 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            {eyebrow && (
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
                {eyebrow}
              </p>
            )}
          </div>
          {title && (
            <h2 className="font-display text-3xl md:text-5xl md:col-span-9">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-9 md:col-start-4 space-y-6 text-lg leading-relaxed md:text-[19px] md:leading-[1.7]">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

// ---------- Editorial pull quote ----------

export function PullQuote({
  author,
  role,
  children,
}: {
  author?: string;
  role?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-14 md:my-20 border-y border-hairline py-10 md:py-14">
      <blockquote className="font-display text-2xl leading-[1.25] md:text-[2.6rem] md:leading-[1.15] tracking-[-0.02em]">
        <span className="text-[var(--color-accent)] mr-2">"</span>
        {children}
        <span className="text-[var(--color-accent)] ml-1">"</span>
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-6 text-xs uppercase tracking-widest text-[var(--color-muted)]">
          {author}
          {role ? ` · ${role}` : ""}
        </figcaption>
      )}
    </figure>
  );
}

// ---------- Highlight callout ----------

const calloutStyles: Record<string, { label: string; bg: string; ring: string }> = {
  insight:   { label: "Insight",   bg: "bg-[#F1EDE4]", ring: "ring-[#B8AF9C]/40" },
  decision:  { label: "Decision",  bg: "bg-[#EDEAF3]", ring: "ring-[#4E4570]/25" },
  warning:   { label: "Constraint", bg: "bg-[#F5E9E2]", ring: "ring-[#8C6A5C]/30" },
  learning:  { label: "Learning",  bg: "bg-[#E7EDE7]", ring: "ring-[#3F5A55]/30" },
};

export function Callout({
  kind = "insight",
  title,
  children,
}: {
  kind?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[kind] ?? calloutStyles.insight;
  return (
    <aside className={clsx("my-10 rounded-lg p-6 md:p-8 ring-1", s.bg, s.ring)}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {s.label}
      </p>
      {title && <p className="font-display text-xl md:text-2xl mt-2">{title}</p>}
      <div className="mt-3 text-[15px] leading-relaxed md:text-base">{children}</div>
    </aside>
  );
}

// ---------- Metric grid with count-up ----------

import { CountUp } from "@/components/CountUp";

export function MetricGrid({
  items,
}: {
  items: { label: string; value: string; hint?: string }[];
}) {
  return (
    <div className="my-12 grid divide-y divide-[var(--color-hairline)] border-y border-hairline md:grid-cols-4 md:divide-x md:divide-y-0">
      {items.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="p-8"
        >
          <p className="font-display text-4xl md:text-5xl tracking-tight">
            <CountUp value={m.value} />
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-muted)]">
            {m.label}
          </p>
          {m.hint && <p className="mt-2 text-sm text-[var(--color-muted)]">{m.hint}</p>}
        </motion.div>
      ))}
    </div>
  );
}

// ---------- Figure with zoom ----------

export function Figure({
  src,
  alt,
  caption,
  aspect = "16/10",
  cover,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  cover?: string;
}) {
  const [open, setOpen] = useState(false);
  const bg = src ? undefined : coverBackground(cover);
  const zoomable = !!src;

  return (
    <>
      <figure className="my-10">
        <button
          type="button"
          onClick={() => zoomable && setOpen(true)}
          className={clsx(
            "group block w-full overflow-hidden rounded-lg border border-hairline",
            zoomable ? "cursor-zoom-in" : "cursor-default",
          )}
          style={{ aspectRatio: aspect, background: bg }}
          data-cursor={zoomable ? "Zoom" : undefined}
        >
          {src ? (
            <img
              src={src}
              alt={alt ?? caption ?? ""}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
          ) : null}
        </button>
        {caption && (
          <figcaption className="mt-3 text-sm text-[var(--color-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>
      {zoomable && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: src!, alt: alt ?? caption ?? "", description: caption }]}
          plugins={[Zoom, Captions]}
          controller={{ closeOnBackdropClick: true }}
          styles={{ container: { backgroundColor: "rgba(11,11,12,0.94)" } }}
        />
      )}
    </>
  );
}

// ---------- Gallery + lightbox ----------

export function Gallery({
  images,
  columns = 2,
}: {
  images: { src: string; alt?: string; caption?: string }[];
  columns?: 2 | 3;
}) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <div
        className={clsx(
          "my-10 grid gap-4",
          columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline"
            data-cursor="Open"
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={index !== null}
        index={index ?? 0}
        close={() => setIndex(null)}
        slides={images.map((i) => ({ src: i.src, alt: i.alt, description: i.caption }))}
        plugins={[Zoom, Captions]}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(11,11,12,0.94)" } }}
      />
    </>
  );
}

// ---------- Before / After slider ----------

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="my-12 overflow-hidden rounded-lg border border-hairline">
      <div className="relative aspect-[16/10] select-none">
        <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img src={before} alt={beforeLabel} className="h-full w-full object-cover" />
        </div>
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/90"
          style={{ left: `${pos}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal before / after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-widest text-white">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-widest text-white">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}

// ---------- Animated vertical timeline ----------

export function Timeline({
  steps,
}: {
  steps: { title: string; body: string; label?: string }[];
}) {
  return (
    <ol className="my-10 relative border-l border-hairline pl-8">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative pb-10 last:pb-0"
        >
          <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-paper)] ring-1 ring-[var(--color-hairline)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          {s.label && (
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {s.label}
            </p>
          )}
          <p className="font-display text-xl md:text-2xl mt-1">{s.title}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{s.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}

// ---------- Numbered decision steps ----------

export function Steps({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="my-10 grid gap-4 md:grid-cols-2">
      {items.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="rounded-lg border border-hairline p-6"
        >
          <p className="font-display text-3xl text-[var(--color-muted)]">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-3 font-display text-xl">{s.title}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{s.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ---------- Prototype / video / Figma embed ----------

export function Prototype({
  src,
  title,
  aspect = "16/10",
}: {
  src: string;
  title?: string;
  aspect?: string;
}) {
  return (
    <div className="my-12 overflow-hidden rounded-lg border border-hairline bg-[#0b0b0c]">
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        <iframe
          src={src}
          title={title ?? "Prototype"}
          loading="lazy"
          allow="fullscreen; clipboard-write"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

// ---------- Two-up side by side ----------

export function TwoUp({ children }: { children: ReactNode }) {
  return <div className="my-10 grid gap-8 md:grid-cols-2">{children}</div>;
}

// ---------- Animated section divider ----------

export function Divider({ label }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="my-16 flex items-center gap-4">
      <motion.span
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "0% 50%" }}
        className="h-px flex-1 bg-[var(--color-hairline)]"
      />
      {label && (
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {label}
        </span>
      )}
      <motion.span
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "100% 50%" }}
        className="h-px flex-1 bg-[var(--color-hairline)]"
      />
    </div>
  );
}

// ---------- Design system token grid ----------

export function DesignSystemGrid({
  tokens,
}: {
  tokens: { label: string; value: string; swatch?: string }[];
}) {
  return (
    <div className="my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {tokens.map((t) => (
        <div
          key={t.label}
          className="rounded-lg border border-hairline p-5"
        >
          {t.swatch && (
            <div
              className="mb-4 h-16 w-full rounded"
              style={{ background: t.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}
            />
          )}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {t.label}
          </p>
          <p className="mt-1 font-mono text-sm">{t.value}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- MDX component map (provider) ----------

export const mdxComponents = {
  Section,
  PullQuote,
  Callout,
  MetricGrid,
  Figure,
  Gallery,
  BeforeAfter,
  Timeline,
  Steps,
  Prototype,
  TwoUp,
  Divider,
  DesignSystemGrid,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-3xl md:text-5xl mt-16 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-2xl md:text-3xl mt-10 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[17px] leading-[1.75] md:text-[19px] md:leading-[1.75]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 space-y-2 marker:text-[var(--color-muted)]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2 marker:text-[var(--color-muted)]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[var(--color-ink)] font-medium" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="link-underline" {...props} />
  ),
  hr: () => <Divider />,
};

// Re-export for router-level MDXProvider
export { Lightbox };
export { useEffect as _unused }; // noop to keep tree-shaking friendly
