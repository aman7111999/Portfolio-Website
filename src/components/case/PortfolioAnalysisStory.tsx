import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
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
        className={`absolute z-[2] ${large ? "left-[7%] top-[11%]" : "left-6 top-6 md:left-8 md:top-7"}`}
      >
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e6c1] shadow-[0_0_16px_rgba(85,230,193,.8)]" />
          Unified intelligence
        </div>
        <p
          className={`mt-3 max-w-[12ch] font-medium leading-[.95] tracking-[-0.055em] ${
            large ? "text-[clamp(2.2rem,5vw,5.2rem)]" : "text-[clamp(1.45rem,3vw,2.8rem)]"
          }`}
        >
          Every holding. One decision layer.
        </p>
        {large && (
          <p className="mt-5 max-w-[36ch] text-[13px] leading-6 text-white/55 md:text-[15px]">
            Internal Motilal Oswal investments and externally linked portfolios, analysed through
            one consistent mental model.
          </p>
        )}
      </div>

      <div
        className={`absolute z-[2] rounded-[22px] border border-white/10 bg-white/[.07] shadow-[0_28px_80px_rgba(0,0,0,.45)] backdrop-blur-xl ${
          large
            ? "-bottom-[16%] right-[7%] h-[92%] w-[35%] min-w-[250px] rotate-[3deg] p-4 md:p-5"
            : "-bottom-[24%] right-[5%] h-[102%] w-[40%] min-w-[160px] rotate-[4deg] p-3"
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
        className={`absolute z-[2] flex items-center gap-3 ${large ? "bottom-[10%] left-[7%]" : "bottom-6 left-6"}`}
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

const journey = [
  {
    number: "01",
    title: "Find the value",
    copy: "A clear Portfolio Analysis entry point explains the outcome before asking for effort.",
    icon: Sparkles,
    accent: "#8b82ff",
    screen: <EntryScreen />,
  },
  {
    number: "02",
    title: "Choose the scope",
    copy: "Overall, Motilal Oswal, and External views keep source context visible without splitting the experience.",
    icon: Layers3,
    accent: "#55e6c1",
    screen: <ScopeScreen />,
  },
  {
    number: "03",
    title: "Connect external wealth",
    copy: "Broker import, consent, and syncing states make a high-trust transition feel predictable.",
    icon: Link2,
    accent: "#f2b86b",
    screen: <SyncScreen />,
  },
  {
    number: "04",
    title: "Read stock health",
    copy: "Allocation, concentration, and red flags translate raw holdings into a prioritised diagnosis.",
    icon: BarChart3,
    accent: "#8b82ff",
    screen: <StockScreen />,
  },
  {
    number: "05",
    title: "Evaluate mutual funds",
    copy: "Risk and diversification are explained in context, not presented as isolated financial scores.",
    icon: ShieldCheck,
    accent: "#55e6c1",
    screen: <FundScreen />,
  },
  {
    number: "06",
    title: "Move from insight to action",
    copy: "IAP portfolios, an RM conversation, and report download support different levels of confidence.",
    icon: MessageCircle,
    accent: "#f2b86b",
    screen: <ActionScreen />,
  },
] as const;

export function PortfolioAnalysisCaseVisuals() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="container-page py-[var(--space-20)] md:py-[var(--space-32)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[var(--color-accent)]">Experience architecture</p>
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.5rem,5vw,4.6rem)] leading-[.98] tracking-[-.05em]">
              One analysis model for every portfolio.
            </h2>
          </div>
          <p className="max-w-[48ch] text-[16px] leading-7 text-[var(--color-muted)] lg:col-span-4 lg:col-start-9">
            The interface keeps portfolio source visible, then applies the same diagnostic logic
            across internal and externally imported investments. Users learn one system instead of
            relearning the product for every broker or asset type.
          </p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-5 shadow-[var(--elevation-2)] md:p-8 lg:p-10"
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.25fr_auto_1fr] lg:items-stretch">
            <ArchitectureNode
              eyebrow="Source 01"
              title="Motilal Oswal"
              copy="Existing stocks and mutual funds"
              icon={WalletCards}
            />
            <FlowArrow />
            <ArchitectureNode
              eyebrow="Source 02"
              title="External"
              copy="Linked brokers and portfolios"
              icon={Link2}
            />
            <FlowArrow />
            <ArchitectureNode
              eyebrow="Intelligence layer"
              title="Unified diagnosis"
              copy="Risk · allocation · quality · diversification"
              icon={Sparkles}
              featured
            />
            <FlowArrow />
            <ArchitectureNode
              eyebrow="Action"
              title="Decision support"
              copy="IAP · RM support · report"
              icon={TrendingUp}
            />
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[var(--color-hairline)] bg-[var(--color-surface)] py-[var(--space-20)] md:py-[var(--space-32)]">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div>
              <p className="eyebrow text-[var(--color-accent)]">Screen journey</p>
              <h2 className="mt-5 max-w-[15ch] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1] tracking-[-.045em]">
                Six moments. One continuous decision flow.
              </h2>
            </div>
            <p className="max-w-[39ch] text-[14px] leading-6 text-[var(--color-muted)] md:text-[15px]">
              Each screen answers the next investor question while preserving context from the
              previous step.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.number}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.72, delay: index * 0.06, ease: EASE }}
                  className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline-strong)] bg-[var(--color-bg)]"
                >
                  <div className="relative min-h-[310px] overflow-hidden bg-[#090d19] p-5">
                    <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:28px_28px]" />
                    <div className="relative z-[1] flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[.14em] text-white/35">
                        {item.number} / 06
                      </span>
                      <span
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[.06]"
                        style={{ color: item.accent }}
                      >
                        <Icon size={14} />
                      </span>
                    </div>
                    <div className="relative z-[1] mx-auto mt-5 w-[72%] min-w-[190px] max-w-[230px] transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[1deg]">
                      {item.screen}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[18px] font-semibold tracking-[-.025em]">{item.title}</p>
                    <p className="mt-3 text-[14px] leading-6 text-[var(--color-muted)]">
                      {item.copy}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function ArchitectureNode({
  eyebrow,
  title,
  copy,
  icon: Icon,
  featured = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  icon: typeof Sparkles;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border p-5 ${
        featured
          ? "border-[var(--color-accent)] bg-[var(--color-accent-wash)]"
          : "border-[var(--color-hairline)] bg-[var(--color-bg)]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-[.15em] text-[var(--color-subtle)]">
          {eyebrow}
        </p>
        <Icon
          size={15}
          className={featured ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}
        />
      </div>
      <p className="mt-8 text-[16px] font-semibold tracking-[-.02em]">{title}</p>
      <p className="mt-2 text-[12px] leading-5 text-[var(--color-muted)]">{copy}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 text-[var(--color-subtle)] lg:py-0">
      <ChevronRight size={16} className="hidden lg:block" />
      <ArrowDown size={16} className="lg:hidden" />
    </div>
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
