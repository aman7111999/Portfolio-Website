import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Maximize2, Moon, Sun } from "lucide-react";
import type { ProjectRow } from "@/lib/cms";
import {
  FullscreenImageViewer,
  type FullscreenImage,
} from "@/components/case/FullscreenImageViewer";

const EASE = [0.22, 1, 0.36, 1] as const;

const JOURNEY_STAGES = [
  {
    label: "Guest",
    title: "Show value first",
    description: "Let people explore products and preview a real research call before setup.",
  },
  {
    label: "Complete KYC",
    title: "Make the reason clear",
    description: "Connect the setup request to the research and trading access it unlocks.",
  },
  {
    label: "Verification",
    title: "Keep momentum alive",
    description: "Use the waiting time to prepare the account and explain what can happen next.",
  },
  {
    label: "Add funds",
    title: "One useful next step",
    description:
      "Move from account readiness to a funded account without changing the page around it.",
  },
  {
    label: "First trade",
    title: "Turn research into action",
    description: "Bring expert ideas forward when the account is ready to place its first order.",
  },
] as const;

type JourneyTheme = "light" | "dark";
type GalleryImage = ProjectRow["gallery"][number];

function themeImages(images: ProjectRow["gallery"], theme: JourneyTheme) {
  const matched = images.filter((image) =>
    (image.caption ?? "").toLowerCase().includes(`· ${theme}`),
  );
  if (matched.length >= JOURNEY_STAGES.length) return matched.slice(0, JOURNEY_STAGES.length);
  return theme === "light"
    ? images.slice(0, JOURNEY_STAGES.length)
    : images.slice(JOURNEY_STAGES.length, JOURNEY_STAGES.length * 2);
}

export function GuestJourneyHeroVisual({ images }: { images: ProjectRow["gallery"] }) {
  const lightImages = themeImages(images, "light");
  if (lightImages.length < JOURNEY_STAGES.length) return null;

  const first = lightImages[0];
  const last = lightImages[JOURNEY_STAGES.length - 1];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(145deg,var(--color-elevated),var(--color-surface))]">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-38" />
      <div
        aria-hidden
        className="absolute -right-[6%] top-[12%] h-[78%] w-[34%] rounded-full bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] blur-[80px]"
      />

      <div className="guest-journey-hero-status absolute inset-x-0 top-0 z-[2] flex min-h-12 items-center justify-between gap-4 border-b border-[var(--color-hairline)] bg-[color-mix(in_oklab,var(--color-surface)_58%,transparent)] px-4 backdrop-blur-sm sm:min-h-16 sm:px-7 md:px-9">
        <p className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--color-muted)] sm:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          Activation journey
        </p>
        <p className="font-mono text-[9px] text-[var(--color-subtle)] sm:text-[10px]">
          GUEST <span className="px-1 text-[var(--color-accent)]">→</span> FIRST TRADE
        </p>
      </div>

      <div className="guest-journey-hero-mobile relative z-[1] flex h-full items-end justify-center gap-3 px-5 pt-14 sm:hidden">
        {[first, last].map((image, index) => (
          <figure
            key={image.url}
            className={`flex h-[78%] min-w-0 flex-1 flex-col overflow-hidden rounded-t-[11px] border bg-[var(--color-surface)] ${
              index === 1
                ? "border-[color-mix(in_oklab,var(--color-accent)_65%,var(--color-hairline-strong))] shadow-[0_14px_40px_color-mix(in_oklab,var(--color-accent)_16%,transparent)]"
                : "border-[var(--color-hairline-strong)] opacity-72"
            }`}
          >
            <figcaption className="flex min-h-9 items-center gap-1.5 border-b border-[var(--color-hairline)] px-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
              <span className="font-mono text-[var(--color-subtle)]">0{index === 0 ? 1 : 5}</span>
              <span className="truncate">{index === 0 ? "Guest" : "First trade"}</span>
            </figcaption>
            <img
              src={image.url}
              alt={image.caption ?? ""}
              className="min-h-0 w-full flex-1 object-cover object-top"
            />
          </figure>
        ))}
        <span
          aria-hidden
          className="absolute left-1/2 top-[58%] z-[3] grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--elevation-1)]"
        >
          <ArrowRight size={13} />
        </span>
      </div>

      <div className="guest-journey-hero-desktop relative z-[1] hidden h-full items-end justify-center gap-3 px-7 pt-20 sm:flex md:gap-4 md:px-10 lg:px-14">
        {lightImages.map((image, index) => {
          const current = index === lightImages.length - 1;
          return (
            <figure
              key={image.url}
              className={`flex h-[83%] min-w-0 max-w-[190px] flex-1 flex-col overflow-hidden rounded-t-[12px] border bg-[var(--color-surface)] ${
                current
                  ? "border-[color-mix(in_oklab,var(--color-accent)_65%,var(--color-hairline-strong))] shadow-[0_18px_60px_color-mix(in_oklab,var(--color-accent)_16%,transparent)]"
                  : "border-[var(--color-hairline-strong)] opacity-70 shadow-[var(--elevation-1)]"
              }`}
            >
              <figcaption className="flex min-h-10 items-center gap-2 border-b border-[var(--color-hairline)] px-2.5 text-[8px] font-semibold uppercase tracking-[0.07em] text-[var(--color-muted)] md:text-[9px]">
                <span className="font-mono text-[var(--color-subtle)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{JOURNEY_STAGES[index].label}</span>
              </figcaption>
              <img
                src={image.url}
                alt={image.caption ?? ""}
                className="min-h-0 w-full flex-1 object-cover object-top"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export function GuestJourneyCaseVisuals({ images }: { images: ProjectRow["gallery"] }) {
  const reduce = useReducedMotion();
  const [theme, setTheme] = useState<JourneyTheme>("light");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerImage, setViewerImage] = useState<FullscreenImage | null>(null);
  const selectedImages = useMemo(() => themeImages(images, theme), [images, theme]);

  if (selectedImages.length < JOURNEY_STAGES.length) return null;

  const openViewer = (image: GalleryImage, index: number) => {
    setViewerImage({
      src: image.url,
      alt: image.caption ?? `${JOURNEY_STAGES[index].label} ${theme} screen`,
      label: JOURNEY_STAGES[index].label,
      meta: `${theme === "light" ? "Light" : "Dark"} theme · Stage ${index + 1} of 5`,
      caption: `${JOURNEY_STAGES[index].title}. Scroll to explore the complete screen.`,
    });
  };

  return (
    <section
      id="journey"
      className="guest-journey-section container-page scroll-mt-24 py-14 sm:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] border-t border-[var(--color-hairline)] pt-10 md:pt-16">
        <div className="guest-journey-heading grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">Five activation states</p>
            <h2 className="guest-journey-title mt-4 max-w-[18ch] text-[clamp(2.05rem,4vw,3.4rem)] leading-[1.06] tracking-[-0.038em]">
              Every step earns the next ask.
            </h2>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-7 text-[var(--color-muted)]">
              The home page stays familiar while one focused card changes with the user’s account
              state—from seeing why RIISE is useful to placing the first trade.
            </p>
          </div>

          <div
            className="inline-grid min-h-11 grid-cols-2 rounded-[10px] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-1"
            aria-label="Preview theme"
          >
            {(["light", "dark"] as const).map((option) => {
              const selected = theme === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option)}
                  aria-pressed={selected}
                  className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-[7px] px-4 text-[11px] font-semibold capitalize transition-colors ${
                    selected
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  {option === "light" ? <Sun size={12} /> : <Moon size={12} />}
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="guest-journey-mobile mt-10 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Choose a journey stage">
            {JOURNEY_STAGES.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-[11px] font-semibold transition-colors ${
                  activeIndex === index
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                    : "border-[var(--color-hairline-strong)] bg-[var(--color-surface)] text-[var(--color-muted)]"
                }`}
              >
                {String(index + 1).padStart(2, "0")} · {stage.label}
              </button>
            ))}
          </div>

          <motion.article
            key={`${theme}-${activeIndex}`}
            initial={reduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)]"
          >
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--color-hairline)] px-4 py-3">
              <div>
                <p className="system-label text-[var(--color-accent)]">
                  {String(activeIndex + 1).padStart(2, "0")} / {JOURNEY_STAGES[activeIndex].label}
                </p>
                <p className="mt-1 text-[11px] text-[var(--color-subtle)]">
                  {JOURNEY_STAGES[activeIndex].title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openViewer(selectedImages[activeIndex], activeIndex)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--color-hairline-strong)] px-3 text-[10px] font-semibold text-[var(--color-text)]"
              >
                <Maximize2 size={11} /> View full
              </button>
            </div>
            <div
              data-lenis-prevent
              role="region"
              tabIndex={0}
              aria-label={`Scrollable ${JOURNEY_STAGES[activeIndex].label} screen`}
              className="h-[min(68vh,620px)] touch-pan-y overflow-y-auto overscroll-contain bg-[var(--color-elevated)] [-webkit-overflow-scrolling:touch]"
            >
              <img
                src={selectedImages[activeIndex].url}
                alt={selectedImages[activeIndex].caption ?? ""}
                className="block h-auto w-full"
              />
            </div>
            <p className="border-t border-[var(--color-hairline)] p-4 text-[13px] leading-6 text-[var(--color-muted)]">
              {JOURNEY_STAGES[activeIndex].description}
            </p>
          </motion.article>
        </div>

        <ol className="guest-journey-desktop mt-12 hidden grid-cols-5 gap-3 lg:grid xl:gap-4">
          {JOURNEY_STAGES.map((stage, index) => {
            const image = selectedImages[index];
            const current = index === JOURNEY_STAGES.length - 1;
            return (
              <motion.li
                key={`${theme}-${stage.label}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => openViewer(image, index)}
                  className={`group flex w-full flex-col overflow-hidden rounded-[16px] border bg-[var(--color-surface)] text-left transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 ${
                    current
                      ? "border-[color-mix(in_oklab,var(--color-accent)_60%,var(--color-hairline-strong))] shadow-[var(--elevation-2)]"
                      : "border-[var(--color-hairline-strong)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  <span className="flex min-h-12 items-center justify-between gap-2 border-b border-[var(--color-hairline)] px-3">
                    <span className="min-w-0 truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                      <span className="mr-1.5 font-mono text-[var(--color-subtle)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {stage.label}
                    </span>
                    <Maximize2
                      size={12}
                      className="shrink-0 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]"
                    />
                  </span>
                  <span className="block h-[520px] overflow-hidden bg-[var(--color-elevated)] xl:h-[570px]">
                    <img
                      src={image.url}
                      alt={image.caption ?? ""}
                      loading="lazy"
                      className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                  </span>
                  <span className="block min-h-[100px] border-t border-[var(--color-hairline)] p-3">
                    <span className="block text-[12px] font-semibold leading-5 text-[var(--color-text)]">
                      {stage.title}
                    </span>
                    <span className="mt-1.5 block text-[10px] leading-4 text-[var(--color-muted)]">
                      {stage.description}
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ol>

        <div className="guest-journey-rail mt-8 hidden items-center gap-3 border-b border-[var(--color-hairline)] pb-5 text-[10px] text-[var(--color-subtle)] lg:flex">
          <span>Guest</span>
          {JOURNEY_STAGES.slice(1).map((stage) => (
            <span key={stage.label} className="contents">
              <span className="h-px flex-1 bg-[var(--color-hairline-strong)]" />
              <ArrowRight size={11} />
            </span>
          ))}
          <span className="font-medium text-[var(--color-accent)]">First trade</span>
        </div>
      </div>

      <FullscreenImageViewer image={viewerImage} onClose={() => setViewerImage(null)} />
    </section>
  );
}
