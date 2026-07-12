import { Link } from "react-router-dom";
import { useSite } from "@/lib/cms";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { data: site } = useSite();
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="mt-32 border-t border-hairline">
      <div className="container-page grid gap-16 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Get in touch
          </p>
          <h3
            className="mt-6 font-display italic leading-[1.05] text-[var(--color-text)]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Let's build something quiet.
          </h3>
          {site?.email && (
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--color-hairline-strong)] pb-1 text-lg text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]"
            >
              {site.email} <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Elsewhere
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {(site?.socials ?? []).map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Navigate
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { to: "/work", label: "Work" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="container-page flex flex-col-reverse justify-between gap-4 py-6 text-[11px] uppercase tracking-[0.2em] text-[var(--color-subtle)] md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site?.name ?? "Aman Mishra"} — Set in Instrument Serif &amp; Work Sans
          </p>
          <div className="flex items-center gap-6">
            {site?.location && <p>{site.location}</p>}
            <button
              type="button"
              onClick={scrollTop}
              className="group inline-flex items-center gap-2 text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-full px-2 py-1"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

