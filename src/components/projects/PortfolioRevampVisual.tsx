type PortfolioRevampVisualProps = {
  variant?: "card" | "hero";
};

const STAGES = [
  {
    id: "original",
    number: "01",
    label: "Original",
    image: "/projects/riise-portfolio-revamp/riise-original.png",
  },
  {
    id: "systemised",
    number: "02",
    label: "Systemised",
    image: "/projects/riise-portfolio-revamp/riise-design-system.jpg",
  },
  {
    id: "revamped",
    number: "03",
    label: "Revamped",
    image: "/projects/riise-portfolio-revamp/riise-latest-revamp.jpg",
  },
] as const;

/**
 * A single art-directed visual for every public Portfolio Revamp surface.
 * The source screens stay intact; hierarchy, cropping, and stage treatment do
 * the storytelling so the card never falls back to a raw tall screenshot.
 */
export function PortfolioRevampVisual({ variant = "card" }: PortfolioRevampVisualProps) {
  return (
    <div
      className={`portfolio-revamp-visual portfolio-revamp-visual--${variant}`}
      role="img"
      aria-label="RIISE portfolio evolving from a repeated-card layout to a calm, unified multi-product experience"
    >
      <div className="portfolio-revamp-grid" aria-hidden />
      <div className="portfolio-revamp-glow portfolio-revamp-glow--violet" aria-hidden />
      <div className="portfolio-revamp-glow portfolio-revamp-glow--blue" aria-hidden />

      <div className="portfolio-revamp-topline" aria-hidden>
        <span className="portfolio-revamp-brand">
          <span className="portfolio-revamp-brandmark">R</span>
          RIISE / PORTFOLIO
        </span>
        <span>2025–26</span>
      </div>

      <div className="portfolio-revamp-copy" aria-hidden>
        <p>Multi-product architecture</p>
        <strong>
          Every asset.
          <br />
          <em>One clear view.</em>
        </strong>
        <div className="portfolio-revamp-proof">
          <span>5+ asset types</span>
          <span>3 design stages</span>
        </div>
      </div>

      <div className="portfolio-revamp-deck" aria-hidden>
        {STAGES.map((stage, index) => (
          <figure
            key={stage.id}
            className={`portfolio-revamp-device portfolio-revamp-device--${stage.id}`}
          >
            <figcaption>
              <span>{stage.number}</span>
              <span>{stage.label}</span>
              {index === STAGES.length - 1 && <i>Current</i>}
            </figcaption>
            <img
              src={stage.image}
              alt=""
              loading={variant === "hero" && index === STAGES.length - 1 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <div className="portfolio-revamp-rail" aria-hidden>
        <span>01</span>
        <i />
        <span>02</span>
        <i />
        <span className="is-current">03</span>
        <b>Structure → hierarchy</b>
      </div>

      <span className="portfolio-revamp-corner portfolio-revamp-corner--top" aria-hidden />
      <span className="portfolio-revamp-corner portfolio-revamp-corner--bottom" aria-hidden />
    </div>
  );
}
