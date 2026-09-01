type PortfolioAnalysisVisualProps = {
  variant?: "card" | "hero";
};

const REAL_SCREENS = [
  {
    id: "mo-stocks",
    label: "MO stocks",
    detail: "Portfolio health · performance",
    src: "/projects/portfolio-analysis/hero/mo-stocks.webp",
  },
  {
    id: "external-stocks",
    label: "External stocks",
    detail: "Allocation · concentration",
    src: "/projects/portfolio-analysis/hero/external-stocks.webp",
  },
  {
    id: "mutual-funds",
    label: "Mutual funds",
    detail: "Risk · diversification",
    src: "/projects/portfolio-analysis/hero/mo-mutual-funds-dark.webp",
  },
] as const;

/**
 * Art-directed Portfolio Analysis cover built only from the real product
 * screenshots already used in the case study. No generated dashboard artwork.
 */
export function PortfolioAnalysisCardVisual({
  variant = "card",
}: PortfolioAnalysisVisualProps) {
  const hero = variant === "hero";

  return (
    <div
      className="absolute inset-0 isolate overflow-hidden bg-[#070a13] text-white"
      role="img"
      aria-label="Portfolio Analysis shown with real Motilal Oswal stock, external stock, and mutual fund analysis screens"
      style={{
        background:
          "radial-gradient(circle at 83% 17%, rgba(102,92,255,.24), transparent 28%), radial-gradient(circle at 61% 92%, rgba(45,121,255,.13), transparent 34%), linear-gradient(137deg,#070912 0%,#0b1021 48%,#10152e 74%,#080a13 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(228,232,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(228,232,255,.045) 1px,transparent 1px)",
          backgroundSize: hero ? "54px 54px" : "38px 38px",
          maskImage: "linear-gradient(90deg,#000 0%,rgba(0,0,0,.82) 48%,rgba(0,0,0,.28) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-[8%] -top-[62%] aspect-square w-[58%] rounded-full border border-white/[0.07] shadow-[0_0_0_58px_rgba(111,98,255,0.018),0_0_0_118px_rgba(111,98,255,0.012)]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-34%] right-[22%] aspect-square w-[38%] rounded-full bg-[#4d58ff]/[0.08] blur-[70px]"
      />

      <div className="absolute left-[5.5%] right-[5.5%] top-[6.5%] z-20 flex items-center justify-between font-mono text-[clamp(7px,1.05vw,11px)] font-semibold uppercase tracking-[0.15em] text-white/45">
        <span className="inline-flex items-center gap-2.5">
          <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[#aaa4ff]/45 font-serif text-[10px] italic tracking-normal text-[#d4d1ff]">
            P
          </span>
          Portfolio Analysis
        </span>
        <span className="hidden sm:inline">2025–26</span>
      </div>

      <div className="absolute left-[6%] top-[24%] z-20 w-[38%] sm:top-[25%]">
        <p className="mb-2.5 font-mono text-[clamp(6px,0.92vw,10px)] font-semibold uppercase tracking-[0.14em] text-[#c8c9ee]/48">
          Multi-parameter portfolio health
        </p>
        <strong
          className={`block max-w-[13ch] font-display font-medium leading-[0.96] tracking-[-0.045em] text-white ${
            hero ? "text-[clamp(24px,4.1vw,54px)]" : "text-[clamp(18px,3.5vw,40px)]"
          }`}
        >
          See what the portfolio
          <br />
          <em className="font-serif font-normal text-[#bbb7ff]">is actually doing.</em>
        </strong>

        <p
          className={`mt-3 max-w-[36ch] leading-[1.55] text-white/48 ${
            hero ? "hidden text-[12px] md:block lg:text-[13px]" : "hidden text-[10px] lg:block"
          }`}
        >
          Performance, allocation, diversification, risk, concentration and attention areas in one familiar analysis model.
        </p>

        <div className={`flex flex-wrap gap-1.5 ${hero ? "mt-5" : "mt-3.5"}`}>
          <span className="inline-flex min-h-5 items-center rounded-full border border-white/[0.11] bg-white/[0.035] px-2.5 text-[clamp(6px,0.78vw,9px)] font-semibold text-white/64 backdrop-blur-sm">
            4,89,069 users
          </span>
          <span className="inline-flex min-h-5 items-center rounded-full border border-white/[0.11] bg-white/[0.035] px-2.5 text-[clamp(6px,0.78vw,9px)] font-semibold text-white/64 backdrop-blur-sm">
            70% returned
          </span>
          <span className="hidden min-h-5 items-center rounded-full border border-white/[0.11] bg-white/[0.035] px-2.5 text-[clamp(6px,0.78vw,9px)] font-semibold text-white/64 backdrop-blur-sm md:inline-flex">
            Stocks + mutual funds
          </span>
        </div>
      </div>

      <div className="absolute bottom-[-7%] left-[47%] right-[1.5%] top-[13%] z-10 hidden sm:block">
        {REAL_SCREENS.map((screen, index) => {
          const position = [
            "left-[1%] top-[18%] h-[78%] w-[31%] -rotate-[4deg] opacity-72",
            "left-[26%] top-[1%] h-[96%] w-[39%] -rotate-[0.6deg]",
            "right-[1%] top-[14%] h-[84%] w-[34%] rotate-[3deg] opacity-90",
          ][index];

          return (
            <figure
              key={screen.id}
              className={`absolute flex min-w-0 flex-col overflow-hidden rounded-t-[clamp(8px,1vw,14px)] border border-white/[0.16] bg-[#f8f8fb] shadow-[0_26px_72px_rgba(0,0,0,.46)] ${position}`}
            >
              <figcaption className="flex min-h-[clamp(20px,2.55vw,33px)] shrink-0 items-center gap-1.5 border-b border-[#1c2335]/10 bg-[#f8f8fb]/95 px-[clamp(6px,0.8vw,10px)] font-mono text-[clamp(5px,0.66vw,8px)] font-semibold uppercase tracking-[0.06em] text-[#656b7c]">
                <span className="text-[#31384d]">0{index + 1}</span>
                <span className="truncate">{screen.label}</span>
                {index === 1 && (
                  <i className="ml-auto not-italic text-[#5a53d9]">Core view</i>
                )}
              </figcaption>
              <img
                src={screen.src}
                alt=""
                loading={index === 1 ? "eager" : "lazy"}
                decoding="async"
                className="min-h-0 w-full flex-1 object-cover object-top"
              />
            </figure>
          );
        })}
      </div>

      <div className="absolute bottom-[-10%] left-[43%] right-[-8%] top-[16%] z-10 sm:hidden">
        {REAL_SCREENS.map((screen, index) => {
          const position = [
            "left-0 top-[18%] h-[72%] w-[31%] -rotate-[5deg] opacity-65",
            "left-[24%] top-0 h-[94%] w-[43%] -rotate-[1deg]",
            "right-[2%] top-[15%] h-[78%] w-[34%] rotate-[4deg] opacity-82",
          ][index];
          return (
            <figure
              key={screen.id}
              className={`absolute overflow-hidden rounded-t-[8px] border border-white/[0.15] bg-white shadow-[0_18px_44px_rgba(0,0,0,.44)] ${position}`}
            >
              <img src={screen.src} alt="" className="h-full w-full object-cover object-top" />
            </figure>
          );
        })}
      </div>

      <div className="absolute bottom-[7%] left-[6%] z-20 hidden w-[35%] items-center gap-2 font-mono text-[clamp(6px,0.72vw,9px)] text-white/28 sm:flex">
        <span className="text-[#bbb7ff]">01 Health</span>
        <i className="h-px min-w-2 flex-1 bg-white/10" />
        <span>02 Diagnose</span>
        <i className="h-px min-w-2 flex-1 bg-white/10" />
        <span>03 Deep dive</span>
      </div>

      <span aria-hidden className="absolute right-[3%] top-[4%] h-5 w-5 border-r border-t border-white/[0.15] sm:h-7 sm:w-7" />
      <span aria-hidden className="absolute bottom-[4%] left-[3%] h-5 w-5 border-b border-l border-white/[0.12] sm:h-7 sm:w-7" />
    </div>
  );
}
