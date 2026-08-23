import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize2,
  Moon,
  MoveVertical,
  Sun,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import type { ProjectPresentation } from "@/lib/projectPresentation";
import {
  PORTFOLIO_ANALYSIS_HERO_SCREENS,
  PORTFOLIO_ANALYSIS_SCENARIOS,
  PORTFOLIO_ANALYSIS_SCREEN_COUNT,
  type PortfolioAnalysisScenario,
  type PortfolioAnalysisScreen,
} from "@/data/portfolioAnalysisScreens";

const EASE = [0.22, 1, 0.36, 1] as const;

type VisualMode = "card" | "hero";

export function PortfolioAnalysisVisual({ mode = "card" }: { mode?: VisualMode }) {
  const large = mode === "hero";

  return (
    <div
      role={large ? "img" : undefined}
      aria-label={
        large
          ? "Real Portfolio Analysis screens for Motilal Oswal and external stocks and mutual funds"
          : undefined
      }
      aria-hidden={large ? undefined : true}
      className="absolute inset-0 overflow-hidden bg-[#080a10] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(105,92,255,.28), transparent 34%), radial-gradient(circle at 88% 78%, rgba(49,210,171,.16), transparent 30%), linear-gradient(145deg,#11162a 0%,#080a10 64%,#050609 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-x-0 top-0 z-[5] flex h-10 items-center justify-between border-b border-white/10 bg-black/10 px-4 backdrop-blur-sm sm:h-12 sm:px-6">
        <span className="inline-flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/68 sm:text-[9px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5ee5bd] shadow-[0_0_14px_rgba(94,229,189,.75)]" />
          Portfolio intelligence
        </span>
        <span className="font-mono text-[8px] tracking-[0.12em] text-white/45 sm:text-[9px]">
          MO + EXTERNAL
        </span>
      </div>

      <div
        className={`absolute z-[4] ${
          large
            ? "left-[6%] top-[22%] hidden max-w-[34%] sm:block"
            : "left-[5%] top-[28%] max-w-[39%]"
        }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/45 sm:text-[10px]">
          Stocks · Mutual funds
        </p>
        <p
          className={`mt-2 font-medium leading-[.98] tracking-[-0.045em] ${
            large ? "text-[clamp(1.8rem,3.65vw,4rem)]" : "text-[clamp(1rem,2.6vw,2rem)]"
          }`}
        >
          Four views.
          <br />
          One analysis model.
        </p>
        {large && (
          <p className="mt-4 max-w-[34ch] text-[11px] leading-5 text-white/52 md:text-[13px] md:leading-6">
            Real product screens across internal and linked portfolios, with light and dark states.
          </p>
        )}
      </div>

      {large ? (
        <>
          <div className="absolute inset-0 sm:hidden">
            <ProductScreenFrame
              src={PORTFOLIO_ANALYSIS_HERO_SCREENS.externalStocks}
              label="External stocks"
              className="left-[8%] top-[16%] h-[94%] w-[43%] -rotate-[4deg]"
              priority
            />
            <ProductScreenFrame
              src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moMutualFunds}
              label="MO mutual funds"
              className="left-[50%] top-[22%] h-[96%] w-[43%] rotate-[4deg]"
              priority
            />
          </div>
          <div className="absolute inset-0 hidden sm:block">
            <ProductScreenFrame
              src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moStocks}
              label="MO stocks"
              className="left-[41%] top-[28%] h-[86%] w-[20%] -rotate-[4deg] opacity-90"
            />
            <ProductScreenFrame
              src={PORTFOLIO_ANALYSIS_HERO_SCREENS.externalStocks}
              label="External stocks"
              className="left-[58%] top-[10%] h-[96%] w-[22%]"
              priority
            />
            <ProductScreenFrame
              src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moMutualFunds}
              label="MO mutual funds"
              className="left-[77%] top-[21%] h-[91%] w-[21%] rotate-[4deg]"
              priority
            />
          </div>
        </>
      ) : (
        <div className="absolute inset-0">
          <ProductScreenFrame
            src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moStocks}
            label="MO stocks"
            className="left-[48%] top-[20%] h-[96%] w-[21%] -rotate-[4deg] opacity-85"
          />
          <ProductScreenFrame
            src={PORTFOLIO_ANALYSIS_HERO_SCREENS.externalStocks}
            label="External stocks"
            className="left-[64%] top-[8%] h-[103%] w-[23%]"
            priority
          />
          <ProductScreenFrame
            src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moMutualFunds}
            label="MO mutual funds"
            className="left-[82%] top-[18%] h-[99%] w-[22%] rotate-[4deg]"
          />
        </div>
      )}
    </div>
  );
}

function ProductScreenFrame({
  src,
  label,
  className,
  priority = false,
}: {
  src: string;
  label: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`absolute z-[3] flex min-w-[78px] flex-col overflow-hidden rounded-t-[13px] border border-white/15 bg-[#11131a] shadow-[0_26px_70px_rgba(0,0,0,.48)] ${className}`}
    >
      <figcaption className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-[#10131b]/95 px-2 text-[6px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:h-8 sm:text-[7px]">
        <span className="h-1 w-1 rounded-full bg-[#5ee5bd]" />
        <span className="truncate">{label}</span>
      </figcaption>
      <img
        src={src}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="min-h-0 w-full flex-1 object-cover object-top"
      />
    </figure>
  );
}

export function PortfolioAnalysisCaseVisuals({ story }: { story: ProjectPresentation["story"] }) {
  const reduce = useReducedMotion();
  const scenarios = useMemo(() => buildScenarios(story), [story]);
  const fallbackStart = scenarios.find((scenario) => scenario.id === "external-stocks")?.id;
  const [activeScenarioId, setActiveScenarioId] = useState(fallbackStart ?? scenarios[0]?.id ?? "");
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!scenarios.some((scenario) => scenario.id === activeScenarioId)) {
      setActiveScenarioId(scenarios[0]?.id ?? "");
      setActiveScreenIndex(0);
    }
  }, [activeScenarioId, scenarios]);

  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];
  const safeScreenIndex = activeScenario
    ? Math.min(activeScreenIndex, activeScenario.screens.length - 1)
    : 0;
  const activeScreen = activeScenario?.screens[safeScreenIndex];
  const usingCmsScreens = scenarios[0]?.id === "cms-selected-journey";
  const screenCount = scenarios.reduce((total, scenario) => total + scenario.screens.length, 0);

  const selectScenario = (id: string) => {
    setActiveScenarioId(id);
    setActiveScreenIndex(0);
    setExpandedIndex(null);
  };

  const moveExpanded = (direction: -1 | 1) => {
    if (!activeScenario || expandedIndex === null) return;
    const next =
      (expandedIndex + direction + activeScenario.screens.length) % activeScenario.screens.length;
    setExpandedIndex(next);
    setActiveScreenIndex(next);
  };

  if (!activeScenario || !activeScreen) return null;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] border-t border-[var(--color-hairline)] pt-12 md:pt-16">
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">{story.eyebrow}</p>
            <h2 className="mt-4 max-w-[17ch] text-[clamp(2.25rem,4vw,3.45rem)] leading-[1.06] tracking-[-0.038em]">
              {story.title}
            </h2>
          </div>
          <div>
            <p className="max-w-[50ch] text-[15px] leading-7 text-[var(--color-muted-fg)]">
              {story.description}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
              {usingCmsScreens
                ? `${screenCount} CMS-selected screens`
                : `4 portfolio views · ${PORTFOLIO_ANALYSIS_SCREEN_COUNT} real screens`}
            </p>
          </div>
        </div>

        <motion.ol
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mt-10 grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {story.architecture_nodes.slice(0, 4).map((node, index) => (
            <li
              key={node.id}
              className="border-b border-[var(--color-hairline)] py-6 last:border-b-0 sm:border-r sm:px-6 sm:[&:nth-child(even)]:border-r-0 lg:border-b-0 lg:[&:nth-child(even)]:border-r lg:last:border-r-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
                  {node.eyebrow}
                </p>
                <span className="font-mono text-[9px] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-7 text-[15px] font-medium text-[var(--color-text)]">{node.title}</p>
              <p className="mt-2 text-[12px] leading-5 text-[var(--color-muted-fg)]">
                {node.description}
              </p>
            </li>
          ))}
        </motion.ol>

        <div className="mt-20 border-t border-[var(--color-hairline)] pt-12 md:mt-24 md:pt-16">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
            <div>
              <p className="eyebrow text-[var(--color-accent)]">{story.journey_eyebrow}</p>
              <h3 className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.035em]">
                {story.journey_title}
              </h3>
            </div>
            <p className="max-w-[48ch] text-[14px] leading-6 text-[var(--color-muted-fg)]">
              {story.journey_description}
            </p>
          </div>

          <div className="mt-9 overflow-x-auto pb-1">
            <div
              role="tablist"
              aria-label="Portfolio Analysis scenarios"
              className="grid min-w-[790px] rounded-[12px] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-1"
              style={{ gridTemplateColumns: `repeat(${scenarios.length}, minmax(0, 1fr))` }}
            >
              {scenarios.map((scenario) => {
                const selected = scenario.id === activeScenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectScenario(scenario.id)}
                    className={`min-h-12 rounded-[9px] px-3 text-[11px] font-semibold transition-colors ${
                      selected
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                        : "text-[var(--color-muted-fg)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {scenario.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] shadow-[var(--elevation-1)]">
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--color-hairline)] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="system-label truncate text-[var(--color-accent)]">
                  {activeScenario.eyebrow}
                </p>
                <p className="mt-1 truncate text-[11px] text-[var(--color-subtle)]">
                  {String(safeScreenIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeScenario.screens.length).padStart(2, "0")}
                </p>
              </div>
              <ScreenThemeBadge theme={activeScreen.theme} />
            </div>

            <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
              <aside className="border-b border-[var(--color-hairline)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <h4 className="text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.12] tracking-[-0.03em]">
                  {activeScenario.title}
                </h4>
                <p className="mt-4 text-[14px] leading-6 text-[var(--color-muted-fg)]">
                  {activeScenario.description}
                </p>

                <div className="mt-7 border-t border-[var(--color-hairline)] pt-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
                    Choose a screen
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    {activeScenario.screens.map((screen, index) => {
                      const selected = index === safeScreenIndex;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => setActiveScreenIndex(index)}
                          aria-pressed={selected}
                          className={`flex min-h-12 items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                            selected
                              ? "border-[color-mix(in_oklab,var(--color-accent)_55%,var(--color-hairline-strong))] bg-[var(--color-accent-wash)] text-[var(--color-text)]"
                              : "border-[var(--color-hairline)] text-[var(--color-muted-fg)] hover:border-[var(--color-hairline-strong)] hover:text-[var(--color-text)]"
                          }`}
                        >
                          <span className="font-mono text-[9px] text-[var(--color-subtle)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[11px] font-semibold">
                              {screen.title}
                            </span>
                            <span className="mt-0.5 hidden truncate text-[10px] text-[var(--color-subtle)] xl:block">
                              {screen.description}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <ScreenViewer
                screen={activeScreen}
                reduce={!!reduce}
                onExpand={() => setExpandedIndex(safeScreenIndex)}
              />
            </div>
          </div>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {expandedIndex !== null && activeScenario.screens[expandedIndex] && (
              <ScreenLightbox
                key={activeScenario.screens[expandedIndex].id}
                screen={activeScenario.screens[expandedIndex]}
                index={expandedIndex}
                total={activeScenario.screens.length}
                reduce={!!reduce}
                onMove={moveExpanded}
                onClose={() => setExpandedIndex(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function buildScenarios(story: ProjectPresentation["story"]): PortfolioAnalysisScenario[] {
  const cmsScreens = story.journey.flatMap<PortfolioAnalysisScreen>((item, index) =>
    item.image_url
      ? [
          {
            id: item.id || `cms-screen-${index + 1}`,
            title: item.title || `Screen ${index + 1}`,
            description: item.description,
            url: item.image_url,
            alt: item.title || `Portfolio Analysis screen ${index + 1}`,
            theme: "mixed",
          },
        ]
      : [],
  );

  if (!cmsScreens.length) return PORTFOLIO_ANALYSIS_SCENARIOS;

  return [
    {
      id: "cms-selected-journey",
      tabLabel: "Selected journey",
      eyebrow: "CMS-selected screens",
      title: story.journey_title,
      description: story.journey_description,
      screens: cmsScreens,
    },
  ];
}

function ScreenThemeBadge({ theme }: { theme: PortfolioAnalysisScreen["theme"] }) {
  const dark = theme === "dark";
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-elevated)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted-fg)]">
      {dark ? <Moon size={10} /> : <Sun size={10} />}
      {theme === "mixed" ? "Uploaded" : `${theme} theme`}
    </span>
  );
}

function ScreenViewer({
  screen,
  reduce,
  onExpand,
}: {
  screen: PortfolioAnalysisScreen;
  reduce: boolean;
  onExpand: () => void;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [screen.url]);

  return (
    <div className="relative h-[min(72svh,680px)] min-h-[500px] overflow-hidden bg-[#090b11] sm:min-h-[580px] md:h-[720px]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:28px_28px]" />
      <motion.div
        key={screen.id}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="absolute inset-0 p-4 pb-20 sm:p-7 sm:pb-24"
      >
        {failed ? (
          <div className="grid h-full place-items-center text-center text-white">
            <div>
              <ImageOff className="mx-auto text-white/40" size={25} />
              <p className="mt-3 text-[13px] font-semibold">This screen could not be loaded</p>
              <p className="mt-1 text-[11px] text-white/50">
                Replace it from the CMS and try again.
              </p>
            </div>
          </div>
        ) : (
          <div
            data-lenis-prevent
            role="region"
            tabIndex={0}
            aria-label={`Scrollable ${screen.title} flow`}
            className="mx-auto h-full w-full max-w-[440px] touch-pan-y overflow-y-auto overscroll-contain rounded-[28px] border-[7px] border-[#252936] bg-white shadow-[0_34px_90px_rgba(0,0,0,.55)] [-webkit-overflow-scrolling:touch] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d82ff]"
          >
            <img
              src={screen.url}
              alt={screen.alt}
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              className="block h-auto w-full"
            />
          </div>
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-3 bg-gradient-to-t from-black/88 via-black/45 to-transparent px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-5">
        {!failed && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/75">
            <MoveVertical size={12} /> Scroll complete flow
          </span>
        )}
        <button
          type="button"
          onClick={onExpand}
          disabled={failed}
          className="pointer-events-auto ml-auto inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 text-[10px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Maximize2 size={12} /> View full
        </button>
      </div>
    </div>
  );
}

function ScreenLightbox({
  screen,
  index,
  total,
  reduce,
  onMove,
  onClose,
}: {
  screen: PortfolioAnalysisScreen;
  index: number;
  total: number;
  reduce: boolean;
  onMove: (direction: -1 | 1) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && total > 1) onMove(-1);
      if (event.key === "ArrowRight" && total > 1) onMove(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onMove, total]);

  return (
    <motion.div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${screen.title} at full size`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] touch-pan-y overflow-y-auto overscroll-contain bg-black/94 backdrop-blur-md [-webkit-overflow-scrolling:touch]"
    >
      <div className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-3 border-b border-white/15 bg-black/78 px-3 text-white backdrop-blur-md sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] sm:text-[12px]">
            {screen.title}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-white/55 sm:text-[11px]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · Scroll for the
            complete flow
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(-1);
                }}
                aria-label="Previous screen"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/8 text-white transition-colors hover:bg-white/18"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(1);
                }}
                aria-label="Next screen"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/8 text-white transition-colors hover:bg-white/18"
              >
                <ChevronRight size={17} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full-screen image"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto w-full max-w-[760px] px-3 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6"
      >
        <img
          src={screen.url}
          alt={screen.alt}
          className="block h-auto w-full rounded-[var(--radius-md)] bg-white shadow-2xl"
        />
        <figcaption className="px-1 pt-4 text-[12px] leading-6 text-white/66 sm:text-[13px]">
          {screen.description} Press Esc or use the close button to return to the case study.
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
