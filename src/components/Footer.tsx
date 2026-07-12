import { Link } from "react-router-dom";
import { useSite } from "@/lib/cms";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const { data: site } = useSite();
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
        <div className="container-page flex flex-col justify-between gap-2 py-6 text-[11px] uppercase tracking-[0.2em] text-[var(--color-subtle)] md:flex-row">
          <p>
            © {new Date().getFullYear()} {site?.name ?? "Aman Mishra"} — Set in Instrument Serif &amp; Work Sans
          </p>
          {site?.location && <p>{site.location}</p>}
        </div>
      </div>
    </footer>
  );
}
