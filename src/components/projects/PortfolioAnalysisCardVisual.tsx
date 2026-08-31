import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function PortfolioAnalysisCardVisual() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void supabase
      .from("public_projects_index")
      .select("thumbnail_url")
      .eq("slug", "portfolio-analysis")
      .maybeSingle()
      .then(({ data }) => {
        if (active) setSrc(data?.thumbnail_url ?? null);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!src) {
    return <div className="absolute inset-0 bg-[var(--color-elevated)]" />;
  }

  return (
    <img
      src={src}
      alt="Portfolio Analysis cover"
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
    />
  );
}
