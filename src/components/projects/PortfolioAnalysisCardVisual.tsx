type PortfolioAnalysisVisualProps = {
  variant?: "card" | "hero";
};

const REAL_SCREENS = [
  {
    id: "mo-stocks",
    src: "/projects/portfolio-analysis/hero/mo-stocks.webp",
    surface: "#f7f8fb",
  },
  {
    id: "external-stocks",
    src: "/projects/portfolio-analysis/hero/external-stocks.webp",
    surface: "#f7f8fb",
  },
  {
    id: "mutual-funds",
    src: "/projects/portfolio-analysis/hero/mo-mutual-funds-dark.webp",
    surface: "#0b0d14",
  },
] as const;

/**
 * Premium Portfolio Analysis cover built only from the real project screens.
 * Screens are kept complete inside the composition: no generated UI, device
 * mockups, zoom-cropping, or translated screenshots.
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
          "radial-gradient(circle at 82% 18%, rgba(102,92,255,.22), transparent 28%), radial-gradient(circle at 58% 90%, rgba(45,121,255,.10), transparent 34%), linear-gradient(137deg,#070912 0%,#0b1021 50%,#10152e 76%,#080a13 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(228,232,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(228,232,255,.04) 1px,transparent 1px)",
          backgroundSize: hero ? "58px 58px" : "42px 42px",
          maskImage: "linear-gradient(90deg,#000 0%,rgba(0,0,0,.72) 48%,rgba(0,0,0,.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-[9%] -top-[66%] aspect-square w-[60%] rounded-full border border-white/[0.055] shadow-[0_0_0_70px_rgba(111,98,255,0.012),0_0_0_140px_rgba(111,98,255,0.008)]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-38%] right-[18%] aspect-square w-[42%] rounded-full bg-[#4d58ff]/[0.07] blur-[78px]"
      />

      <div
        className={`absolute left-[3.5%] z-20 ${
          hero ? "top-[24%] w-[35%]" : "top-[27%] w-[36%]"
        }`}
      >
        <p className="font-mono text-[clamp(7px,0.82vw,10px)] font-semibold uppercase tracking-[0.18em] text-[#c9c6ff]/62">
          Portfolio Analysis
        </p>
        <strong
          className={`mt-3 block max-w-[12ch] font-display font-medium leading-[0.98] tracking-[-0.045em] text-white ${
            hero ? "text-[clamp(26px,4vw,52px)]" : "text-[clamp(19px,3.25vw,38px)]"
          }`}
        >
          Know what needs
          <br />
          <em className="font-serif font-normal text-[#bbb7ff]">attention.</em>
        </strong>

        <div
          className={`mt-4 flex items-center gap-2 font-mono text-white/38 ${
            hero ? "text-[clamp(7px,0.76vw,10px)]" : "text-[clamp(6px,0.68vw,8px)]"
          }`}
        >
          <span>4,89,069 users</span>
          <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-white/30" />
          <span>70% repeat usage</span>
        </div>
      </div>

      <div
        className={`absolute z-10 hidden sm:block ${
          hero
            ? "bottom-[1%] left-[39%] right-0 top-[10%]"
            : "bottom-[1%] left-[40%] right-0 top-[13%]"
        }`}
      >
        {REAL_SCREENS.map((screen, index) => {
          const position = hero
            ? [
                "left-0 top-[19%] h-[77%] w-[31%] -rotate-[4deg] opacity-72",
                "left-[24%] top-[1%] h-[96%] w-[40%] -rotate-[0.5deg]",
                "right-0 top-[16%] h-[81%] w-[34%] rotate-[3deg] opacity-90",
              ][index]
            : [
                "left-0 top-[21%] h-[73%] w-[31%] -rotate-[4deg] opacity-70",
                "left-[24%] top-[2%] h-[93%] w-[40%] -rotate-[0.5deg]",
                "right-0 top-[18%] h-[78%] w-[34%] rotate-[3deg] opacity-88",
              ][index];

          return (
            <figure
              key={screen.id}
              className={`absolute overflow-hidden rounded-[clamp(7px,0.8vw,12px)] shadow-[0_28px_76px_rgba(0,0,0,.46)] ${position}`}
              style={{ backgroundColor: screen.surface }}
            >
              <img
                src={screen.src}
                alt=""
                loading={index === 1 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-contain object-top"
              />
            </figure>
          );
        })}
      </div>

      <div className="absolute bottom-[1%] left-[37%] right-[-10%] top-[18%] z-10 sm:hidden">
        {REAL_SCREENS.map((screen, index) => {
          const position = [
            "left-0 top-[19%] h-[68%] w-[32%] -rotate-[5deg] opacity-64",
            "left-[23%] top-0 h-[90%] w-[44%] -rotate-[1deg]",
            "right-0 top-[16%] h-[73%] w-[35%] rotate-[4deg] opacity-82",
          ][index];
          return (
            <figure
              key={screen.id}
              className={`absolute overflow-hidden rounded-[6px] shadow-[0_18px_44px_rgba(0,0,0,.42)] ${position}`}
              style={{ backgroundColor: screen.surface }}
            >
              <img
                src={screen.src}
                alt=""
                className="h-full w-full object-contain object-top"
              />
            </figure>
          );
        })}
      </div>

      <span
        aria-hidden
        className="absolute right-[1.5%] top-[4%] h-5 w-5 border-r border-t border-white/[0.12] sm:h-7 sm:w-7"
      />
      <span
        aria-hidden
        className="absolute bottom-[4%] left-[1.5%] h-5 w-5 border-b border-l border-white/[0.10] sm:h-7 sm:w-7"
      />
    </div>
  );
}
