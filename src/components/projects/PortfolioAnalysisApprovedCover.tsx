const COVER_URL = "/projects/portfolio-analysis/portfolio-analysis-cover.webp";

export function PortfolioAnalysisApprovedCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07101e]">
      <img
        src={COVER_URL}
        alt="Portfolio Analysis cover highlighting performance, allocation, risk, and diversification"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
