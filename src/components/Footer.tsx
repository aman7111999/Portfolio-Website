import { useSite, useContent } from "@/lib/cms";
import { ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

type FooterData = { copyright_suffix: string; back_to_top_label: string };
const FALLBACK: FooterData = { copyright_suffix: "All rights reserved", back_to_top_label: "Top" };

export function Footer() {
  const { data: site } = useSite();
  const { data: f } = useContent<FooterData>("footer", FALLBACK);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-[var(--color-hairline-strong)]">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-8 text-[12px] text-[var(--color-muted)] md:flex-row md:text-[13px]">
        <div className="flex items-center gap-3">
          <BrandMark className="h-8 w-8" />
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {site?.name ?? "Aman Mishra"} ·{" "}
            {f?.copyright_suffix ?? FALLBACK.copyright_suffix}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8">
          {(site?.socials ?? []).slice(0, 4).map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center text-[13px] transition-colors hover:text-[var(--color-accent)]"
            >
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 text-[13px] transition-colors hover:text-[var(--color-accent)]"
            aria-label="Back to top"
          >
            {f?.back_to_top_label ?? FALLBACK.back_to_top_label}{" "}
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
