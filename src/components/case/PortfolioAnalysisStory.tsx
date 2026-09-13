import { useEffect, useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize2,
  Moon,
  MoveVertical,
  Sun,
} from "lucide-react";
import { FullscreenImageViewer } from "@/components/case/FullscreenImageViewer";
import type { ProjectPresentation } from "@/lib/projectPresentation";
import {
  PORTFOLIO_ANALYSIS_HERO_SCREENS,
  PORTFOLIO_ANALYSIS_SCENARIOS,
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
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id ?? "");
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const tabPrefix = useId();

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
  const screenCount = scenarios.reduce((total, scenario) => total + scenario.screens.length, 0);
  const expandedScreen = expandedIndex === null ? null : activeScenario?.screens[expandedIndex];

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
    <section className="portfolio-story-section container-page py-12 md:py-16">
      <div className="mx-auto max-w-[1120px] border-t border-[var(--color-hairline)] pt-12 md:pt-16">
        <div className="portfolio-story-header grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
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
              {scenarios.length} portfolio views · {screenCount} real screen
              {screenCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <motion.ol
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="portfolio-architecture-grid mt-10 grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4"
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
          <div className="portfolio-journey-header grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
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

          <div className="mt-9 flex flex-col gap-3 rounded-[14px] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="shrink-0 px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
              Portfolio view
            </p>
            <div className="min-w-0 flex-1 overflow-x-auto pb-1 sm:pb-0">
              <div
                role="tablist"
                aria-label="Portfolio Analysis scenarios"
                className="flex w-max min-w-full gap-1.5"
              >
                {scenarios.map((scenario, scenarioIndex) => {
                  const selected = scenario.id === activeScenario.id;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      role="tab"
                      id={`${tabPrefix}-tab-${scenario.id}`}
                      aria-controls={`${tabPrefix}-panel`}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectScenario(scenario.id)}
                      onKeyDown={(event) => {
                        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                        event.preventDefault();
                        const nextIndex =
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? scenarios.length - 1
                              : (scenarioIndex +
                                  (event.key === "ArrowRight" ? 1 : -1) +
                                  scenarios.length) %
                                scenarios.length;
                        const next = scenarios[nextIndex];
                        selectScenario(next.id);
                        const tab = document.getElementById(`${tabPrefix}-tab-${next.id}`);
                        tab?.focus();
                        tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
                      }}
                      className={`min-h-11 shrink-0 rounded-[9px] border px-3.5 text-[11px] font-semibold transition-colors sm:text-[12px] ${
                        selected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                          : "border-[var(--color-hairline)] bg-[var(--color-elevated)] text-[var(--color-muted-fg)] hover:border-[var(--color-hairline-strong)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      {scenario.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${tabPrefix}-panel`}
            aria-labelledby={`${tabPrefix}-tab-${activeScenario.id}`}
            className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] shadow-[var(--elevation-1)]"
          >
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--color-hairline)] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="system-label truncate text-[var(--color-accent)]">
                  {activeScenario.eyebrow}
                </p>
                <p
                  aria-live="polite"
                  className="mt-1 truncate text-[11px] text-[var(--color-muted)]"
                >
                  {String(safeScreenIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeScenario.screens.length).padStart(2, "0")}
                  {` · ${activeScreen.title}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <ScreenThemeBadge theme={activeScreen.theme} />
                {activeScenario.screens.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous preview screen"
                      className="portfolio-preview-control"
                      onClick={() =>
                        setActiveScreenIndex(
                          (safeScreenIndex - 1 + activeScenario.screens.length) %
                            activeScenario.screens.length,
                        )
                      }
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next preview screen"
                      className="portfolio-preview-control"
                      onClick={() =>
                        setActiveScreenIndex((safeScreenIndex + 1) % activeScenario.screens.length)
                      }
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="portfolio-journey-panel grid lg:grid-cols-[minmax(285px,360px)_minmax(0,1fr)]">
              <aside className="flex min-h-0 flex-col border-b border-[var(--color-hairline)] p-5 sm:p-7 lg:h-[720px] lg:border-b-0 lg:border-r xl:h-[760px]">
                <h4 className="text-[clamp(1.55rem,2.35vw,2rem)] leading-[1.12] tracking-[-0.03em]">
                  {activeScenario.title}
                </h4>
                <p className="mt-4 text-[14px] leading-6 text-[var(--color-muted-fg)]">
                  {activeScenario.description}
                </p>

                <div className="portfolio-screen-select mt-5">
                  <label
                    htmlFor={`${tabPrefix}-screen`}
                    className="block text-[12px] font-medium text-[var(--color-muted)]"
                  >
                    Choose a screen
                  </label>
                  <select
                    id={`${tabPrefix}-screen`}
                    value={safeScreenIndex}
                    onChange={(event) => setActiveScreenIndex(Number(event.target.value))}
                    className="mt-2 min-h-11 w-full rounded-lg border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-3 text-[13px] text-[var(--color-text)]"
                  >
                    {activeScenario.screens.map((screen, index) => (
                      <option key={screen.id} value={index}>
                        {index + 1} · {screen.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="portfolio-screen-list mt-7 flex min-h-0 flex-1 flex-col border-t border-[var(--color-hairline)] pt-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
                    Choose a screen
                  </p>
                  <div
                    data-lenis-prevent
                    className="mt-3 grid gap-2 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-1 lg:content-start lg:overflow-y-auto lg:overscroll-contain lg:pr-1"
                  >
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
                            <span className="block line-clamp-1 text-[11px] font-semibold">
                              {screen.title}
                            </span>
                            <span className="mt-0.5 hidden line-clamp-1 text-[10px] text-[var(--color-subtle)] xl:block">
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
                key={activeScreen.id}
                screen={activeScreen}
                reduce={!!reduce}
                onExpand={() => setExpandedIndex(safeScreenIndex)}
              />
            </div>
          </div>
        </div>
      </div>

      <FullscreenImageViewer
        image={
          expandedScreen
            ? {
                src: expandedScreen.url,
                alt: expandedScreen.alt,
                label: expandedScreen.title,
                meta: activeScenario.tabLabel,
                caption: expandedScreen.description,
              }
            : null
        }
        index={expandedIndex ?? 0}
        total={activeScenario.screens.length}
        onMove={moveExpanded}
        onClose={() => setExpandedIndex(null)}
      />
    </section>
  );
}

function buildScenarios(story: ProjectPresentation["story"]): PortfolioAnalysisScenario[] {
  const configuredScenarios = story.scenarios.flatMap<PortfolioAnalysisScenario>(
    (scenario, scenarioIndex) => {
      const screens = scenario.screens.flatMap<PortfolioAnalysisScreen>((screen, screenIndex) =>
        screen.image_url
          ? [
              {
                id: screen.id || `scenario-${scenarioIndex + 1}-screen-${screenIndex + 1}`,
                title: screen.title || `Screen ${screenIndex + 1}`,
                description: screen.description,
                url: screen.image_url,
                alt:
                  screen.image_alt ||
                  screen.title ||
                  `Portfolio Analysis screen ${screenIndex + 1}`,
                theme: screen.theme,
              },
            ]
          : [],
      );

      return screens.length
        ? [
            {
              id: scenario.id || `scenario-${scenarioIndex + 1}`,
              tabLabel: scenario.tab_label || `View ${scenarioIndex + 1}`,
              eyebrow: scenario.eyebrow,
              title: scenario.title,
              description: scenario.description,
              screens,
            },
          ]
        : [];
    },
  );

  if (configuredScenarios.length) return configuredScenarios;

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
    <div className="relative h-[min(74svh,680px)] min-h-[520px] overflow-hidden bg-[#090b11] sm:min-h-[600px] lg:h-[720px] xl:h-[760px]">
      <div className="absolute inset-0 opacity-24 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-x-[12%] bottom-[-18%] h-[42%] rounded-full bg-[rgba(83,72,210,.18)] blur-[90px]" />
      <motion.div
        key={screen.id}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="absolute inset-0 p-3 pb-16 sm:p-5 sm:pb-20"
      >
        {failed ? (
          <div className="grid h-full place-items-center text-center text-white">
            <div>
              <ImageOff className="mx-auto text-white/40" size={25} />
              <p className="mt-3 text-[13px] font-semibold">This screen could not be loaded</p>
              <p className="mt-1 text-[11px] text-white/50">Try again in a moment.</p>
            </div>
          </div>
        ) : (
          <div
            data-lenis-prevent
            role="region"
            tabIndex={0}
            aria-label={`Scrollable ${screen.title} flow`}
            className="mx-auto h-full w-full max-w-[520px] touch-pan-y overflow-y-auto overscroll-contain rounded-[24px] border-[5px] border-[#252936] bg-white shadow-[0_30px_80px_rgba(0,0,0,.52)] [-webkit-overflow-scrolling:touch] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d82ff]"
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-3 bg-gradient-to-t from-black/88 via-black/45 to-transparent px-4 pb-4 pt-12 text-white sm:px-5 sm:pb-5">
        {!failed && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/75">
            <MoveVertical size={12} /> Scroll complete flow
          </span>
        )}
        <button
          type="button"
          onClick={onExpand}
          disabled={failed}
          className="pointer-events-auto ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 text-[12px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Maximize2 size={12} /> View full
        </button>
      </div>
    </div>
  );
}
