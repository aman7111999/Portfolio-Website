import { motion, useReducedMotion } from "framer-motion";
import { Globe, Palette, PenTool, Lightbulb, LayoutGrid, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CARDS = [
  { icon: Globe, title: "Get Your Business Online", copy: "Launch your online presence with a professionally designed website that reflects your brand.", span: "md:col-span-6", chip: "Publish" },
  { icon: Palette, title: "Ultra Custom Designs", copy: "Every business is unique — your website should be too.", span: "md:col-span-6", badge: true },
  { icon: PenTool, title: "Design Into Reality", copy: "Bring your vision to life with a seamless design-to-development process.", span: "md:col-span-4" },
  { icon: Lightbulb, title: "Build your Ideas", copy: "", span: "md:col-span-4", center: true },
  { icon: LayoutGrid, title: "Organized and Clean", copy: "A well-structured website enhances user experience and ensures easy navigation.", span: "md:col-span-4", wire: true },
  { icon: TrendingUp, title: "Stand Out in Market", copy: "Distinctive design that positions you above the noise.", span: "md:col-span-12" },
];

export function VisionBento() {
  const reduce = useReducedMotion();

  return (
    <section className="container-page py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Process</p>
        <h2
          className="mt-3 font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-text)]"
          style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}
        >
          Bringing Your <span className="text-[var(--color-accent)]">Vision to Life</span> with
          <br /> Cutting-Edge Design &amp; Development
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-12">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={"card-dark group relative overflow-hidden p-7 " + c.span}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-[var(--color-accent)]">
                <c.icon size={16} />
              </span>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                {c.title}
              </h3>
            </div>
            {c.copy && (
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-[var(--color-muted)]">
                {c.copy}
              </p>
            )}

            {c.chip && (
              <div className="mt-8 flex justify-end">
                <span className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13px] font-semibold text-[var(--color-accent-contrast)] shadow-[0_0_40px_-6px_var(--color-accent-glow)]">
                  {c.chip}
                </span>
              </div>
            )}

            {c.badge && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-2xl font-bold">F</div>
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-2xl">◆</div>
              </div>
            )}

            {c.center && (
              <div className="mt-4 grid place-items-center py-6">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_0_40px_-4px_var(--color-accent-glow)]">
                  <c.icon size={22} />
                </span>
              </div>
            )}

            {c.wire && (
              <div className="mt-6 space-y-1.5 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-elevated)] p-3">
                {[80, 60, 90, 45, 70].map((w, k) => (
                  <div key={k} className="h-1.5 rounded-full bg-[var(--color-hairline-strong)]" style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
