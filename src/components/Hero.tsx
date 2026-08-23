import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent, useSite } from "@/lib/cms";
const portraitImg = "/aman-mishra-portfolio-portrait.png";

type HeroData = {
  available_label: string;
  headline_before: string;
  headline_accent: string;
  headline_after: string;
  subline: string;
  cta_label: string;
  cta_to: string;
  secondary_cta_label?: string;
  secondary_cta_to?: string;
  expertise_label: string;
  expertise: string[];
  portrait_role: string;
  portrait_scope: string;
};

const FALLBACK: HeroData = {
  available_label: "Open to Senior Product Designer opportunities",
  headline_before: "Making complex",
  headline_accent: "financial products",
  headline_after: "clear and trustworthy.",
  subline:
    "I lead complex product work from problem framing through launch, with experience across fintech, AI-assisted products, and design systems.",
  cta_label: "View selected work",
  cta_to: "/work",
  secondary_cta_label: "View résumé",
  secondary_cta_to: "/resume",
  expertise_label: "UX expertise",
  expertise: [
    "0→1 product strategy",
    "UX research",
    "Information architecture",
    "Interaction & visual design",
    "Prototyping & validation",
    "Design systems",
    "Complex financial workflows",
  ],
  portrait_role: "Senior product designer",
  portrait_scope: "Research → launch",
};

export function Hero() {
  const reduce = useReducedMotion();
  const { data: site } = useSite();
  const { data: hero } = useContent<HeroData>("hero", FALLBACK);
  const content = { ...FALLBACK, ...(hero ?? {}) };
  const name = site?.name ?? "Aman Mishra";

  return (
    <section className="container-page relative pb-16 pt-10 sm:pb-20 sm:pt-14 md:pb-32 md:pt-24">
      <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="system-label flex items-center gap-3 text-[var(--color-muted)]"
          >
            <span className="system-dot" />
            {content.available_label}
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[13ch] text-[clamp(2.55rem,12vw,3.15rem)] font-medium leading-[1] tracking-[-0.045em] text-[var(--color-text)] sm:mt-7 sm:text-[clamp(3.15rem,6.4vw,5.25rem)] sm:leading-[0.98] sm:tracking-[-0.05em]"
          >
            {content.headline_before}{" "}
            <span className="font-serif font-normal italic tracking-[-0.025em] text-[var(--color-accent)]">
              {content.headline_accent}
            </span>{" "}
            {content.headline_after}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-[var(--color-muted)] md:text-[17px]"
          >
            {content.subline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col items-stretch gap-4 sm:mt-9 sm:flex-row sm:items-center sm:justify-start sm:gap-6"
          >
            <Link to={content.cta_to} className="btn-primary w-full sm:w-auto">
              {content.cta_label} <ArrowUpRight size={16} />
            </Link>
            {content.secondary_cta_label && content.secondary_cta_to && (
              <Link
                to={content.secondary_cta_to}
                className="story-link mx-auto inline-flex min-h-11 w-fit items-center justify-center gap-2 text-center text-[14px] font-semibold text-[var(--color-text)] sm:mx-0"
              >
                {content.secondary_cta_label} <ArrowUpRight size={15} />
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 border-t border-[var(--color-hairline)] pt-5 sm:mt-14"
          >
            <p className="eyebrow">{content.expertise_label}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {content.expertise.map((item) => (
                <span key={item} className="text-[13px] text-[var(--color-muted)]">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <figure className="relative mx-auto max-w-[410px] lg:ml-auto lg:mr-0">
            <div className="signal-orbit -right-7 -top-7 z-10 hidden md:block" aria-hidden />
            <div className="system-frame relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] shadow-[var(--elevation-3)]">
              <img
                src={site?.profile_image_url || portraitImg}
                alt={name}
                className="h-full w-full object-cover"
                width={1024}
                height={1280}
              />
              <div
                aria-hidden
                className="tech-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_38%)]"
              />
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-[var(--color-inverse)] mix-blend-difference">
                <span className="system-label">AM / 2026</span>
                <span className="system-label">04.5+ YRS</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 rounded-[10px] border border-white/20 bg-black/35 px-3 py-3 text-white backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:gap-4 sm:px-4">
                <div className="flex items-center gap-2">
                  <span className="system-dot" />
                  <span className="system-label">{content.portrait_role}</span>
                </div>
                <span className="system-label hidden opacity-65 sm:block">
                  {content.portrait_scope}
                </span>
              </div>
            </div>
            <figcaption className="grid grid-cols-2 gap-4 border-b border-[var(--color-hairline)] py-4 text-[12px]">
              <div>
                <span className="system-label block text-[var(--color-subtle)]">Currently</span>
                <span className="mt-1 block font-medium text-[var(--color-text)]">
                  Motilal Oswal
                </span>
              </div>
              <div>
                <span className="system-label block text-[var(--color-subtle)]">Based in</span>
                <span className="mt-1 block font-medium text-[var(--color-text)]">
                  {site?.location ?? "Mumbai, India"}
                </span>
              </div>
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
