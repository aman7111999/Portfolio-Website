import { PORTFOLIO_ANALYSIS_COVER_WEBP } from "@/data/portfolioAnalysisCoverAsset";

export function PortfolioAnalysisApprovedCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07101e]">
      <img
        src={PORTFOLIO_ANALYSIS_COVER_WEBP}
        alt="Portfolio Analysis cover highlighting performance, allocation, risk, and diversification"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
