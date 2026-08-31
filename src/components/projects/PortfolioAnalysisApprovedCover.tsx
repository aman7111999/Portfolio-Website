const COVER_TILES = [0, 1, 2, 3].map(
  (index) => `/projects/portfolio-analysis/cover-tile-${index}.svg`,
);

export function PortfolioAnalysisApprovedCover() {
  return (
    <div
      role="img"
      aria-label="Portfolio Analysis cover showing performance, allocation, risk, and diversification"
      className="absolute inset-0 overflow-hidden bg-[#07101e]"
    >
      <div className="absolute inset-0 flex">
        {COVER_TILES.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-full w-1/4 shrink-0 object-fill"
          />
        ))}
      </div>
    </div>
  );
}
