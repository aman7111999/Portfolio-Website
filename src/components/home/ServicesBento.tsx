import { motion, useReducedMotion } from "framer-motion";
import { Layers, ShoppingBag, Settings2, Sparkles, Zap, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Service = {
  icon: any;
  title: string;
  copy: string;
  span: string;
  visual?: "avatars" | "products" | "radar" | "framer" | "wire";
};

const SERVICES: Service[] = [
  {
    icon: Layers, title: "UI / UX Design",
    copy: "From wireframes to high-fidelity prototypes, I ensure a seamless and engaging interface that aligns with your brand's identity.",
    span: "md:col-span-4", visual: "avatars",
  },
  {
    icon: ShoppingBag, title: "Ecommerce Store",
    copy: "Whether you're launching a new shop or optimizing an existing one, I ensure a smooth shopping experience that drives sales.",
    span: "md:col-span-8", visual: "products",
  },
  {
    icon: Settings2, title: "Website Customization",
    copy: "Websites tailored to your specific needs, from layout adjustments to functionality enhancements.",
    span: "md:col-span-8", visual: "radar",
  },
  {
    icon: Sparkles, title: "Custom Solutions",
    copy: "Bespoke pages, interactions, and CMS setups built for your business.",
    span: "md:col-span-4",
  },
  {
    icon: Zap, title: "Framer Development",
    copy: "From sleek animations to responsive layouts, I leverage Framer's power to create stunning, fast-loading sites that stand out.",
    span: "md:col-span-8", visual: "framer",
  },
  {
    icon: Users, title: "0 → 1 Product Design",
    copy: "Napkin sketches to launched product — research, flows, UI, ship.",
    span: "md:col-span-4",
  },
];

function CardVisual({ kind }: { kind?: Service["visual"] }) {
  if (kind === "avatars") {
    return (
      <div className="mt-6 flex items-end justify-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={
              "rounded-full border-2 " +
              (i === 2
                ? "h-14 w-14 border-[var(--color-accent)] shadow-[0_0_30px_-4px_var(--color-accent-glow)]"
                : "h-10 w-10 border-[var(--color-hairline-strong)] opacity-70")
            }
            style={{
              background: `linear-gradient(135deg, hsl(${i * 60}, 30%, 30%), hsl(${i * 60 + 40}, 40%, 20%))`,
            }}
          />
        ))}
      </div>
    );
  }
  if (kind === "products") {
    return (
      <div className="mt-6 flex items-center justify-center gap-3">
        {["🛍️", "👗", "👟", "📷", "🛒"].map((e, i) => (
          <div
            key={i}
            className="grid h-16 w-16 place-items-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-2xl"
          >
            {e}
          </div>
        ))}
      </div>
    );
  }
  if (kind === "radar") {
    return (
      <div className="relative mt-4 h-40">
        <div className="absolute inset-0 grid place-items-center">
          {[80, 130, 180].map((s, i) => (
            <div
              key={s}
              className="absolute rounded-full border border-[var(--color-hairline-strong)]"
              style={{ width: s, height: s, opacity: 0.6 - i * 0.15 }}
            />
          ))}
          <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_0_40px_-4px_var(--color-accent-glow)]">
            ✦
          </span>
          {[
            { t: 0, l: 30 }, { t: 30, l: 90 }, { t: 70, l: 20 }, { t: 60, l: 80 },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute h-3 w-3 rounded-full bg-[var(--color-accent)]"
              style={{ top: `${p.t}%`, left: `${p.l}%` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "framer") {
    return (
      <div className="mt-6 flex items-center justify-center gap-3">
        {["◆", "F", "▲", "◐"].map((e, i) => (
          <div
            key={i}
            className={
              "grid h-14 w-14 place-items-center rounded-2xl border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-xl font-bold " +
              (i === 1 ? "text-[var(--color-accent)]" : "text-[var(--color-text)]")
            }
          >
            {e}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function ServicesBento() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="container-page py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-text)]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Crafting <span className="text-[var(--color-accent)]">Next-Horizon</span> Experiences
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-muted)]">
          A sharp toolkit that ships product-grade work — design, motion, and
          development under one roof.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-12">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={"card-dark group p-7 " + s.span}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] text-[var(--color-accent)]">
                <s.icon size={16} />
              </span>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                {s.title}
              </h3>
            </div>
            <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-[var(--color-muted)]">
              {s.copy}
            </p>
            <CardVisual kind={s.visual} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
