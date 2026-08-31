import { PORTFOLIO_ANALYSIS_HERO_SCREENS } from "@/data/portfolioAnalysisScreens";

export function PortfolioAnalysisCardVisual() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-[#070910] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 13% 16%, rgba(105,92,255,.34), transparent 34%), radial-gradient(circle at 85% 80%, rgba(49,210,171,.15), transparent 32%), linear-gradient(145deg,#12172a 0%,#080a10 66%,#050609 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="absolute inset-x-[5%] top-[8%] z-10 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[9px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5ee5bd] shadow-[0_0_14px_rgba(94,229,189,.7)]" />
          Portfolio Analysis
        </span>
        <span className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-white/42 sm:block">
          Understand · Compare · Act
        </span>
      </div>

      <div className="absolute left-[5%] top-[27%] z-10 max-w-[42%]">
        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/48 sm:text-[9px]">
          Performance · Allocation · Risk · Diversification
        </p>
        <p className="mt-2 text-[clamp(1rem,2.5vw,1.85rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
          Understand your portfolio.
          <br />
          Not just your holdings.
        </p>
        <p className="mt-3 hidden max-w-[31ch] text-[10px] leading-[1.55] text-white/50 sm:block">
          Analyze the signals that matter, see what needs attention, and move from insight to action.
        </p>
      </div>

      <div className="absolute bottom-[8%] left-[5%] z-10 flex flex-wrap gap-1.5">
        {["Performance", "Allocation", "Risk", "Diversification"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.045] px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em] text-white/55 backdrop-blur-sm sm:text-[7px]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-[52%]">
        <Screen
          src={PORTFOLIO_ANALYSIS_HERO_SCREENS.externalStocks}
          className="left-[9%] top-[16%] h-[94%] w-[43%] -rotate-[4deg] opacity-85"
        />
        <Screen
          src={PORTFOLIO_ANALYSIS_HERO_SCREENS.moMutualFunds}
          className="left-[47%] top-[7%] h-[104%] w-[46%] rotate-[3deg]"
        />
      </div>

      <div className="absolute right-[7%] top-[20%] z-[8] rounded-lg border border-white/10 bg-[#10131a]/88 px-2.5 py-2 shadow-[0_18px_55px_rgba(0,0,0,.42)] backdrop-blur-md">
        <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-white/40">Portfolio signal</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5ee5bd]" />
          <span className="text-[8px] font-medium text-white/78">Know what needs attention</span>
        </div>
      </div>
    </div>
  );
}

function Screen({ src, className }: { src: string; className: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-t-[12px] border border-white/15 bg-[#11131a] shadow-[0_24px_65px_rgba(0,0,0,.5)] ${className}`}
    >
      <div className="h-6 border-b border-white/10 bg-[#10131b]/95 px-2 py-2">
        <div className="h-1 w-8 rounded-full bg-white/15" />
      </div>
      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
    </div>
  );
}
