import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronRight,
  CircleAlert,
  Download,
  Layers3,
  Link2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import type { ProjectPresentation } from "@/lib/projectPresentation";

const EASE = [0.22, 1, 0.36, 1] as const;

type VisualMode = "card" | "hero";

export function PortfolioAnalysisVisual({ mode = "card" }: { mode?: VisualMode }) {
  const large = mode === "hero";

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-[#070b17] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 22%, rgba(99,102,241,.30), transparent 34%), radial-gradient(circle at 82% 76%, rgba(45,212,191,.20), transparent 30%), linear-gradient(145deg,#0c1225 0%,#070b17 66%,#060810 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div
        className={`absolute z-[2] ${large ? "left-5 top-6 sm:left-[7%] sm:top-[11%]" : "left-5 top-5 sm:left-6 sm:top-6 md:left-8 md:top-7"}`}
      >
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e6c1] shadow-[0_0_16px_rgba(85,230,193,.8)]" />
          Unified intelligence
        </div>
        <p
          className={`mt-3 max-w-[12ch] font-medium leading-[.95] tracking-[-0.055em] ${
            large
              ? "text-[clamp(1.75rem,8vw,2.2rem)] sm:text-[clamp(2.2rem,5vw,5.2rem)]"
              : "text-[clamp(1.35rem,6vw,1.8rem)] sm:text-[clamp(1.45rem,3vw,2.8rem)]"
          }`}
        >
          Every holding. One decision layer.
        </p>
        {large && (
          <p className="mt-5 hidden max-w-[36ch] text-[13px] leading-6 text-white/55 sm:block md:text-[15px]">
            Internal Motilal Oswal investments and externally linked portfolios, analysed through
            one consistent mental model.
          </p>
        )}
      </div>

      <div
        className={`absolute z-[2] rounded-[22px] border border-white/10 bg-white/[.07] shadow-[0_28px_80px_rgba(0,0,0,.45)] backdrop-blur-xl ${
          large
            ? "-bottom-[34%] right-[-13%] h-[94%] w-[62%] min-w-[180px] rotate-[3deg] p-3 sm:-bottom-[16%] sm:right-[7%] sm:w-[35%] sm:min-w-[250px] sm:p-4 md:p-5"
            : "-bottom-[28%] right-[-2%] h-[102%] w-[48%] min-w-[145px] rotate-[4deg] p-2.5 sm:-bottom-[24%] sm:right-[5%] sm:w-[40%] sm:min-w-[160px] sm:p-3"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-[9px] uppercase tracking-[.14em] text-white/40">Portfolio health</p>
            <p className="mt-1 text-[13px] font-semibold">Overall analysis</p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#786cff]/20 text-[#a9a2ff]">
            <Sparkles size={14} />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-full bg-black/20 p-1 text-center text-[8px] text-white/45">
          <span className="rounded-full bg-white/10 py-1.5 text-white">Overall</span>
          <span className="py-1.5">MO</span>
          <span className="py-1.5">External</span>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3.5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] text-white/40">Diversification</p>
              <p className="mt-1 text-[18px] font-semibold tracking-[-.04em]">Balanced</p>
            </div>
            <div className="relative h-11 w-11 rounded-full bg-[conic-gradient(#55e6c1_0_42%,#776cff_42%_78%,rgba(255,255,255,.12)_78%)]">
              <span className="absolute inset-[5px] rounded-full bg-[#13192c]" />
            </div>
          </div>
          <div className="mt-4 flex h-11 items-end gap-1">
            {[42, 60, 48, 74, 58, 86, 72, 96].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7165ff]/45 to-[#8f86ff]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[.045] p-3">
            <ShieldCheck size={13} className="text-[#55e6c1]" />
            <p className="mt-2 text-[8px] text-white/40">Risk</p>
            <p className="text-[11px] font-semibold">Moderate</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.045] p-3">
            <TrendingUp size={13} className="text-[#a9a2ff]" />
            <p className="mt-2 text-[8px] text-white/40">Outlook</p>
            <p className="text-[11px] font-semibold">3 actions</p>
          </div>
        </div>
      </div>

      <div
        className={`absolute z-[2] items-center gap-3 ${
          large
            ? "bottom-[10%] left-[7%] hidden sm:flex"
            : "bottom-5 left-5 flex sm:bottom-6 sm:left-6"
        }`}
      >
        <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[.12em] text-white/65 backdrop-blur">
          Internal
        </span>
        <span className="h-px w-5 bg-white/20" />
        <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[.12em] text-white/65 backdrop-blur">
          External
        </span>
      </div>
    </div>
  );
}

const journeyVisuals = [
  {
    icon: Sparkles,
    accent: "#8b82ff",
    screen: <EntryScreen />,
  },
  {
    icon: Layers3,
    accent: "#55e6c1",
    screen: <ScopeScreen />,
  },
  {
    icon: Link2,
    accent: "#f2b86b",
    screen: <SyncScreen />,
  },
  {
    icon: BarChart3,
    accent: "#8b82ff",
    screen: <StockScreen />,
  },
  {
    icon: ShieldCheck,
    accent: "#55e6c1",
    screen: <FundScreen />,
  },
  {
    icon: MessageCircle,
    accent: "#f2b86b",
    screen: <ActionScreen />,
  },
] as const;

const architectureIcons = [WalletCards, Link2, Sparkles, TrendingUp] as const;

export function PortfolioAnalysisCaseVisuals({ story }: { story: ProjectPresentation["story"] }) {
  const reduce = useReducedMotion();
  const [activeJourney, setActiveJourney] = useState(0);
  const journey = story.journey;
  const activeIndex = journey.length ? Math.min(activeJourney, journey.length - 1) : 0;
  const active = journey[activeIndex];
  const visual = journeyVisuals[activeIndex % journeyVisuals.length];
  const ActiveIcon = visual?.icon ?? Sparkles;

  const move = (direction: -1 | 1) => {
    if (!journey.length) return;
    setActiveJourney((activeIndex + direction + journey.length) % journey.length);
  };

  return (
    <section className="container-page py-14 md:py-24">
      <div className="mx-auto max-w-[1040px] border-t border-[var(--color-hairline)] pt-10 md:pt-16">
        <div className="portfolio-story-header grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)] md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">{story.eyebrow}</p>
            <h2 className="mt-4 max-w-[17ch] text-[clamp(2rem,8vw,2.5rem)] leading-[1.08] tracking-[-0.035em] sm:text-[clamp(2.25rem,4vw,3.35rem)] sm:leading-[1.06] sm:tracking-[-0.038em]">
              {story.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-[15px] leading-7 text-[var(--color-muted)]">
            {story.description}
          </p>
        </div>

        <motion.ol
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="portfolio-architecture-grid mt-10 grid border-y border-[var(--color-hairline-strong)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {story.architecture_nodes.slice(0, 4).map((node, index) => {
            const Icon = architectureIcons[index] ?? Sparkles;
            return (
              <li
                key={node.id}
                className="border-b border-[var(--color-hairline)] py-6 last:border-b-0 sm:border-r sm:px-6 sm:[&:nth-child(even)]:border-r-0 lg:border-b-0 lg:[&:nth-child(even)]:border-r lg:last:border-r-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-subtle)]">
                    {node.eyebrow}
                  </p>
                  <Icon size={14} className="text-[var(--color-accent)]" />
                </div>
                <p className="mt-7 text-[15px] font-medium text-[var(--color-text)]">
                  {node.title}
                </p>
                <p className="mt-2 text-[12px] leading-5 text-[var(--color-muted)]">
                  {node.description}
                </p>
              </li>
            );
          })}
        </motion.ol>

        {active && visual && (
          <div className="mt-16 border-t border-[var(--color-hairline)] pt-10 md:mt-24 md:pt-16">
            <div className="portfolio-journey-header grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
              <div>
                <p className="eyebrow text-[var(--color-accent)]">{story.journey_eyebrow}</p>
                <h3 className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.035em]">
                  {story.journey_title}
                </h3>
              </div>
              <p className="max-w-[44ch] text-[14px] leading-6 text-[var(--color-muted)]">
                {story.journey_description}
              </p>
            </div>

            <div className="portfolio-journey-panel mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] lg:grid lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-[#090d19] p-5 sm:min-h-[380px] sm:p-7 md:min-h-[430px] md:p-10"
              >
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:32px_32px]" />
                {active.image_url ? (
                  <img
                    src={active.image_url}
                    alt={active.title}
                    className="relative z-[1] max-h-[370px] w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative z-[1] w-[230px] max-w-[82%]">{visual.screen}</div>
                )}
              </motion.div>

              <div className="flex flex-col justify-between p-5 sm:p-7 md:p-10">
                <div>
                  <div className="flex items-center justify-between gap-6">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--color-subtle)]">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(journey.length).padStart(2, "0")}
                    </p>
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-elevated)]"
                      style={{ color: visual.accent }}
                    >
                      <ActiveIcon size={15} />
                    </span>
                  </div>
                  <h4 className="mt-10 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.12] tracking-[-0.03em]">
                    {active.title}
                  </h4>
                  <p className="mt-4 max-w-[34ch] text-[14px] leading-7 text-[var(--color-muted)]">
                    {active.description}
                  </p>
                </div>

                <div className="mt-12">
                  <div className="flex gap-1.5" aria-label="Journey steps">
                    {journey.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveJourney(index)}
                        aria-label={`Show step ${index + 1}: ${item.title}`}
                        aria-current={index === activeJourney ? "step" : undefined}
                        className="group grid h-11 flex-1 place-items-center"
                      >
                        <span
                          className={`h-1.5 w-full rounded-full transition-colors ${
                            index === activeIndex
                              ? "bg-[var(--color-accent)]"
                              : "bg-[var(--color-hairline-strong)] group-hover:bg-[var(--color-muted)]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label="Previous journey step"
                      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label="Next journey step"
                      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-[24px] border border-white/15 bg-[#f7f8fc] p-2 shadow-[0_24px_60px_rgba(0,0,0,.45)]">
      <div className="mx-auto h-1.5 w-10 rounded-full bg-[#1b2030]/15" />
      <div className="mt-2 min-h-[220px] overflow-hidden rounded-[17px] bg-white p-3 text-[#151827]">
        <div className="flex items-center justify-between border-b border-[#151827]/8 pb-2">
          <p className="text-[8px] font-semibold">{label}</p>
          <span className="h-4 w-4 rounded-full bg-[#edf0f8]" />
        </div>
        {children}
      </div>
    </div>
  );
}

function EntryScreen() {
  return (
    <Phone label="Portfolio">
      <div className="mt-3 rounded-xl bg-[#10162b] p-3 text-white">
        <p className="text-[7px] uppercase tracking-[.14em] text-white/45">New intelligence</p>
        <p className="mt-2 text-[13px] font-semibold leading-tight">
          Know what your portfolio is telling you.
        </p>
        <span className="mt-5 inline-flex rounded-full bg-[#7468ff] px-3 py-1.5 text-[7px] font-semibold">
          Analyse now
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniStat label="Invested" value="₹12.4L" />
        <MiniStat label="Day P&L" value="+1.8%" positive />
      </div>
    </Phone>
  );
}

function ScopeScreen() {
  return (
    <Phone label="Portfolio analysis">
      <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-[#eef0f6] p-1 text-center text-[6px]">
        <span className="rounded-full bg-[#171b2c] py-1.5 text-white">Overall</span>
        <span className="py-1.5">Motilal</span>
        <span className="py-1.5">External</span>
      </div>
      <div className="mt-3 rounded-xl border border-[#171b2c]/8 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[7px] text-[#6d7280]">Total portfolio</p>
            <p className="mt-1 text-[14px] font-semibold">₹24.8L</p>
          </div>
          <div className="relative h-10 w-10 rounded-full bg-[conic-gradient(#7064ff_0_56%,#55cfae_56%_82%,#e8eaf0_82%)]">
            <span className="absolute inset-[5px] rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-[#f4f5f8] p-3 text-[7px]">
        <span>2 portfolio sources</span>
        <ChevronRight size={10} />
      </div>
    </Phone>
  );
}

function SyncScreen() {
  return (
    <Phone label="External portfolio">
      <div className="mt-4 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#ebe9ff] text-[#6659ea]">
          <Link2 size={18} />
        </span>
        <p className="mt-3 text-[12px] font-semibold">Syncing investments</p>
        <p className="mx-auto mt-1 max-w-[20ch] text-[7px] leading-3 text-[#757a87]">
          Securely fetching holdings from your linked broker.
        </p>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#eceef3]">
        <div className="h-full w-[72%] rounded-full bg-[#6f63f4]" />
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f4f5f8] p-3">
        <ShieldCheck size={12} className="text-[#29a881]" />
        <p className="text-[7px] text-[#5d6270]">Consent-led and encrypted</p>
      </div>
    </Phone>
  );
}

function StockScreen() {
  return (
    <Phone label="Stocks analysis">
      <div className="mt-3 rounded-xl bg-[#f5f6f9] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[7px] text-[#757a87]">Diversification</p>
            <p className="mt-1 text-[12px] font-semibold">Concentrated</p>
          </div>
          <CircleAlert size={15} className="text-[#dc7b4f]" />
        </div>
        <div className="mt-3 flex h-8 items-end gap-1">
          {[28, 78, 44, 36, 58, 32].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t-[2px] bg-[#7569f3]"
              style={{ height: `${height}%`, opacity: 0.45 + index * 0.08 }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 rounded-xl border border-[#e8b99f] bg-[#fff8f3] p-3">
        <p className="text-[7px] font-semibold text-[#a95432]">2 areas need attention</p>
        <p className="mt-1 text-[7px] text-[#7d665d]">Sector exposure · stock concentration</p>
      </div>
    </Phone>
  );
}

function FundScreen() {
  return (
    <Phone label="Mutual fund analysis">
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#151827]/8 p-3">
        <div className="relative h-12 w-12 shrink-0 rounded-full bg-[conic-gradient(#4ec7a4_0_68%,#e8eaf0_68%)]">
          <span className="absolute inset-[6px] grid place-items-center rounded-full bg-white text-[8px] font-semibold">
            68
          </span>
        </div>
        <div>
          <p className="text-[7px] text-[#777c89]">Risk alignment</p>
          <p className="mt-1 text-[11px] font-semibold">Moderate</p>
          <p className="mt-1 text-[6px] text-[#777c89]">Matches your current allocation</p>
        </div>
      </div>
      <div className="mt-2 rounded-xl bg-[#f3f4f8] p-3">
        <p className="text-[7px] font-semibold">Fund overlap</p>
        <div className="mt-3 flex gap-1.5">
          <span className="h-3 flex-[5] rounded-full bg-[#6f63f4]" />
          <span className="h-3 flex-[3] rounded-full bg-[#4ec7a4]" />
          <span className="h-3 flex-[2] rounded-full bg-[#dadde7]" />
        </div>
      </div>
    </Phone>
  );
}

function ActionScreen() {
  return (
    <Phone label="Recommended next steps">
      <div className="mt-3 rounded-xl bg-[#11172a] p-3 text-white">
        <p className="text-[7px] text-white/45">Curated IAP portfolio</p>
        <p className="mt-1 text-[12px] font-semibold">Build stronger diversification</p>
        <div className="mt-3 flex items-center justify-between text-[7px] text-white/55">
          <span>View recommendation</span>
          <ChevronRight size={10} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-[#151827]/8 p-3">
          <MessageCircle size={12} className="text-[#6e62ed]" />
          <p className="mt-2 text-[7px] font-semibold">Talk to RM</p>
        </div>
        <div className="rounded-xl border border-[#151827]/8 p-3">
          <Download size={12} className="text-[#2aa983]" />
          <p className="mt-2 text-[7px] font-semibold">Get report</p>
        </div>
      </div>
    </Phone>
  );
}

function MiniStat({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[#f4f5f8] p-3">
      <p className="text-[6px] text-[#777c89]">{label}</p>
      <p className={`mt-1 text-[10px] font-semibold ${positive ? "text-[#189b73]" : ""}`}>
        {value}
      </p>
    </div>
  );
}
